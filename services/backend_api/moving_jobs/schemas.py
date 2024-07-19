from pydantic import BaseModel
from datetime import time
from typing import Optional




print("hello, world")

  


class Job(BaseModel):

    location: str
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

    def bill(starttime, stoptime, rate, travel: Optional[int] = 0,  mileage: Optional[int] = 0):
        st = time_to_int(starttime)
        stp = time_to_int(stoptime)
        job_time = (stp - st) + travel
        fuel = mileage * .25
        total = job_time * rate + fuel
        return total


    


    class Config:
        orm_mode = True


class UserDisplay(BaseModel):
    id: int
    location: str
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



def time_to_int(t: time) -> int:
    return t.hour + t.minute / 60 + t.second / 3600




