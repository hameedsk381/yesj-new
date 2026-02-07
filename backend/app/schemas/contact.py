from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    status: str

class Contact(ContactBase):
    id: int
    created_at: datetime
    status: str

    class Config:
        orm_mode = True
