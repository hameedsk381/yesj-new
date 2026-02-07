from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, Text

from app.db.base_class import Base

class Nomination(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    unit_name = Column(String)
    contesting_for = Column(String)
    education_qualification = Column(Text)
    noc_file_path = Column(String, nullable=True) # Path to uploaded file
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String, default="pending") # pending, approved, rejected
