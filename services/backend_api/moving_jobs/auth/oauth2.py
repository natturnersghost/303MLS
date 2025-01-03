from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from datetime import datetime, timedelta
from jose import jwt
from decouple import config
from sqlalchemy.orm import Session
from db import db_user
from db.mlsdb import get_db
 
 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="sign_in")

SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = config('ACCESS_TOKEN_EXPIRE_MINUTES')
 
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.utcnow() + expires_delta
  else:
    expire = datetime.utcnow() + timedelta(minutes=15)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
  payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
  username: str = payload.get("sub")

  return db_user.get_user_by_username(db, username)
