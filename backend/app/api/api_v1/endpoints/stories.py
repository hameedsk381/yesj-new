from typing import Any, List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.api import deps
import shutil
import os
import uuid
from slugify import slugify

router = APIRouter()

UPLOAD_DIR = "uploads/stories"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[schemas.Story])
def read_stories(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    return db.query(models.Story).offset(skip).limit(limit).all()

@router.post("/", response_model=schemas.Story)
def create_story(
    title: str = Form(...),
    excerpt: str = Form(...),
    author: str = Form(...),
    category: str = Form("General"),
    content: str = Form(None),
    featured: bool = Form(False),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    slug = slugify(title)
    
    # Handle duplicate slugs
    original_slug = slug
    count = 1
    while db.query(models.Story).filter(models.Story.slug == slug).first():
        slug = f"{original_slug}-{count}"
        count += 1

    image_path = None
    if image:
        extension = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{extension}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_path = file_path.replace("\\", "/") # Windows fix

    story = models.Story(
        title=title,
        slug=slug,
        excerpt=excerpt,
        content=content,
        author=author,
        category=category,
        featured=featured,
        image_path=image_path
    )
    db.add(story)
    db.commit()
    db.refresh(story)
    return story

@router.delete("/{id}", response_model=schemas.Story)
def delete_story(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    story = db.query(models.Story).filter(models.Story.id == id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    if story.image_path and os.path.exists(story.image_path):
        os.remove(story.image_path)
        
    db.delete(story)
    db.commit()
    return story
