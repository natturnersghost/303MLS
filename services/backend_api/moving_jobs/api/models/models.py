from db.mlsdb import Base
from sqlalchemy import Column, Integer, Boolean, String, Date, Float, Time



class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    is_verified = Column(Boolean, default=False)
    role = Column(String)

class JobCounter(Base):
    __tablename__ = "number_of_jobs"
    id = Column(Integer, primary_key=True, index=True)
    db_job_count = Column(Integer, default=0)

class DBJob(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False)
    jobcount = Column(Integer)
    date = Column(Date)
    starttime = Column(Time)
    stoptime = Column(Time)
    travel = Column(Float)
    rate = Column(Integer)
    number_of_movers = Column(Integer)
    mileage = Column(Integer)
    loadSwap = Column(Boolean)
    uhaul = Column(Boolean)
    fullService = Column(Boolean)
    other = Column(Boolean)

    class Config:
        orm_mode = True
