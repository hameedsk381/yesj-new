from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class StoryBase(BaseModel):
    title: str
    excerpt: str
    author: str
    category: str
    content: Optional[str] = None
    featured: bool = False

class StoryCreate(StoryBase):
    pass

class Story(StoryBase):
    id: int
    slug: str
    image_path: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True
