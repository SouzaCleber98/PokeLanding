# Frontend - PokeLanding

Aplicacao web em Next.js com landing page, autenticacao e pokedex baseada na PokeAPI.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- React Hook Form + Zod

## Pre-requisitos

- Node.js 20+
- npm 10+

## Instalacao

```bash
cd frontend
npm install
```

## Execucao

Ambiente de desenvolvimento:

```bash
npm run dev
```

Build de producao:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

Aplicacao disponivel em: http://localhost:3000

## Integracoes

- PokeAPI: consumo direto em `src/lib/api/poke-api/api.ts`
- Backend local: autenticacao e usuario em `http://localhost:4000`

## Fluxo de Autenticacao

- Login (`/sign-in`): envia `POST /sessions`
- Cadastro (`/sign-up`): envia `POST /users`
- Sessao ativa:
  - token salvo em `localStorage` na chave `pokeLanding:auth`
  - validacao de usuario em `GET /users/me`

## Estrutura Principal

```text
src/
	app/
		(auth)/         # rotas de login e cadastro
		(root)/         # landing e pokedex
		pokedex/[id]/   # detalhe de pokemon
	components/       # componentes reutilizaveis
	context/          # auth-context e pokemon-data-context
	lib/api/poke-api/ # cliente da PokeAPI
	services/         # regras auxiliares para dados Pokemon
```

## Observacoes

- O frontend espera o backend em `http://localhost:4000` em diferentes pontos do codigo.
- Se alterar a porta do backend, atualize as URLs de fetch usadas no contexto e paginas de autenticacao.
