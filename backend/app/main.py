from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.resume_parser import extract_resume_text
from app.ollama_ai import (
    generate_question,
    evaluate_answer,
    analyze_resume,
    generate_final_report
)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


resume_text = ""
interview_history = []


class Answer(BaseModel):
    text: str


@app.get("/")
def home():
    return {
        "message": "InterviewPilot AI Running"
    }


####################################
# Upload Resume
####################################
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    global resume_text

    resume_text = extract_resume_text(file)

    return {
        "message": "Resume uploaded",
        "length": len(resume_text)
    }


####################################
# Resume Analysis
####################################
@app.get("/resume-analysis")
def resume_analysis():

    global resume_text

    if resume_text == "":
        return {
            "analysis": "Upload resume first"
        }

    result = analyze_resume(resume_text)

    return {
        "analysis": result
    }


####################################
# Start Interview
####################################
@app.get("/start")
def start_interview():

    global resume_text

    question = generate_question(resume_text)

    return {
        "question": question
    }


####################################
# Evaluate Answer
####################################
@app.post("/evaluate")
def evaluate(answer: Answer):

    global interview_history
    global resume_text


    result = evaluate_answer(
        answer.text,
        resume_text
    )


    interview_history.append(

        {

            "answer": answer.text,

            "feedback": result

        }

    )


    return {

        "feedback": result

    }


####################################
# Final Report
####################################
@app.get("/final-report")
def final_report():

    global interview_history


    report = generate_final_report(

        interview_history

    )


    return {

        "report": report

    }