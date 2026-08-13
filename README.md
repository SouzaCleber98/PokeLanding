# PokeLanding

Aplicação web de Pokémon desenvolvida com Next.js 16, React 19 e TypeScript, com autenticação de usuários, sessões em Redis e integração com a PokeAPI para exibir dados, evoluções e matchups de tipos.

## Visão geral

O projeto tem como foco uma experiência de catálogo e exploração de Pokémon, incluindo:

- página inicial com destaque visual
- listagem e navegação da Pokédex
- detalhes de Pokémon
- evolução e estatísticas
- autenticação de usuários (cadastro e login)
- área do usuário com dados pessoais
- integração com PokeAPI para alimentar o conteúdo

## Stack principal

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Redis
- PokeAPI

## Funcionalidades

- autenticação via server actions e cookies
- sessão do usuário persistida no Redis
- CRUD de usuário com Prisma
- busca e catalogação de Pokémon
- exibição de evoluções e descritivos por tipo
- interface com componentes reutilizáveis e layout responsivo

## Estrutura do projeto

```text
pokeLanding/
├─ prisma/
│  ├─ migrations/
│  ├─ schema.prisma
│  └─ seed.ts
├─ public/
│  └─ images/
├─ src/
│  ├─ actions/
│  ├─ app/
│  ├─ components/
│  ├─ constants/
│  ├─ context/
│  ├─ hooks/
│  ├─ lib/
│  ├─ services/
│  └─ utils/
├─ .eslintrc / eslint.config.mjs
├─ components.json
├─ next.config.ts
├─ package.json
├─ prisma.config.ts
├─ tsconfig.json
└─ README.md
```

## Pré-requisitos

- Node.js 20+
- npm 10+
- PostgreSQL em execução
- Redis em execução

## Configuração do ambiente

Crie um arquivo `.env` na pasta raiz do projeto e preencha com as variáveis do seu ambiente local:

```env
DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
REDIS_URL="redis://localhost:6379"
```

> Ajuste os valores conforme a sua instalação local de PostgreSQL e Redis.

## Como rodar localmente

1. Abra o terminal na pasta do projeto e instale as dependências:

```bash
npm install
```

1. Gere o cliente do Prisma:

```bash
npx prisma generate
```

1. Aplique as migrações no banco de dados:

```bash
npx prisma migrate dev
```

1. Opcionalmente, execute o seed para popular dados iniciais:

```bash
npx prisma db seed
```

1. Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

1. Acesse a aplicação no navegador em:

```text
http://localhost:3000
```

## Scripts disponíveis

No arquivo `package.json` encontram-se os seguintes comandos:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Banco de dados e sessões

- Prisma conecta ao PostgreSQL via `DATABASE_URL`
- sessões de autenticação são armazenadas no Redis via `REDIS_URL`
- o modelo principal de usuário está em `prisma/schema.prisma`

## Observações

- a aplicação usa integração com a PokeAPI para obter informações dos Pokémon e cálculos de fraquezas/resistências
- a autenticação está implementada em server actions do Next.js e utiliza cookies para manter a sessão
