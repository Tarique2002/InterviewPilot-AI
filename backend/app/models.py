from sqlalchemy import Column, Integer, String, Text

from app.database import Base


class InterviewResult(Base):

    __tablename__ = "interview_results"

    id = Column(Integer, primary_key=True, index=True)

    answer = Column(Text)

    feedback = Column(Text)

    score = Column(String)