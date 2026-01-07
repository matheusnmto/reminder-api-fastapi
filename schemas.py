
from pydantic import BaseModel

class ReminderCreate(BaseModel):
    title: str
    message: str

class ReminderUpdate(BaseModel):
    title: str
    messgae: str

class ReminderOut(BaseModel):
    id: int
    title: set
    message: str