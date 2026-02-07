from typing import List, Union, Optional
from pydantic import AnyHttpUrl, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "YESJ Backend"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @computed_field
    def assembled_cors_origins(self) -> List[str]:
        return [str(origin) for origin in self.BACKEND_CORS_ORIGINS]

    # Security
    SECRET_KEY: str = "default-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30 * 24 * 60  # 30 days

    # AI Keys
    GROQ_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None


    # Database
    POSTGRES_SERVER: Optional[str] = None
    POSTGRES_USER: Optional[str] = None
    POSTGRES_PASSWORD: Optional[str] = None
    POSTGRES_DB: Optional[str] = None
    POSTGRES_PORT: int = 5432 # default postgres port

    DATA_DIR: str = os.getenv("DATA_DIR", ".")

    @computed_field
    def sqlite_url(self) -> str:
        # Fallback for dev if needed, or primary
        return f"sqlite:///{self.DATA_DIR}/sql_app.db"
    
    @computed_field
    def sqlalchemy_database_uri(self) -> str:
        # Construct URI
        if self.POSTGRES_SERVER and self.POSTGRES_USER and self.POSTGRES_PASSWORD:
            return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        return self.sqlite_url

    model_config = SettingsConfigDict(
        env_file=".env", 
        case_sensitive=True,
        extra="ignore" # Ignore extra env vars
    )

settings = Settings()
