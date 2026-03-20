Aplicação de lembretes focada em produtividade, composta por um backend em Python e uma interface web moderna com estética dark.

Interface	Tecnologia	Descrição
Backend	FastAPI + SQLite	API REST com validação Pydantic e persistência local
Frontend	Next.js + Tailwind	Interface SPA com foco em performance e animações fluidas
Estrutura do Monorepo
Bash
stay-on-track/
├── app/                # Backend (API)
│   ├── main.py         # Ponto de entrada da aplicação
│   ├── schemas.py      # Definições de tipos e validação
│   └── reminders.db    # Base de dados SQLite
├── frontend/           # Interface (Client)
│   ├── app/            # Estrutura de rotas Next.js
│   └── components/     # Componentes de interface
└── README.md
Como Operar
1. Servidor Backend

Execute a partir da raiz do projeto:

Bash
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
Acesse a documentação da API em: http://127.0.0.1:8000/docs

2. Interface Frontend

Navegue até a pasta do cliente para iniciar o ambiente de desenvolvimento:

Bash
cd frontend
npm install
npm run dev
Acesse em: http://localhost:3000
