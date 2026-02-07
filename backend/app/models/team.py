from sqlalchemy import Column, Integer, String, Text, DateTime, func

from app.db.base_class import Base

class TeamMember(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(String)
    bio = Column(Text, nullable=True)
    image_path = Column(String, nullable=True)
    twitter_url = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
