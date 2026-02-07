from typing import Any, List, Optional
import shutil
import os
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()
UPLOAD_DIR = "uploads/gallery"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[schemas.Gallery])
def read_gallery(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None
) -> Any:
    """
    Retrieve gallery images (Public).
    """
    query = db.query(models.Gallery)
    if category:
        query = query.filter(models.Gallery.category == category)
        
    gallery = query.order_by(models.Gallery.created_at.desc()).offset(skip).limit(limit).all()
    return gallery

@router.post("/", response_model=schemas.Gallery)
def create_gallery_item(
    *,
    db: Session = Depends(deps.get_db),
    title: str = Form(...),
    category: str = Form(...),
    description: Optional[str] = Form(None),
    image: UploadFile = File(...),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Add image to gallery (Admin only).
    """
    # Save image
    file_extension = image.filename.split(".")[-1]
    file_name = f"{uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
        
    item = models.Gallery(
        title=title,
        category=category,
        description=description,
        image_path=file_path
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{id}", response_model=schemas.Gallery)
def delete_gallery_item(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete gallery item (Admin only).
    """
    item = db.query(models.Gallery).filter(models.Gallery.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    if item.image_path and os.path.exists(item.image_path):
        os.remove(item.image_path)

    db.delete(item)
    db.commit()
    return item
