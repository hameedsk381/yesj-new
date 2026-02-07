from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, ForeignKey
from app.db.base_class import Base

class Newsletter(Base):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
