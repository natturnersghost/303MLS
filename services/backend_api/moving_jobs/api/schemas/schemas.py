from pydantic import BaseModel, EmailStr
from datetime import time, date
from typing import Optional




print("hello, world")

  


class Job(BaseModel):

    location: str
    date: date
    starttime: time
    stoptime: time
    travel: float
    rate: int
    number_of_movers: int
    mileage: int
    uhaul: bool = False
    loadSwap: bool = False
    other: bool = False
    fullService: bool = False


    


    class Config:
        orm_mode = True


class JobDisplay(BaseModel):
    id: int
    location: str
    date: date
    starttime: time
    stoptime: time
    travel: float
    rate: int
    number_of_movers: int
    mileage: int
    uhaul: bool 
    loadSwap: bool
    fullService: bool
    other: bool
        # allows the system to return database data into this format
        # converts databse data into user display data ie DBUser to UserDisplay


class UserBase(BaseModel):
    username: str
    email: EmailStr
    password: str
    is_verified: bool = False
    role: str

class UserDisplay(BaseModel):
    username: str
    email: EmailStr
    id: int
    class Config():
        orm_mode = True 

def time_to_int(t: time) -> int:
    return t.hour + t.minute / 60 + t.second / 3600




