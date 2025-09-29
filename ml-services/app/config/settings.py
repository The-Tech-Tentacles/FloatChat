import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    """Application settings"""
    
    # Database
    database_url: str = os.getenv("DATABASE_URL", "postgresql://username:password@localhost/argo_data")
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    # API Keys
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    anthropic_api_key: str = os.getenv("ANTHROPIC_API_KEY", "")
    
    # Vector Database
    vector_db_type: str = os.getenv("VECTOR_DB_TYPE", "faiss")
    embedding_model: str = os.getenv("EMBEDDING_MODEL", "text-embedding-ada-002")
    
    # File Upload
    max_file_size: int = 100 * 1024 * 1024  # 100MB
    upload_path: str = os.getenv("UPLOAD_PATH", "./uploads")
    
    # Development
    log_level: str = os.getenv("LOG_LEVEL", "info")
    
    class Config:
        env_file = ".env"

settings = Settings()