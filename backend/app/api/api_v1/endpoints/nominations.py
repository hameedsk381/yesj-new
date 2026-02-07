from typing import Any, List, Optional
import shutil
import os
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()
UPLOAD_DIR = "uploads/nominations"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[schemas.Nomination])
def read_nominations(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve nominations (Admin only).
    """
    nominations = db.query(models.Nomination).offset(skip).limit(limit).all()
    return nominations

@router.post("/", response_model=schemas.Nomination)
def create_nomination(
    *,
    db: Session = Depends(deps.get_db),
    name: str = Form(...),
    unit_name: str = Form(...),
    contesting_for: str = Form(...),
    education_qualification: str = Form(...),
    noc_file: UploadFile = File(...),
) -> Any:
    """
    Create new nomination with file upload.
    """
    # Save file
    file_extension = noc_file.filename.split(".")[-1]
    file_name = f"{uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(noc_file.file, buffer)
        
    nomination = models.Nomination(
        name=name,
        unit_name=unit_name,
        contesting_for=contesting_for,
        education_qualification=education_qualification,
        noc_file_path=file_path
    )
    db.add(nomination)
    db.commit()
    db.refresh(nomination)
    return nomination
