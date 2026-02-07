from typing import Any, List, Optional
import shutil
import os
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()
UPLOAD_DIR = "uploads/team"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[schemas.TeamMember])
def read_team(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve team members (Public).
    """
    team = db.query(models.TeamMember).offset(skip).limit(limit).all()
    return team

@router.post("/", response_model=schemas.TeamMember)
def create_team_member(
    *,
    db: Session = Depends(deps.get_db),
    name: str = Form(...),
    role: str = Form(...),
    bio: Optional[str] = Form(None),
    twitter_url: Optional[str] = Form(None),
    linkedin_url: Optional[str] = Form(None),
    image: UploadFile = File(...),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Add team member (Admin only).
    """
    # Save image
    file_extension = image.filename.split(".")[-1]
    file_name = f"{uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
        
    member = models.TeamMember(
        name=name,
        role=role,
        bio=bio,
        twitter_url=twitter_url,
        linkedin_url=linkedin_url,
        image_path=file_path
    )
    db.add(member)
    db.commit()
    db.refresh(member)
    return member

@router.delete("/{id}", response_model=schemas.TeamMember)
def delete_team_member(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete team member (Admin only).
    """
    member = db.query(models.TeamMember).filter(models.TeamMember.id == id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    if member.image_path and os.path.exists(member.image_path):
        os.remove(member.image_path)

    db.delete(member)
    db.commit()
    return member
