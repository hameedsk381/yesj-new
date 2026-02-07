from sqlalchemy import Column, Integer, String, Text, DateTime, func

from app.db.base_class import Base

class Contact(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    subject = Column(String)
    message = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String, default="unread") # unread, read, replied
