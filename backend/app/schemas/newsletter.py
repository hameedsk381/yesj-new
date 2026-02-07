from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr

class NewsletterBase(BaseModel):
    email: EmailStr

class NewsletterCreate(NewsletterBase):
    pass

class Newsletter(NewsletterBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True
