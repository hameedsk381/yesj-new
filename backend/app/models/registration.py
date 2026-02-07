from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, Text, JSON

from app.db.base_class import Base

class Registration(Base):
    id = Column(Integer, primary_key=True, index=True)
    application_type = Column(String) # membership, leadership
    name = Column(String, index=True)
    gender = Column(String)
    registration_no = Column(String)
    course = Column(String)
    age = Column(Integer)
    instagram_id = Column(String, nullable=True)
    mobile_no = Column(String)
    whatsapp_no = Column(String)
    email_id = Column(String, index=True)
    religion = Column(String)
    address = Column(Text)
    
    # Skills & Extras (Stored as JSON or simple text if simple)
    # Using JSON for flexibility with SQLite/Postgres
    skills = Column(JSON, nullable=True)
    other_skills = Column(String, nullable=True)
    event_experience = Column(Text, nullable=True)
    
    # Leadership specific
    just_society_definition = Column(Text, nullable=True)
    communication_example = Column(Text, nullable=True)
    yesj_vision = Column(Text, nullable=True)
    leadership_position = Column(String, nullable=True)
    
    # Meta
    hashed_password = Column(String) # For member login
    declaration = Column(Boolean, default=False)
    additional_message = Column(Text, nullable=True)
    
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
