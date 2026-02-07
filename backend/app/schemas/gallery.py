from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class GalleryBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str

class GalleryCreate(GalleryBase):
    pass # Image handled via UploadFile

class Gallery(GalleryBase):
    id: int
    image_path: str
    created_at: datetime

    class Config:
        orm_mode = True
