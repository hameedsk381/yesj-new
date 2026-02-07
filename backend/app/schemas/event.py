from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class EventBase(BaseModel):
    title: str
    description: str
    date: datetime
    location: str
    fee: Optional[str] = None
    deadline: Optional[datetime] = None
    type: str

class EventCreate(EventBase):
    pass # Image handled via UploadFile

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    location: Optional[str] = None
    type: Optional[str] = None
    is_active: Optional[bool] = None

class Event(EventBase):
    id: int
    image_path: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True
