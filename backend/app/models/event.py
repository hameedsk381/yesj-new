from sqlalchemy import Column, Integer, String, Text, DateTime, func, Boolean

from app.db.base_class import Base

class Event(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    date = Column(DateTime)
    location = Column(String)
    fee = Column(String, nullable=True)
    deadline = Column(DateTime, nullable=True)
    image_path = Column(String, nullable=True) # Cover image
    type = Column(String) # cultural, camp, dialogue, conference, etc.
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
