# PayConductor SDK Demo Monorepo

Monorepo de exemplo para checkout com PayConductor, contendo:

- Uma API local em Express para simular carrinho e criar pedidos.
- Uma aplicação web em React para o fluxo de checkout em múltiplas etapas.
- Pacotes compartilhados de UI, ESLint e TypeScript.

## Stack

- Runtime e gerenciador de pacotes: Bun
- Monorepo e pipeline: Turborepo
- Frontend: React 18, Vite 5, Tailwind CSS 4, Axios, `@payconductor/react`
- Backend: Node/Bun, Express 5, CORS, Axios
- Qualidade de código: TypeScript (strict), ESLint, Prettier

## Arquitetura

```text
.
|- apps/
|  |- api/                     # API local (mock de carrinho + criação de pedido)
|  |  |- src/
|  |     |- index.ts           # bootstrap do Express e rotas /api/cart, /api/order/create
|  |     |- api.ts             # cliente Axios para PayConductor
|  |     |- env.ts             # variáveis de ambiente da API
|  |     |- db.ts              # base de dados em memória (produtos e frete)
|  |
|  |- web/                     # checkout em React
|     |- src/
|        |- main.tsx           # entrada da aplicação
|        |- modules/
|        |  |- api.ts          # cliente API local + contratos TypeScript
|        |  |- env.ts          # variáveis de ambiente do frontend
|        |- pages/checkout/    # fluxo por etapas (dados, endereço, pagamento)
|
|- packages/
|  |- ui/                      # design system compartilhado (Button, Input, Card, etc.)
|  |- eslint-config/           # configuração ESLint compartilhada
|  |- typescript-config/       # presets tsconfig compartilhados
|
|- turbo.json                  # pipeline de build/dev/lint do monorepo
```

## Fluxo de execução

O frontend chama `/api/*` e o Vite faz proxy para a API local:

- Web: `http://localhost:5183`
- API: `http://localhost:5184`
- Proxy Vite: `/api -> http://localhost:5184`

No checkout:

1. A página carrega o carrinho em `/api/cart`.
2. O usuário preenche dados pessoais e endereço.
3. A aplicação cria pedido em `/api/order/create`.
4. A API encaminha para PayConductor em `/orders`.
5. O frontend confirma o pagamento via `@payconductor/react`.

## Pré-requisitos

- Bun `>= 1.3`

## Instalação

```bash
bun install
```

## Variáveis de ambiente

### API (`apps/api`)

Defina no ambiente (ou em um `.env` carregado pelo runtime):

```bash
PAYCONDUCTOR_PUBLIC_KEY=your_public_key
PAYCONDUCTOR_SECRET_KEY=your_secret_key
NODE_ENV=production
```

Valores aceitos em `NODE_ENV`:

- `production`: usa `https://app.payconductor.ai/api/v1`
- `local`: usa `http://localhost:3000/api/v1`

### Web (`apps/web`)

```bash
VITE_PAYCONDUCTOR_PUBLIC_KEY=your_public_key
```

## Como rodar

Em desenvolvimento (apps em paralelo via Turborepo):

```bash
bun run dev
```

Comandos úteis:

```bash
bun run build
bun run lint
bun run format
```

Execução isolada por app:

```bash
# API
cd apps/api
bun run dev

# Web
cd ../web
bun run dev
```

## Padrões de código do projeto

Esta base já segue algumas convenções importantes. Mantenha essas regras em novas implementações.

### 1) TypeScript e contratos explícitos

- Tipagem estrita habilitada (`strict: true`) nos presets compartilhados.
- Contratos de API declarados com tipos dedicados (ex.: `TApiCartResponse`, `TApiCreateOrderRequest`).
- Prefira tipar entrada/saída de funções públicas e módulos de integração.

### 2) Organização por responsabilidade

- `apps/web/src/modules/*`: integrações, clientes HTTP e camada de acesso a dados.
- `apps/web/src/pages/*`: composição de telas e fluxo de UI.
- `packages/ui/src/components/*`: componentes reutilizáveis e agnósticos de domínio.
- `apps/api/src/*`: rotas, integração externa e dados mockados.

### 3) Padrão de nomenclatura

- Componentes React: `PascalCase` (`CheckoutPage`, `PaymentForm`).
- Funções e variáveis: `camelCase` (`createOrder`, `handleFinalize`).
- Tipos e interfaces: `PascalCase` e, quando necessário, prefixo de contexto (`TApi...`).
- Arquivos de componentes: `kebab-case.tsx`.

### 4) Imports e dependências

- Primeiro imports de bibliotecas externas, depois internos.
- Reutilize componentes e estilos via `@repo/ui` antes de criar duplicações no app web.
- Centralize chamadas HTTP em módulos (`apps/web/src/modules/api.ts`, `apps/api/src/api.ts`).

### 5) Estilo e qualidade

- Lint centralizado em `@repo/eslint-config`.
- Formatação com Prettier no monorepo.
- Evite `any`; quando inevitável, isole e normalize os dados rapidamente.

## Scripts do monorepo

Scripts na raiz:

- `bun run dev`: executa `turbo run dev`
- `bun run build`: executa `turbo run build`
- `bun run lint`: executa `turbo run lint`
- `bun run format`: formata `ts`, `tsx` e `md` com Prettier

Pipeline do Turbo (`turbo.json`):

- `build` depende de `^build` e gera artefatos em `dist/**`
- `dev` é persistente e sem cache
- `lint` executa em todos os workspaces com script compatível

## Observações

- O `db.ts` da API é apenas uma base em memória para desenvolvimento.
- As chaves de produção devem ser protegidas e nunca versionadas no repositório.
