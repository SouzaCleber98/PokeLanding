# Backend - PokeLanding

API REST responsavel por autenticacao, usuarios e recebimento de contatos.

## Stack

- Node.js
- Express
- Sequelize
- SQLite
- JWT

## Pre-requisitos

- Node.js 20+
- npm 10+

## Instalacao

```bash
cd backend
npm install
```

## Variaveis de Ambiente

Crie o arquivo `.env` a partir de `.env.example`.

Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Preencha com valores validos:

```env
PORT=4000
JWT_SECRET=your_secret
DATABASE_PATH=./src/database/database.sqlite
```

## Banco de Dados

O projeto usa migrations do Sequelize CLI.

Rodar migrations:

```bash
npx sequelize-cli db:migrate
```

Desfazer ultima migration:

```bash
npx sequelize-cli db:migrate:undo
```

## Execucao

Desenvolvimento:

```bash
npm run dev
```

Producao:

```bash
npm start
```

Servidor padrao: http://localhost:4000

## Rotas da API

### Publicas

- `POST /sessions`
  - descricao: autentica usuario e retorna token JWT
  - body:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

- `POST /users`
  - descricao: cria novo usuario
  - body:

```json
{
  "username": "ash",
  "email": "ash@example.com",
  "password": "123456"
}
```

- `POST /contacts`
  - descricao: registra mensagem de contato
  - body:

```json
{
  "username": "ash",
  "email": "ash@example.com",
  "body": "Mensagem"
}
```

### Protegidas (Bearer Token)

- `GET /users/me`
  - descricao: retorna dados do usuario autenticado

- `PUT /users/:id`
  - descricao: atualiza usuario e retorna novo token

- `DELETE /users/:id`
  - descricao: remove usuario

Header esperado:

```http
Authorization: Bearer <token>
```

## Estrutura Principal

```text
src/
  app.js
  server.js
  config/
    database.cjs
  controllers/
    UsersController.js
    SessionsController.js
    ContactsController.js
  database/
    index.js
    migrations/
  middlewares/
    auth.js
    checkId.js
    cors.js
  models/
    User.js
    Contact.js
```

## CORS

CORS liberado para origem:

- `http://localhost:3000`

Se o frontend rodar em outra origem, atualize `src/middlewares/cors.js`.
