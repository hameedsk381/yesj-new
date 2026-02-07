# YESJ Website - Docker Guide

This project is containerized using Docker and orchestrated with Docker Compose. It consists of a Next.js frontend and a FastAPI backend.

## Prerequisites

- Docker installed
- Docker Compose installed
- Environment variables configured (see `.env.example`)

## Quick Start (Docker Compose)

1. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values (API Keys, etc.)
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up --build -d
   ```

3. **View services status:**
   ```bash
   docker-compose ps
   ```

4. **View logs:**
   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f web
   docker-compose logs -f backend
   ```

5. **Stop services:**
   ```bash
   docker-compose down
   ```

## Services Architecture

- **Web (Next.js):** Accessible at `http://localhost:3000`
- **Backend (FastAPI):** Accessible at `http://localhost:8000`
- **Database:** SQLite (persisted via `backend_data` volume)
- **Uploads:** Persisted via `backend_uploads` volume

## Persistence

Data is persisted using Docker volumes:
- `backend_data`: Stores the SQLite database (`sql_app.db`) and ChromaDB store.
- `backend_uploads`: Stores user-uploaded files.

To wipe all data and start fresh:
```bash
docker-compose down -v
```

## Environment Variables

The `docker-compose.yml` file passes essential environment variables to the containers. Key variables include:

### Frontend (Web)
- `BACKEND_API_URL`: Points to the backend service (`http://backend:8000/api/v1`)
- `JWT_SECRET`: For authentication
- `MINIO_*`: For object storage (optional)

### Backend
- `GROQ_API_KEY` / `OPENAI_API_KEY`: Required for RAG functionality
- `DATA_DIR`: Set to `/app/data` for persistence within the container

## Manual Docker Commands (Optional)

If you need to run services individually:

### Backend
```bash
cd backend
docker build -t yesj-backend .
docker run -p 8000:8000 -e GROQ_API_KEY=your_key yesj-backend
```

### Frontend
```bash
docker build -t yesj-web .
docker run -p 3000:3000 -e BACKEND_API_URL=http://your-ip:8000/api/v1 yesj-web
```

## Troubleshooting

### Connection refused between frontend and backend
Ensure both services are running in the same Docker network (handled automatically by Docker Compose). The frontend matches the backend service name `backend`.

### Database locking issues
SQLite might have issues if multiple processes try to write simultaneously. Docker Compose setup ensures a single backend process handles DB operations.

### Missing API Keys
If the chat/RAG feature doesn't work, check if `GROQ_API_KEY` or `OPENAI_API_KEY` is correctly set in your `.env` file before running `docker-compose up`.
