from sqlalchemy import Column, Integer, Boolean, ForeignKey, String, Date, Float, Time
from sqlalchemy.orm import Session, relationship 
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy import func
import schemas
import math

from typing import Optional


Base = declarative_base()



class JobCounter(Base):
    __tablename__ = "number_of_jobs"
    id = Column(Integer, primary_key=True, index=True)
    db_job_count = Column(Integer, default=0)




class DBJob(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)

    # made it optional beacause it doesnt work idk
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

   
# adds counter to the database
def get_job_count(db: Session):
    job_count = db.query(JobCounter).first()
    if not job_count:
        job_count = JobCounter(db_job_count=0)
        db.add(job_count)
        db.commit()
        db.refresh(job_count)
    return job_count.db_job_count  


def get_job_counter(db: Session):
    return db.query(JobCounter).first()


def increment_job_count(db: Session) -> int:
    update_count = db.query(JobCounter).with_for_update().first()
    update_count.db_job_count += 1
    db.commit()
    print(f'Job count is now {update_count.db_job_count}')
    return update_count.db_job_count
          
def remove_dashes(input_string):
    return input_string.replace('-', '')

def generate_id(count: int):
    today: Date = datetime.today().date()
    id = f'{today}-{count}'
    id = remove_dashes(id)

    return int(id)

# this adds data to the database
def add_new_job(db: Session, request: schemas.Job):
    
    job_count = get_job_count(db)
    today: Date = datetime.today().date()
    new_job_id = generate_id(job_count)
    increment_job_count(db)
 
    new_job = DBJob(
        
        id = new_job_id,
        date = today,
        location = request.location,
        starttime = request.starttime,
        stoptime = request.stoptime,
        travel = request.travel,
        rate = request.rate,
        number_of_movers = request.number_of_movers,
        mileage = request.mileage,
        loadSwap = request.loadSwap,
        uhaul = request.uhaul,
        fullService = request.fullService,
        other = request.other

    )

    db.add(new_job) # -> adds a new job
    db.commit() # -> sends it to the database
    db.refresh(new_job) # -> refreshes the database with the new data 
    
    return new_job

def get_all_jobs(db: Session):
    return db.query(DBJob).all()

def get_job(db: Session, id: str):
    return db.query(DBJob).filter(DBJob.id == id).first()


def time_to_int(t: Time) -> int:
    time = t.hour + t.minute / 60 + t.second / 3600

    return math.ceil(time * 4) / 4


def bills(job: DBJob):
    if job is None:
        raise ValueError("The job parameter cannot be None")
    
    st = time_to_int(job.starttime)
    stp = time_to_int(job.stoptime)
    job_time = (stp - st) + job.travel
    if job.loadSwap and job.mileage < 40:
        fuel = 10
    else:    
        fuel = job.mileage * .25
    total1 = job_time * job.rate + fuel
    total = f'{job.location}: {job_time}H * {job.rate} + {fuel} = {total1}'
    response = {
        'total': total1,
        'job_time': job_time,
        'job_location': job.location,
        'hourly_rate': job.rate,
       
    }
    return response

def update_job(db: Session, id: str, request: schemas.Job):
    job = db.query(DBJob).filter(DBJob.id == id).first()
    if job:
        job.location = request.location
        job.starttime = request.starttime
        job.stoptime = request.stoptime
        job.travel = request.travel
        job.rate = request.rate
        job.number_of_movers = request.number_of_movers
        job.mileage = request.mileage
        job.loadSwap = request.loadSwap
        job.uhaul = request.uhaul
        job.fullService = request.fullService
        job.other = request.other
        
        db.commit()
        db.refresh(job)  # Optional: refresh the instance with the latest data from the database

    return job

def delete_job(db: Session, id: str):
    job = db.query(DBJob).filter(DBJob.id == id).first()
    if job:
        db.delete(job)
        db.commit()
    return job
