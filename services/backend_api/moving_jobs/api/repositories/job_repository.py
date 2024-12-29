from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import datetime, time
import math

from ..models.models import DBJob, JobCounter
from ..schemas.schemas import Job
from .. import schemas, exceptions

def get_job_count(db: Session) -> int:
    job_count = db.query(JobCounter).first()
    if not job_count:
        job_count = JobCounter(db_job_count=0)
        db.add(job_count)
        db.commit()
        db.refresh(job_count)
    return job_count.db_job_count

def increment_job_count(db: Session) -> int:
    update_count = db.query(JobCounter).with_for_update().first()
    update_count.db_job_count += 1
    db.commit()
    return update_count.db_job_count

def generate_id(count: int) -> int:
    today = datetime.today().date()
    id = f'{today}-{count}'.replace('-', '')
    return int(id)

def add_new_job(db: Session, request: Job) -> DBJob:
    job_count = get_job_count(db)
    new_job_id = generate_id(job_count)
    increment_job_count(db)
    
    if request.location.startswith('Denver'):
        raise exceptions.DenverException('colorado face ass')
        
    new_job = DBJob(
        id=new_job_id,
        date=datetime.today().date(),
        location=request.location,
        starttime=request.starttime,
        stoptime=request.stoptime,
        travel=request.travel,
        rate=request.rate,
        number_of_movers=request.number_of_movers,
        mileage=request.mileage,
        loadSwap=request.loadSwap,
        uhaul=request.uhaul,
        fullService=request.fullService,
        other=request.other
    )
    
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

def get_all_jobs(db: Session):
    all_jobs = db.query(DBJob).all()
    if not all_jobs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='No jobs found'
        )
    return all_jobs

def get_job(db: Session, id: str) -> DBJob:
    job = db.query(DBJob).filter(DBJob.id == id).first()
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'job {id} not found'
        )
    return job

def update_job(db: Session, id: str, request: Job) -> DBJob:
    job = db.query(DBJob).filter(DBJob.id == id).first()
    if job:
        for key, value in request.dict().items():
            setattr(job, key, value)
        db.commit()
        db.refresh(job)
    return job

def delete_job(db: Session, id: str) -> DBJob:
    job = db.query(DBJob).filter(DBJob.id == id).first()
    if job:
        db.delete(job)
        db.commit()
    return job

def time_to_int(t: time) -> int:
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
        'formated_total': total
       
    }
    return response