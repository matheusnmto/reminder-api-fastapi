# ✦ Stay on Track API & Client

> A minimalist, dark-themed reminder application designed for extreme productivity and focus.

![Architecture: Monorepo](https://img.shields.io/badge/Architecture-Monorepo-8b5cf6?style=for-the-badge&logoColor=white) ![Backend: FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white) ![Frontend: Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) 

## 🏗️ Architecture

This project is structured as a **Monorepo** containing two distinct environments that work together seamlessly:

- **Backend (API)**: A robust, typed Python backend located at the root using FastAPI and a lightweight SQLite database (`reminders.db`). It provides strict validation using Pydantic schemas.
- **Frontend (Client)**: A beautiful Single Page Application (SPA) located in the `/frontend` directory, consuming the local API.

## 💻 Tech Stack

### Backend
- **FastAPI**: High-performance API framework.
- **SQLite3**: Serverless database for simple data persistence.
- **Pydantic**: Data validation and strict typing.
- **Uvicorn**: Lightning-fast ASGI server.

### Frontend
- **Next.js (App Router)**: Modern React framework.
- **TypeScript**: Strict typing aligned with backend schemas.
- **Tailwind CSS v4**: Utility-first CSS framework (configured for default Premium Dark Mode).
- **Framer Motion**: Fluid UI layouts and micro-animations.
- **Lucide React**: Modern, consistent iconography.

## 🚀 Como Rodar (How to Run)

Siga os dois passos abaixo em **terminais separados** para rodar a aplicação completa.

### Passo 1: Rodar o Backend API
No diretório raiz do projeto (onde o arquivo `main.py` está localizado):
```bash
# Se você já tiver dependências ou ambiente virtual (opcional)
pip install fastapi uvicorn pydantic

# Inicie o servidor FastAPI localmente na porta 8000
uvicorn main:app --reload
```
A API rodará em `http://127.0.0.1:8000`.

### Passo 2: Rodar o Frontend
Em um novo terminal, navegue até a pasta `frontend` e rode a aplicação:
```bash
cd frontend

# Instale os pacotes npm
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
O Frontend estará acessível no seu navegador em `http://localhost:3000`.
