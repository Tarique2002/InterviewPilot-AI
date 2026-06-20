from fastapi import UploadFile
from PyPDF2 import PdfReader
from docx import Document
import io


# -------------------------
# PDF READER
# -------------------------
def extract_text_from_pdf(file):

    pdf_reader = PdfReader(file.file)

    text = ""

    for page in pdf_reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text

    return text


# -------------------------
# DOCX READER
# -------------------------
def extract_text_from_docx(file):

    content = file.file.read()

    doc = Document(io.BytesIO(content))

    text = "\n".join(
        paragraph.text
        for paragraph in doc.paragraphs
    )

    return text


# -------------------------
# UNIVERSAL RESUME READER
# -------------------------
def extract_resume_text(file: UploadFile):

    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        return extract_text_from_pdf(file)

    if filename.endswith(".docx"):
        return extract_text_from_docx(file)

    return ""


# -------------------------
# FALLBACK QUESTION GENERATOR
# -------------------------
def generate_resume_based_question(resume_text: str):

    resume_text = resume_text.lower()

    if "python" in resume_text:
        return "Explain OOP concepts in Python."

    elif "machine learning" in resume_text:
        return "What ML model did you use in your project?"

    elif "project" in resume_text:
        return "Tell me about your most challenging project."

    else:
        return "Tell me about your strongest technical skill."