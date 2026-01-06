from fastapi import FastAPI

app = FastAPI()

reminders = []

@app.get("/")
def home():
    return {"message": "HOME OK"}

@app.post("/reminders")
def create_reminder(title: str, message: str):
    reminder = {
        "id": len(reminders) + 1,
        "title": title,
        "message": message
    }
    reminders.append(reminder)
    return reminder

@app.get("/reminders")
def list_reminders():
    return {"TESTE": "GET FUNCIONANDO", "data": reminders}

