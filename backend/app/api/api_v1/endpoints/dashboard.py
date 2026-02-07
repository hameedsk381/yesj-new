from typing import Any, Dict

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()

@router.get("/")
def read_dashboard_stats(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Get dashboard statistics (Admin only).
    """
    registrations_count = db.query(models.Registration).count()
    nominations_count = db.query(models.Nomination).count()
    contacts_count = db.query(models.Contact).count()
    newsletters_count = db.query(models.Newsletter).count()
    
    # Placeholder for other stats
    events_count = db.query(models.Event).count()
    gallery_count = db.query(models.Gallery).count()
    team_count = db.query(models.TeamMember).count()
    stories_count = db.query(models.Story).count()
    
    return {
        "data": {
            "registrations": registrations_count,
            "nominations": nominations_count,
            "contacts": contacts_count,
            "newsletters": newsletters_count,
            "events": events_count,
            "gallery": gallery_count,
            "team": team_count,
            "stories": stories_count
        },
        "count": registrations_count # legacy/compat
    }
