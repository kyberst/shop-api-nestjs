# Backend System - Clean Architecture & CQRS

This project follows the principles of **Clean Architecture** and **CQRS (Command Query Responsibility Segregation)** to ensure a scalable, maintainable, and highly decoupled system.

## 🏗️ Architecture Layers

### 1. Domain Layer (`src/domain`)
The core of the application, independent of any external framework or database.
- **Entities**: Business objects with identity and internal consistency rules (e.g., `product.entity.ts`).
- **Value Objects**: Objects defined by their attributes (e.g., `email.vo.ts`).
- **Repository Interfaces**: Abstract definitions of data access methods.
- **Exceptions**: Domain-specific errors.

### 2. Application Layer (`src/application`)
Coordinates the flow of data and implements use cases.
- **Commands**: Requests to change system state (e.g., `CreateProductCommand`).
- **Queries**: Requests to retrieve data (e.g., `GetProductQuery`).
- **Handlers**: The "Brain" of each use case, executing the logic.
- **Constants**: Shared result codes and business-level constants.

### 3. Infrastructure Layer (`src/infrastructure`)
External tools, database implementations, and adapters.
- **Persistence**: 
  - **Prisma**: Source of truth (Write Models) for PostgreSQL.
  - **Mongoose**: Read Models optimized for performance in MongoDB.
- **Messaging**: Kafka implementation for event-driven architecture.
- **Repositories**: Concrete implementations of domain interfaces.
- **DI (Dependency Injection)**: Orchestrated in `inyeccion-dependency.ts`.

### 4. API Layer (`src/api`)
NestJS Controllers that handle HTTP transport and delegate to the Application Layer via the Command/Query bus.

## 📐 Core Principles

- **150-Line Rule**: Strictly enforced. No file (logic, config, or styles) exceeds 150 lines. Large modules are fragmented into atomic units.
- **Atomic Decoupling**: Every handler, command, and entity resides in its own file.
- **Result Pattern**: We use a `Result<T, E>` pattern for error handling instead of throwing exceptions across layers.
- **Source of Truth vs. Read Models**: Writes go to Prisma (PostgreSQL), and synchronization events propagate changes to Mongoose (MongoDB) for fast reads.

## 🚀 Folder Structure
```
src/
├── api/                # Controllers & HTTP Logic
├── application/        # Commands, Queries, Handlers
├── domain/             # Entities, Interfaces, Business Logic
├── infrastructure/     # Database, Messaging, External Adapters
└── shared/             # Common Utilities & Types
```
