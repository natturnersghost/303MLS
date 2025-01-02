# Third-party imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
from sqlalchemy import inspect
# Local imports
from auth import authentication_routes
from api.routes import user_routes
from api.routes import job_routes
from db.mlsdb import Base, engine
# Import all models so they're registered with SQLAlchemy
from api.models.models import DBUser, DBJob, JobCounter

# Get FastAPI's logger
logger = logging.getLogger("uvicorn")

# Add these debug logs
logger.info(f"Current working directory: {os.getcwd()}")
logger.info("Attempting to create database tables...")
try:
    # Print the models that Base knows about
    logger.info(f"Models registered with Base: {Base.metadata.tables.keys()}")
    
    Base.metadata.create_all(bind=engine)
    
    # Check what tables were actually created
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    logger.info(f"Tables in database after creation: {tables}")
    logger.info("Database tables created successfully!")
except Exception as e:
    logger.error(f"Error creating tables: {str(e)}")

# Initialize FastAPI app
app2 = FastAPI()


# Configure CORS - Update allow_origins to match your setup
app2.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:443", "http://localhost:3000"],  # Add both HTTP and HTTPS
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   

# Include routers - Remove the /api prefix from the router itself
app2.include_router(authentication_routes.router)
app2.include_router(user_routes.router)
app2.include_router(job_routes.router)   