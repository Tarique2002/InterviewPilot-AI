import requests


OLLAMA_URL = "http://localhost:11434/api/generate"

MODEL = "qwen2.5:1.5b"


# =====================================
# LLM Caller
# =====================================

def ask_llm(prompt):

    try:

        response = requests.post(

            OLLAMA_URL,

            json={
                "model": MODEL,
                "prompt": prompt,
                "stream": False
            },

            timeout=180

        )



        if response.status_code == 200:

            data = response.json()

            return data.get("response", "No response")



        return "Model Error"



    except Exception as e:


        return f"AI Error : {str(e)}"




# =====================================
# Interview Question
# =====================================

def generate_question(resume_text):


    prompt = f"""

You are an HR interviewer.


Resume:

{resume_text}



Ask ONE interview question.


Only output the question.


"""


    return ask_llm(prompt)




# =====================================
# Evaluate Answer
# =====================================

def evaluate_answer(answer, resume_text):



    prompt = f"""

You are a technical interviewer.


Resume:


{resume_text}



Candidate Answer:


{answer}



Provide:


Score : x/10


Strengths


Weaknesses


Improvement Tips



Keep under 120 words.



"""


    return ask_llm(prompt)





# =====================================
# ATS Resume Analysis
# =====================================

def analyze_resume(resume_text):



    prompt = f"""

Analyze Resume



Resume:


{resume_text}



Provide


ATS Score


Strengths


Missing Skills


Suggestions



"""



    return ask_llm(prompt)




# =====================================
# FAST REPORT
# =====================================

def generate_final_report(history):


    total = len(history)



    if total == 0:


        return """

No interview data available.

"""




    score = 0



    for item in history:



        fb = item["feedback"]



        if "9/10" in fb:

            score += 9


        elif "8/10" in fb:

            score += 8


        elif "7/10" in fb:

            score += 7


        elif "6/10" in fb:

            score += 6


        else:

            score += 5





    avg = score / total




    recommendation = (

        "Highly Recommended"

        if avg >= 8

        else "Needs Improvement"

    )





    return f"""


Overall Score : {round(avg*10)}%



Technical Rating : {round(avg,1)}/10


Communication Rating : 8/10


Confidence Rating : 8/10




Strengths

• Good technical understanding

• Clear explanation



Weaknesses

• Improve answer depth



Hiring Recommendation


{recommendation}



"""