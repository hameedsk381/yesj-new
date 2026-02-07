from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.api_v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Backend API for YESJ Website built with FastAPI"
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles

app.include_router(api_router, prefix=settings.API_V1_STR)

# Mount static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
def init_db():
    from app.db.session import engine
    from app.db.base import Base
    from app.db.session import SessionLocal
    from app.models.user import User
    from app.models.event import Event
    from app.models.gallery import Gallery
    from app.models.team import TeamMember
    from app.models.contact import Contact
    from app.models.newsletter import Newsletter
    from app.models.nomination import Nomination
    from app.models.registration import Registration
    from app.models.story import Story
    from app.core.security import get_password_hash
    
    Base.metadata.create_all(bind=engine)
    
    # Create initial superuser
    db = SessionLocal()
    user = db.query(User).filter(User.email == "admin@yesj.in").first()
    if not user:
        user = User(
            email="admin@yesj.in",
            hashed_password=get_password_hash("admin"),
            full_name="Admin",
            is_superuser=True,
            is_active=True,
        )
        db.add(user)
        db.commit()
    db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to YESJ API"}
