from sqlalchemy import Column, Integer, String, Text, DateTime, func

from app.db.base_class import Base

class Gallery(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    image_path = Column(String)
    category = Column(String) # leadership, social_service, cultural, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
