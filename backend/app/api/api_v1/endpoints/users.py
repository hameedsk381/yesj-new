from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps
# from app.crud import crud_user as crud

router = APIRouter()

@router.get("/", response_model=List[schemas.User])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve users.
    """
    # users = crud.user.get_multi(db, skip=skip, limit=limit)
    users = [] # Placeholder
    return users

@router.post("/", response_model=schemas.User)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
) -> Any:
    """
    Create new user.
    """
    # user = crud.user.get_by_email(db, email=user_in.email)
    # if user:
    #     raise HTTPException(
    #         status_code=400,
    #         detail="The user with this username already exists in the system.",
    #     )
    # user = crud.user.create(db, obj_in=user_in)
    return user_in # Placeholder
