from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Contact])
def read_contacts(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve contacts (Admin only).
    """
    contacts = db.query(models.Contact).offset(skip).limit(limit).all()
    return contacts

@router.post("/", response_model=schemas.Contact)
def create_contact(
    *,
    db: Session = Depends(deps.get_db),
    contact_in: schemas.ContactCreate,
) -> Any:
    """
    Create new contact message.
    """
    contact = models.Contact(**contact_in.dict())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact

@router.patch("/{id}", response_model=schemas.Contact)
def update_contact_status(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    status_in: schemas.ContactUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update contact status.
    """
    contact = db.query(models.Contact).filter(models.Contact.id == id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    contact.status = status_in.status
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact

@router.delete("/{id}", response_model=schemas.Contact)
def delete_contact(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete contact message.
    """
    contact = db.query(models.Contact).filter(models.Contact.id == id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    db.delete(contact)
    db.commit()
    return contact
