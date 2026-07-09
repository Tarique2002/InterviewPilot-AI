from fastapi import FastAPI, UploadFile, File, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import sys
import os

# Dynamic python path lookup for monorepos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.resume_parser import extract_resume_text
from app.ollama_ai import (
    generate_question,
    evaluate_answer,
    analyze_resume,
    generate_final_report
)

from app.database import SessionLocal, engine
from app.models import Base, SessionData

# Ensure tables are created
Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Answer(BaseModel):
    text: str


@app.get("/")
def home():
    return {
        "message": "InterviewPilot AI Running"
    }


# Helper db functions
def get_session_db(session_id: str):
    db = SessionLocal()
    try:
        session = db.query(SessionData).filter(SessionData.session_id == session_id).first()
        if not session:
            session = SessionData(session_id=session_id, resume_text="", interview_history="[]")
            db.add(session)
            db.commit()
            db.refresh(session)
        return session
    finally:
        db.close()

def update_session_resume(session_id: str, resume_text: str):
    db = SessionLocal()
    try:
        session = db.query(SessionData).filter(SessionData.session_id == session_id).first()
        if not session:
            session = SessionData(session_id=session_id, resume_text=resume_text, interview_history="[]")
            db.add(session)
        else:
            session.resume_text = resume_text
        db.commit()
    finally:
        db.close()

def update_session_history(session_id: str, history: list):
    db = SessionLocal()
    try:
        session = db.query(SessionData).filter(SessionData.session_id == session_id).first()
        if not session:
            session = SessionData(session_id=session_id, resume_text="", interview_history=json.dumps(history))
            db.add(session)
        else:
            session.interview_history = json.dumps(history)
        db.commit()
    finally:
        db.close()


####################################
# Upload Resume
####################################
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...), x_session_id: str = Header(default="default_session")):

    text = extract_resume_text(file)
    update_session_resume(x_session_id, text)

    return {
        "message": "Resume uploaded",
        "length": len(text)
    }


####################################
# Resume Analysis
####################################
@app.get("/resume-analysis")
def resume_analysis(x_session_id: str = Header(default="default_session")):

    session = get_session_db(x_session_id)

    if not session.resume_text or session.resume_text == "":
        return {
            "analysis": "Upload resume first"
        }

    result = analyze_resume(session.resume_text)

    return {
        "analysis": result
    }


####################################
# Start Interview
####################################
@app.get("/start")
def start_interview(x_session_id: str = Header(default="default_session")):

    session = get_session_db(x_session_id)
    update_session_history(x_session_id, []) # Reset history for a new interview session

    question = generate_question(session.resume_text)

    return {
        "question": question
    }


####################################
# Evaluate Answer
####################################
@app.post("/evaluate")
def evaluate(answer: Answer, x_session_id: str = Header(default="default_session")):

    session = get_session_db(x_session_id)

    result = evaluate_answer(
        answer.text,
        session.resume_text
    )

    try:
        history = json.loads(session.interview_history)
    except Exception:
        history = []

    history.append(
        {
            "answer": answer.text,
            "feedback": result
        }
    )
    update_session_history(x_session_id, history)

    return {
        "feedback": result
    }


####################################
# Final Report
####################################
@app.get("/final-report")
def final_report(x_session_id: str = Header(default="default_session")):

    session = get_session_db(x_session_id)
    try:
        history = json.loads(session.interview_history)
    except Exception:
        history = []

    report = generate_final_report(
        history
    )

    return {
        "report": report
    }