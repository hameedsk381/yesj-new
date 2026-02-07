from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps
from app.core import security

router = APIRouter()

@router.get("/", response_model=List[schemas.Registration])
def read_registrations(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve registrations (Admin only).
    """
    registrations = db.query(models.Registration).offset(skip).limit(limit).all()
    return registrations

@router.post("/", response_model=schemas.Registration)
def create_registration(
    *,
    db: Session = Depends(deps.get_db),
    registration_in: schemas.RegistrationCreate,
) -> Any:
    """
    Create new registration.
    """
    existing_user = db.query(models.Registration).filter(models.Registration.email_id == registration_in.email_id).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Registration with this email already exists",
        )
        
    obj_in_data = registration_in.dict()
    password = obj_in_data.pop("password")
    hashed_password = security.get_password_hash(password)
    
    registration = models.Registration(**obj_in_data, hashed_password=hashed_password)
    db.add(registration)
    db.commit()
    db.refresh(registration)
    return registration
