# Third-party imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Local imports
from api.routes.auth import auth_routes
from api.routes.user import user_routes
from api.routes.job import job_routes

# Initialize FastAPI app
app = FastAPI()

# Include routers
app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(job_routes.router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   