from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
from dotenv import load_dotenv

from app.services.netcdf_processor import NetCDFProcessor
from app.services.vector_database import VectorDatabase
from app.services.rag_service import RAGService
from app.services.chat_service import ChatService
from app.config.database import get_db
from app.config.settings import settings

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="ARGO Float ML Services",
    description="AI-powered backend for ARGO float data processing and analysis",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
netcdf_processor = NetCDFProcessor()
vector_db = VectorDatabase()
rag_service = RAGService()
chat_service = ChatService()

@app.get("/")
async def root():
    return {
        "message": "ARGO Float ML Services API",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "services": {
            "database": "connected",
            "vector_db": "initialized",
            "ml_models": "loaded"
        }
    }

# Data endpoints
@app.get("/api/floats")
async def get_floats(
    lat: float = None,
    lon: float = None,
    radius: float = None,
    start_date: str = None,
    end_date: str = None,
    db=Depends(get_db)
):
    """Get ARGO float data with optional filtering"""
    try:
        # TODO: Implement database query
        return {
            "floats": [],
            "total": 0,
            "filters": {
                "lat": lat,
                "lon": lon,
                "radius": radius,
                "start_date": start_date,
                "end_date": end_date
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/profiles/{float_id}")
async def get_profiles(
    float_id: str,
    parameter: str = None,
    start_date: str = None,
    end_date: str = None,
    db=Depends(get_db)
):
    """Get profile data for a specific float"""
    try:
        # TODO: Implement profile data retrieval
        return {
            "float_id": float_id,
            "profiles": [],
            "parameter": parameter
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/search")
async def search_data(query: str, limit: int = 10):
    """Search ARGO data using vector similarity"""
    try:
        results = await vector_db.search(query, limit)
        return {
            "query": query,
            "results": results,
            "limit": limit
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/statistics")
async def get_statistics(db=Depends(get_db)):
    """Get dataset statistics"""
    try:
        # TODO: Implement statistics calculation
        return {
            "total_floats": 0,
            "total_profiles": 0,
            "date_range": {
                "start": None,
                "end": None
            },
            "geographic_coverage": {
                "lat_range": [-90, 90],
                "lon_range": [-180, 180]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Chat endpoints
@app.post("/api/chat/message")
async def process_chat_message(message_data: dict):
    """Process natural language queries"""
    try:
        message = message_data.get("message")
        conversation_id = message_data.get("conversationId")
        
        response = await chat_service.process_message(message, conversation_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Upload endpoints
@app.post("/api/upload/process")
async def process_upload(file: UploadFile = File(...)):
    """Process uploaded NetCDF files"""
    try:
        if not file.filename.endswith(('.nc', '.netcdf')):
            raise HTTPException(status_code=400, detail="Only NetCDF files are supported")
        
        # Process the file
        result = await netcdf_processor.process_file(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/upload/status/{job_id}")
async def get_upload_status(job_id: str):
    """Get upload processing status"""
    try:
        # TODO: Implement job status tracking
        return {
            "job_id": job_id,
            "status": "completed",
            "progress": 100,
            "message": "Processing completed successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Visualization endpoints
@app.post("/api/visualization/plot")
async def generate_plot(plot_data: dict):
    """Generate visualization plots"""
    try:
        plot_type = plot_data.get("type")
        data = plot_data.get("data")
        options = plot_data.get("options", {})
        
        # TODO: Implement plot generation
        return {
            "plot_url": None,
            "plot_data": None,
            "type": plot_type
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/visualization/map-data")
async def get_map_data(bounds: str = None, filters: str = None):
    """Get data for map visualization"""
    try:
        # TODO: Implement map data retrieval
        return {
            "features": [],
            "bounds": bounds,
            "filters": filters
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )