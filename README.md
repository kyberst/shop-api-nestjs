# ⚙️ Backend System - NestJS + Clean Architecture + CQRS + DDD

An enterprise-grade, high-scalability backend REST API built with **NestJS**, **TypeScript**, **CQRS (Command Query Responsibility Segregation)**, and **Domain-Driven Design (DDD)**. 

---

## 🚀 Technical Capabilities & Stack

- **Framework**: NestJS with Express HTTP adapter.
- **Language**: TypeScript (Strict Mode with path mapping `@/*`).
- **Persistence & CQRS Dual-Database**:
  - **Write Model (PostgreSQL / Prisma)**: Relational source of truth for transactional state mutators.
  - **Read Model (MongoDB / Mongoose)**: NoSQL document store optimized for fast read projections.
- **Event Bus & Messaging**: Apache Kafka (`kafkajs`) for asynchronous event streaming and read-model synchronization.
- **Caching & Rate Limiting**: Redis in-memory cache and token bucket rate limiter.
- **AI Engine & Multi-Agent Assistant**:
  - **Google Gemini AI & LangChain**: Multi-turn conversational AI store assistant with tool calling.
  - **Qdrant**: Vector Database for RAG (Retrieval-Augmented Generation) & product embeddings.
- **Observability & Search**: OpenSearch cluster integration for log aggregation and telemetry analytics.
- **Validation Engine**: Ajv JSON Schema validator with custom NestJS pipes.

---

## 🏗️ Architecture Layers

The backend strictly enforces clean layering:

```
src/
├── api/             # HTTP Controllers, Guards, Interceptors, Pipes, Filters
├── application/     # CQRS Commands, Queries, Handlers, Logic Fragments, DTOs
├── domain/          # Entities, Repository Contracts, Domain Events, Services
├── infrastructure/  # Persistence (Prisma/Mongo), Messaging (Kafka), AI (Gemini/Qdrant), Cache (Redis)
└── shared/          # Centralized Errors, Result Pattern, Ajv Schemas, Result Codes
```

### 1. API Layer (`src/api/`)
Entry point for external HTTP traffic.
- **Controllers**: Granular, single-route controllers (`create-product.controller.ts`, `ai-chat.controller.ts`).
- **Guards**: `AuthGuard` (JWT authentication via HTTP-only cookies) and `RolesGuard` / `PermissionsGuard`.
- **Pipes**: `AjvValidationPipe` enforcing JSON schema contracts on request bodies.
- **Interceptors & Filters**: `ApiResponseInterceptor` wrapping all outputs in `ApiResult<T>`, and `HttpExceptionFilter`.

### 2. Application Layer (`src/application/`)
Use case orchestration using CQRS:
- **Commands & Queries**: Immutable message objects carrying invocation payloads.
- **Handlers**: Single-responsibility handlers executing command logic or query fetches.
- **Logic Fragments (`logic/`)**: Atomic, pure functions extracting sub-computations to keep files under 150 lines.
- **DTOs & Mappers**: Formally validated Request DTOs, Response DTOs, and Entity-to-DTO mappers.
- **Mediator**: In-memory dispatcher routing commands and queries to their respective handlers.

### 3. Domain Layer (`src/domain/`)
Pure enterprise domain model, isolated from infrastructure details.
- **Entities**: Rich domain entities (`product.entity.ts`, `user.entity.ts`, `order.entity.ts`, `category.entity.ts`, `role-permission.entity.ts`).
- **Repositories**: Abstract interface contracts (`product.repository.ts`, `user.repository.ts`, `order.repository.ts`).
- **Events**: Enterprise domain events (`permission-granted.event.ts`).

### 4. Infrastructure Layer (`src/infrastructure/`)
Concrete implementations of external boundaries and persistence.
- **Prisma & Mongo Persistence**: Write implementations via Prisma; Read projections via Mongoose schemas.
- **AI & Tools**: `GeminiAiService`, LangChain agent execution engine, and custom AI tools (`products-tool`, `orders-tool`).
- **Messaging & Cache**: Kafka event producer/consumer services and Redis cache provider.
- **Security**: `BcryptHashService` and `JwtTokenService`.

### 5. Shared Kernel (`src/shared/`)
Universal constructs shared across all layers.
- **Result Pattern**: `Result<T, E>` eliminating unhandled exceptions.
- **Result Codes**: Standardized application error and success codes (`RESULT_CODES`).

---

## 🔄 CQRS & Event-Driven Synchronization

```
   [ HTTP Request ]
          │
  ┌───────┴───────┐
  ▼               ▼
[Command]      [Query]
  │               │
  ▼               ▼
[Write Handler] [Read Handler]
  │               │
  ▼               ▼
Prisma (Postgres)  MongoDB (Projections)
  │
  ▼
[Kafka Event] ──► Sync Consumer ──► Update MongoDB
```

---

## 📏 Core Architectural Rules

1. **150-Line Limit**: No file can exceed 150 lines. Complex handlers must extract business rules into `application/use-cases/logic/*`.
2. **Path Aliases**: All imports must use `@/` path aliases. Relative imports (`../../`) are forbidden.
3. **Result Pattern**: Handlers return `Result.success(data)` or `Result.failure(code, message)` rather than throwing errors.
4. **Thin Controllers**: Controllers must only parse requests, invoke the Mediator service, and return standard `ApiResult` envelopes.
5. **JSON Schema Validation**: Every input request DTO must be backed by an Ajv validation schema.

---

## 🛠️ Getting Started & Commands

```bash
# Install dependencies
npm install

# Run database migrations & seeds
npm run prisma:migrate
npm run seed

# Start server in development mode (Port 3000)
npm run start:dev

# Run Linter & Type Check
npm run lint

# Run Unit & Integration Test Suites
npm run test
npm run test:integration
```
