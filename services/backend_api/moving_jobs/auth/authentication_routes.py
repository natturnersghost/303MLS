from fastapi import APIRouter, HTTPException, status
from fastapi import Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from db.mlsdb import get_db
from api.models.models import DBUser
from db.hash import Hash
from auth import oauth2

router = APIRouter(
    tags=['authentication']
)

@router.post('/sign_in')
def get_token(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(DBUser).filter(DBUser.username == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Invalid Credentials')
    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Invalid Credentials')

    access_token = oauth2.create_access_token(data={"sub": user.username})

    return{
        'access_token': access_token,
        'token_type': 'bearer',
        'user_id': user.id,
        'username': user.username
    }