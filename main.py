from fastapi import FastAPI, HTTPException
from database import get_connection, create_table
from schemas import ReminderCreate, ReminderUpdate

app = FastAPI()
create_table()

@app.get("/")
def home():
    return {"message": "HOME OK"}

from database import get_connection

@app.post("/reminders")
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


@app.get("/reminders")
def list_reminders():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM reminders")
    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]


@app.put("/reminders/{reminder_id}")
def update_reminder(reminder_id: int, reminder: ReminderUpdate):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE reminders SET title = ?, message = ? WHERE id = ?",
        (reminder.title, reminder.message, reminder_id)
    )

    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Reminder not found")

    conn.close()

    return {
        "id": reminder_id,
        "title": reminder.title,
        "message": reminder.message
    }


@app.delete("/reminders/{reminder_id}")
def delete_reminder(reminder_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM reminders WHERE id = ?",
        (reminder_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Reminder not found")

    conn.close()

    return {"message": "Reminder deleted successfully"}
