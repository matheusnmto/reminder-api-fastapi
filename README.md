# stay-on-track — Reminder System

Productivity-focused reminder app with a decoupled architecture, combining a Python backend with a modern dark-aesthetic web interface.

| Layer | Technology | Description |
|-------|------------|-------------|
| **app/** | FastAPI + SQLite | REST API with Pydantic validation and local persistence |
| **frontend/** | Next.js + Tailwind | SPA interface focused on performance and fluid animations |

## Monorepo Structure
```
stay-on-track/
├── app/                # Backend (API)
│   ├── main.py         # Application entry point
│   ├── schemas.py      # Type definitions and validation
│   └── reminders.db    # SQLite database
├── frontend/           # Interface (Client)
│   ├── app/            # Next.js route structure
│   └── components/     # UI components
└── README.md
```

## How to Run

### 1. Backend Server

Run from the project root:
```bash
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```

API documentation available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 2. Frontend Interface

Navigate to the client folder to start the development environment:
```bash
cd frontend
npm install
npm run dev
```

Access at: [http://localhost:3000](http://localhost:3000)
