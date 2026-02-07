from fastapi import APIRouter

from app.api.api_v1.endpoints import users, login, contacts, newsletter, nominations, registrations, dashboard, events, gallery, team, stories, chat

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(contacts.router, prefix="/contacts", tags=["contacts"])
api_router.include_router(newsletter.router, prefix="/newsletters", tags=["newsletter"])
api_router.include_router(nominations.router, prefix="/nominations", tags=["nominations"])
api_router.include_router(registrations.router, prefix="/registrations", tags=["registrations"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(gallery.router, prefix="/gallery", tags=["gallery"])
api_router.include_router(team.router, prefix="/team", tags=["team"])
api_router.include_router(stories.router, prefix="/stories", tags=["stories"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
