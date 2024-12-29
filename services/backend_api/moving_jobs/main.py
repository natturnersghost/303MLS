# Third-party imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Local imports
from auth import authentication_routes
from api.routes import user_routes
from api.routes import job_routes

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