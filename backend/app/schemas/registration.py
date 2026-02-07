from typing import Optional, List, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr

class RegistrationBase(BaseModel):
    application_type: str
    name: str
    gender: str
    registration_no: str
    course: str
    age: int
    instagram_id: Optional[str] = None
    mobile_no: str
    whatsapp_no: str
    email_id: EmailStr
    religion: str
    address: str
    
    skills: Optional[List[str]] = []
    other_skills: Optional[str] = None
    event_experience: Optional[str] = None
    
    just_society_definition: Optional[str] = None
    communication_example: Optional[str] = None
    yesj_vision: Optional[str] = None
    leadership_position: Optional[str] = None
    
    declaration: bool = False
    additional_message: Optional[str] = None

class RegistrationCreate(RegistrationBase):
    password: str

class RegistrationUpdate(BaseModel):
    status: str

class Registration(RegistrationBase):
    id: int
    status: str
    created_at: datetime
    
    # We don't return password
    
    class Config:
        orm_mode = True
