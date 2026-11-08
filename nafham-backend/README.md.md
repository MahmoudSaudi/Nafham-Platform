# Nafham Platform - Backend API Documentation

Welcome to the comprehensive documentation for the Nafham Platform Backend. This document outlines the architectural patterns, folder structure, development workflows, and operational instructions necessary for developing, maintaining, and scaling this Node.js and Express application. 

*Note: This documentation is strictly structural and procedural. It does not contain any sensitive credentials, environment variables, or secret keys to ensure maximum security.*

---

## Project Organization

The backend is built utilizing **Node.js, Express.js, and TypeScript**, with **Prisma ORM** managing database interactions. The architecture follows a strict Model-View-Controller (MVC) pattern adapted for a RESTful API, ensuring high maintainability and clear separation of concerns.

### Architectural Rationale
The primary goal is to isolate routing, business logic, and database operations. By ensuring that routers only handle HTTP definitions and controllers only handle business logic, the application remains highly testable and decoupled.

### Best Practices Enforced
1. **Separation of Concerns:** Routes are completely decoupled from controllers. A route file defines endpoints, while a controller file executes the logic.
2. **Type Safety:** TypeScript is used extensively across all layers to catch errors at compile-time and enforce robust contracts between the API and the database.
3. **Secure Data Access:** Prisma ORM is utilized to prevent SQL injection and provide a strongly-typed schema definition.

---

## File Architecture

Understanding the internal hierarchy is essential for effective contributions.

### Directory Tree Breakdown

* `src/`
  * `routes/`
    Contains Express router definitions. Files here map specific HTTP verbs and URL endpoints to their respective controller functions (e.g., `auth.routes.ts`, `courses.routes.ts`).
  * `controllers/`
    The core of the business logic. Controllers receive the HTTP Request, interact with the database or services, and send the HTTP Response (e.g., `auth.controller.ts`, `support.controller.ts`).
  * `middlewares/`
    Functions that intercept the request/response lifecycle. This includes authentication checks, role-based access control, and file upload interceptors (e.g., `upload.middleware.ts`).
  * `services/`
    Contains complex, reusable business logic or external integrations that do not strictly belong in a controller. Examples include external AI integrations or third-party payment gateways.
  * `utils/`
    Helper functions and centralized configurations. Notably, the singleton instantiation of the Prisma Client is maintained here to prevent connection leaks.
* `prisma/`
  * `schema.prisma`: The single source of truth for the database schema. Defines models, relations, and the database provider.
  * `migrations/`: Contains SQL migration histories tracking structural database changes over time.

---

## Development Workflow

To ensure system stability, developers must adhere to the following workflow when implementing new API endpoints or modifying the database schema.

### 1. Database Modifications (Prisma)
If a feature requires a database change:
- Modify the `prisma/schema.prisma` file.
- Do not modify the database manually. Use Prisma migration commands to apply the changes safely.
- Regenerate the Prisma Client to ensure TypeScript types are updated globally.

### 2. Route and Controller Implementation
- Create or update the controller in `src/controllers/`.
- Ensure all incoming data (body, params, query) is validated before interacting with the database.
- Map the controller to the appropriate endpoint in `src/routes/` and attach any necessary middlewares (e.g., authentication or file handling).

### 3. Security and Integration
- Never hardcode API keys, database URLs, or JWT secrets. Always utilize the central environment variables.
- Ensure that endpoints returning lists of data support proper pagination and filtering to prevent performance bottlenecks.

---

## Running the Project

Follow these instructions to set up the development environment successfully.

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)
- A running PostgreSQL instance (or alternative SQL database as defined in the environment setup).

### Setup Instructions

1. **Install Dependencies:**
   Navigate to the root of the backend project and execute:
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory. You must acquire the development credentials (Database URL, Port, Secret Keys) from the system administrator or your secure vault.
   *Example structural format (Do not use real keys here):*
   ```env
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   ```

3. **Database Initialization:**
   Push the schema to your local database and generate the Prisma client:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The backend API will be available at the configured port (default is usually `http://localhost:5000`).

### Common Troubleshooting

- **Database Connection Refused:**
  Ensure your database server is running and the `DATABASE_URL` is correctly formatted in your `.env` file.
- **Prisma Client Missing Properties:**
  If TypeScript complains that a newly added database field does not exist, you likely forgot to run `npx prisma generate` after updating the schema.
- **Port Already in Use:**
  If the server fails to start, verify that no other service is utilizing the designated port.
