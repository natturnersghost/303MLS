from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from decouple import config
import models
 
# STEP 1: 

 # database name is mls.db
SQLALCHEMY_DATABASE_URL = config('SQLALCHEMY_DATABASE_URL')
 
 # when called in famain.py this runs the database I think
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# base will be used to create models
# whatever that means
Base = declarative_base()

def get_db():
    db = SessionLocal()
    # crudmodels.init_job_counter(db)
    try:
        yield db
    finally:
        db.close()