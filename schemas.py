
from pydantic import BaseModel

class ReminderCreate(BaseModel):
    title: str
    message: str

class ReminderUpdate(BaseModel):
    title: str
    message: str

class ReminderOut(BaseModel):
    id: int
    title: str
    message: str