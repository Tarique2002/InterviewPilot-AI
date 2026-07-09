from groq import Groq
from dotenv import load_dotenv
import os


load_dotenv()


MODEL = os.getenv(

    "MODEL",

    "llama-3.3-70b-versatile"

)


def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY environment variable is not set. Please set it in your Render Environment Variables.")
    return Groq(api_key=api_key)


########################################
# Generic LLM
########################################

def ask_llm(prompt):


    try:

        client = get_groq_client()

        completion = client.chat.completions.create(

            model=MODEL,

            messages=[

                {

                    "role":"user",

                    "content":prompt

                }

            ],

            temperature=0.7

        )


        return completion.choices[0].message.content



    except Exception as e:


        return f"AI Error : {str(e)}"





########################################
# Question Generator
########################################

def generate_question(resume_text):


    prompt=f"""

You are a Senior HR interviewer.


Resume


{resume_text}



Ask ONE interview question.


Only question.


No greeting.


No explanation.



"""


    return ask_llm(prompt)




########################################
# Evaluate Answer
########################################

def evaluate_answer(answer,resume_text):



    prompt=f"""


You are an interviewer.



Resume


{resume_text}



Candidate Answer


{answer}




Give response in format




Score : x/10


Strengths

- item




Weaknesses

- item




Improvement Tips

- item




Maximum 120 words.



"""


    return ask_llm(prompt)




########################################
# Resume Analysis
########################################

def analyze_resume(resume_text):



    prompt=f"""

Analyze Resume



Resume


{resume_text}



Provide



ATS Score


Strengths


Missing Skills


Suggestions




"""


    return ask_llm(prompt)




########################################
# Final Report
########################################

def generate_final_report(history):



    prompt=f"""

Interview History



{history}




Generate



Overall Score


Technical Rating


Communication


Confidence


Strengths


Weaknesses


Hiring Recommendation




"""


    return ask_llm(prompt)