from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Newsletter])
def read_newsletter_subscribers(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve newsletter subscribers (Admin only).
    """
    subscribers = db.query(models.Newsletter).offset(skip).limit(limit).all()
    return subscribers

@router.post("/", response_model=schemas.Newsletter)
def create_newsletter_subscription(
    *,
    db: Session = Depends(deps.get_db),
    newsletter_in: schemas.NewsletterCreate,
) -> Any:
    """
    Subscribe to newsletter.
    """
    subscriber = db.query(models.Newsletter).filter(models.Newsletter.email == newsletter_in.email).first()
    if subscriber:
        return subscriber
        
    subscriber = models.Newsletter(**newsletter_in.dict())
    db.add(subscriber)
    db.commit()
    db.refresh(subscriber)
    return subscriber
