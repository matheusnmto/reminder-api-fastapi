from fastapi import FastAPI, HTTPException
from database import get_connection, create_table
from schemas import ReminderCreate, ReminderUpdate, ReminderOut
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_table()

@app.get("/")
def home():
    return {"message": "HOME OK"}

from database import get_connection

#ROTA POST REMINDERS - FUNCAO CREATE REMINDER

@app.post("/reminders", response_model=ReminderOut)
def create_reminder(reminder: ReminderCreate):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO reminders (title, message) VALUES (?, ?)",
        (reminder.title, reminder.message)
    )

    conn.commit()
    reminder_id = cursor.lastrowid
    conn.close()

    return {
        "id": reminder_id,
        "title": reminder.title,
        "message": reminder.message
    }


#ROTA GET REMINDERS - FUNCAO LISTAR REMINDERS

@app.get("/reminders", response_model=List[ReminderOut])
def list_reminders():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, title, message FROM reminders")
    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]


#ROTA PUT REMINDERS - FUNCAO UPDATE REMINDER

@app.put("/reminders/{reminder_id}", response_model=ReminderOut)
def update_reminder(reminder_id: int, reminder: ReminderUpdate):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE reminders SET title = ?, message = ? WHERE id = ?",
        (reminder.title, reminder.message, reminder_id)
    )

    #Nada foi atualizado = ID não existe
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Reminder not found"
        )

    conn.commit()

    cursor.execute(
        "SELECT id, title, message FROM reminders WHERE id = ?",
        (reminder_id,)
    )
    updated = cursor.fetchone()
    conn.close()

    return dict(updated)

#ROTA DELETE REMINDERS - FUNCAO DELETE REMINDER

@app.delete("/reminders/{reminder_id}")
def delete_reminder(reminder_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM reminders WHERE id = ?",
        (reminder_id,)
    )

    # Nada foi deletado = ID não existe
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Reminder not found"
        )

    conn.commit()
    conn.close()

    return {"message": "Reminder deleted successfully"}

