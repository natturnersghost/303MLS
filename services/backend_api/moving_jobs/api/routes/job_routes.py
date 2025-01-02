from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
from db.mlsdb import get_db
from auth.oauth2 import oauth2_scheme
from ..repositories import job_repository
from ..schemas import schemas

router = APIRouter()

@router.post('/new_job', response_model=schemas.Job)
def new_job(new_job: schemas.Job, db: Session = Depends(get_db)):
    return job_repository.add_new_job(db, new_job)

@router.get('/jobs', response_model=List[schemas.JobDisplay])
def get_all_jobs(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    return job_repository.get_all_jobs(db)

@router.get('/job/{id}', response_model=schemas.JobDisplay)
def get_job(id: str, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    job = job_repository.get_job(db, id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f'job {id} not found')
    else:
        return job

@router.get('/job/{id}/bill')
def bill_job(id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    job = job_repository.get_job(db, id)
    return job_repository.bills(job)

@router.put('/job/{id}/update')
def update_job(id: int, request: schemas.Job, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    return job_repository.update_job(db, id, request)

@router.delete('/job/{id}/delete')
def delete_job(id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    return job_repository.delete_job(db, id)
