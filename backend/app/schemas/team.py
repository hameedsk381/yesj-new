from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class TeamMemberBase(BaseModel):
    name: str
    role: str
    bio: Optional[str] = None
    twitter_url: Optional[str] = None
    linkedin_url: Optional[str] = None

class TeamMemberCreate(TeamMemberBase):
    pass # Image handled via UploadFile

class TeamMember(TeamMemberBase):
    id: int
    image_path: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True
