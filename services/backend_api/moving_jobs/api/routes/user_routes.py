from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
from db.mlsdb import get_db
from db import db_user
from api.schemas.schemas import UserBase, UserDisplay

router = APIRouter(
    tags=['Users']
)

@router.post('/new_user', response_model=UserDisplay)
def create_user(request: UserBase, db: Session = Depends(get_db)):
    return db_user.create_user(db, request)

@router.get('/all_users', response_model=List[UserDisplay])
def get_all_users(db: Session = Depends(get_db)):
    print(db.bind)
    return db_user.get_all_users(db)

@router.get('/user/{id}', response_model=UserDisplay)
def get_user(id: int, db: Session = Depends(get_db)):
    return db_user.get_user(db, id)

@router.put('/user/{id}/update')
def update_user(id: int, request: UserBase, db: Session = Depends(get_db)):
    return db_user.update_user(db, id, request)

@router.delete('/user/{id}/delete')
def delete_user(id: int, db: Session = Depends(get_db)):
    return db_user.delete_user(db, id)
