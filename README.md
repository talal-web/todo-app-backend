### `backend/README.md`

````md
# Todo App — Backend

A scalable REST API for the Todo application built with Node.js, Express, TypeScript, MySQL, Prisma, Better Auth, and tsyringe.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MySQL
- Prisma
- Better Auth
- tsyringe
- Pino
- CORS
- dotenv

## Features

- User authentication
- Better Auth integration
- Session-based authentication
- Todo CRUD operations
- User-specific todos
- Repository pattern
- Service layer
- Dependency injection
- Prisma ORM
- MySQL database
- Centralized API responses
- Centralized error handling
- TypeScript
- Modular architecture

## Architecture

The backend follows a layered architecture inspired by Clean Architecture.

```text
HTTP Layer
    ↓
Controller
    ↓
Application / Service Layer
    ↓
Domain Layer
    ↓
Repository Interface
    ↓
Infrastructure Repository
    ↓
Prisma
    ↓
MySQL
```
````
