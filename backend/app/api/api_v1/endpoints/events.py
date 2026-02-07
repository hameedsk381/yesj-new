from typing import Any, List, Optional
import shutil
import os
from uuid import uuid4
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()
UPLOAD_DIR = "uploads/events"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[schemas.Event])
def read_events(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve events (Public).
    """
    events = db.query(models.Event).order_by(models.Event.date.desc()).offset(skip).limit(limit).all()
    return events

@router.post("/", response_model=schemas.Event)
def create_event(
    *,
    db: Session = Depends(deps.get_db),
    title: str = Form(...),
    description: str = Form(...),
    date: datetime = Form(...), # Expects ISO format strings which FastAPI converts
    location: str = Form(...),
    type: str = Form(...),
    fee: Optional[str] = Form(None),
    deadline: Optional[datetime] = Form(None),
    image: UploadFile = File(...),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new event (Admin only).
    """
    # Save image
    file_extension = image.filename.split(".")[-1]
    file_name = f"{uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
        
    event = models.Event(
        title=title,
        description=description,
        date=date,
        location=location,
        type=type,
        fee=fee,
        deadline=deadline,
        image_path=file_path
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

@router.delete("/{id}", response_model=schemas.Event)
def delete_event(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete event (Admin only).
    """
    event = db.query(models.Event).filter(models.Event.id == id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Optional: Delete file from disk
    if event.image_path and os.path.exists(event.image_path):
        os.remove(event.image_path)

    db.delete(event)
    db.commit()
    return event
