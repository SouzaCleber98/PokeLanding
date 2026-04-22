# PokeLanding

Projeto full stack com foco em experiencia Pokemon, dividido em frontend Next.js e backend Node.js/Express com autenticacao JWT e persistencia em SQLite.

## Visao Geral

- Frontend: Next.js 16 + React 19 + TypeScript
- Backend: Node.js + Express + Sequelize
- Banco de dados: SQLite
- Integracoes:
  - PokeAPI (dados de Pokemon)
  - API interna para autenticacao e usuario

## Estrutura do Repositorio

```text
pokeLanding/
    backend/    # API REST (autenticacao, usuarios e contatos)
    frontend/   # Aplicacao web (landing, pokedex, login e cadastro)
    old-frontend/ # Versao antiga mantida para referencia
```

## Pre-requisitos

- Node.js 20+
- npm 10+

## Como Rodar Localmente

1. Instale as dependencias do backend:

```bash
cd backend
npm install
```

2. Configure as variaveis de ambiente do backend:

Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e preencha:

```env
PORT=4000
JWT_SECRET=your_secret
DATABASE_PATH=./src/database/database.sqlite
```

3. Rode as migrations do banco:

```bash
npx sequelize-cli db:migrate
```

4. Inicie o backend:

```bash
npm run dev
```

5. Em outro terminal, instale e rode o frontend:

```bash
cd ../frontend
npm install
npm run dev
```

6. Acesse:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Documentacao por Modulo

- Backend: veja `backend/README.md`
- Frontend: veja `frontend/README.md`

## Scripts Principais

Backend (`backend/package.json`):

- `npm run dev`: sobe servidor com nodemon
- `npm start`: sobe servidor com node

Frontend (`frontend/package.json`):

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de producao
- `npm run start`: executa build
- `npm run lint`: analise esttica com ESLint
