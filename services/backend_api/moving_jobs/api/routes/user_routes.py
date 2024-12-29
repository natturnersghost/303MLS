from fastapi import APIRouter, Depends, HTTPException, status, Form
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from db.mlsdb import get_db
from db import db_user
from api.schemas.schemas import UserBase, UserDisplay
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

router = APIRouter(
    tags=['Users']
)

@router.post('/sign_in', include_in_schema=True)
async def sign_in(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    try:
        print(f"Received sign in request for user: {form_data.username}")
        
        request = UserBase(
            username=form_data.username,
            password=form_data.password
        )
        
        user = db_user.sign_in(db, request)
        if not user:
            return JSONResponse(
                content={"detail": "Invalid credentials"},
                status_code=status.HTTP_401_UNAUTHORIZED,
                media_type="application/json"
            )
        
        response_data = {
            "access_token": "your_token_here",
            "token_type": "bearer",
            "user_id": user.id,
            "username": user.username
        }
        
        print(f"Sending response: {response_data}")
        
        return JSONResponse(
            content=response_data,
            status_code=200,
            media_type="application/json"
        )
    except Exception as e:
        print(f"Error in sign_in: {str(e)}")
        return JSONResponse(
            content={"detail": str(e)},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            media_type="application/json"
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
    user = db_user.get_user(db, id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return db_user.update_user(db, id, request)

@router.delete('/user/{id}/delete')
def delete_user(id: int, db: Session = Depends(get_db)):
    return db_user.delete_user(db, id)
