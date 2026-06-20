from fastapi import APIRouter

router = APIRouter()

# memory storage
storage = {}


# -------------------------
# evaluation logic
# -------------------------
def evaluate(answer: str):
    words = len(answer.split())

    if words < 10:
        return {"score": 4, "feedback": "Too short answer"}
    elif words < 25:
        return {"score": 7, "feedback": "Good answer"}
    else:
        return {"score": 9, "feedback": "Excellent answer"}


# -------------------------
# submit answer
# -------------------------
@router.post("/submit-answer")
def submit_answer(payload: dict):

    user_id = payload["user_id"]
    question = payload["question"]
    answer = payload["answer"]

    result = evaluate(answer)

    record = {
        "question": question,
        "answer": answer,
        "score": result["score"],
        "feedback": result["feedback"]
    }

    if user_id not in storage:
        storage[user_id] = []

    storage[user_id].append(record)

    return record


# -------------------------
# get report
# -------------------------
@router.get("/report/{user_id}")
def report(user_id: int):

    data = storage.get(user_id, [])

    if not data:
        return {
            "total_questions": 0,
            "average_score": 0,
            "summary": "No data found",
            "results": []
        }

    avg = sum(i["score"] for i in data) / len(data)

    summary = (
        "Excellent" if avg >= 8 else
        "Good" if avg >= 6 else
        "Needs Improvement"
    )

    return {
        "total_questions": len(data),
        "average_score": round(avg, 2),
        "summary": summary,
        "results": data
    }