import schemas
import models
from typing import Union, List
from db.mlsdb import get_db, engine
from fastapi import FastAPI, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session





app = FastAPI()

app2 = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# app2.mount("/static", StaticFiles(directory="static"), name="static")
# templates = Jinja2Templates(directory="templates")

@app2.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app2.post('/new_job', response_model=schemas.Job)

def new_job(new_job: schemas.Job, db: Session = Depends(get_db)):
    new_job_entry = models.add_new_job(db, new_job)


    return new_job_entry

models.Base.metadata.create_all(engine)   

@app2.get('/jobs', response_model=List[schemas.UserDisplay])
def get_all_jobs(db: Session = Depends(get_db)):
    return models.get_all_jobs(db)

@app2.get('/job/{id}', response_model=schemas.UserDisplay)
def get_job(id: int, db: Session = Depends(get_db)):
    return models.get_job(db, id)

@app2.get('/job/{id}/bill')
def bill_job(id: int, db: Session = Depends(get_db)):

    job = models.get_job(db, id)
    return models.bills(job)

@app2.put('/job/{id}/update')
def update_job(id: int, request: schemas.Job, db: Session = Depends(get_db)):
    return models.update_job(db, id, request)

@app2.delete('/job/{id}/delete')
def delete_job(id: int, db: Session = Depends(get_db)):
    return models.delete_job(db, id)

