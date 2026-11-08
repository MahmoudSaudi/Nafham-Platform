# Nafham Platform

Nafham is a full-stack e-learning (LMS) platform that connects students, instructors, and administrators. It offers structured courses, learning paths, certificates, community discussions, an AI-powered chatbot, and a complete admin/instructor dashboard.

## Project Structure

A monorepo containing two main applications:

| App | Description |
| --- | --- |
| [`nafham/`](./nafham) | Frontend — Next.js (App Router) web application |
| [`nafham-backend/`](./nafham-backend) | Backend — RESTful API server |

## Features

- **Courses & Curriculum** — browse, enroll, and track course progress
- **Learning Paths** — guided multi-course roadmaps
- **Certificates** — generated upon course completion
- **Dashboard** — student progress analytics (charts, reports, PDF/Excel export)
- **Instructor Dashboard** — course management for content creators
- **Admin Panel** — users, financials, marketing, audit logs, platform settings
- **Community** — discussions, blog, and support system
- **AI Chatbot** — integrated AI assistant service
- **Real-time** — live notifications via Socket.IO
- **Auth** — email/password + Google & Facebook OAuth (NextAuth), JWT-secured API

## Tech Stack

### Frontend
- **Next.js** (App Router) + **React 19**
- **TypeScript** + **Tailwind CSS 4**
- **Zustand** (state) + **TanStack React Query** (data fetching)
- **React Hook Form** + **Zod** (validation)
- **Socket.IO Client**, **Recharts**, **Framer Motion**, **jsPDF**, **xlsx**
- **Vitest** (unit) + **Testing Library** + **Playwright** (e2e)

### Backend
- **Node.js** + **Express 5** + **TypeScript** (MVC architecture)
- **Prisma ORM** + **PostgreSQL**
- **Socket.IO** (real-time)
- **JWT** + **bcryptjs** (authentication & security)
- **Cloudinary** + **Multer** + **Sharp** (file uploads & image processing)
- **Zod** (input validation), **Helmet** (security headers)
- **Jest** + **Supertest**

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- PostgreSQL database
- A Cloudinary account (for media uploads)

### 1. Backend Setup

```bash
cd nafham-backend
npm install
```

Create your environment file from the template:

```bash
cp .env.example .env
```

Then fill in all variables inside `.env`:

```env
PORT=5000
CLIENT_URL="http://localhost:3000"

CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

DATABASE_URL="postgresql://user:password@localhost:5432/nafham?schema=public"

AUTH_SECRET="your-auth-secret-here"
AUTH_TRUST_HOST=true

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
```

Apply the database schema and seed it:

```bash
npx prisma migrate dev
npm run seed
```

Run the API server:

```bash
npm run dev
```

The backend will be available at `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd nafham
npm install
cp .env.example .env.local
```

Fill in `.env.local` with the corresponding values (NextAuth secrets and OAuth keys), then start the dev server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Scripts

| Command | Location | Description |
| --- | --- | --- |
| `npm run dev` | both | Start development server |
| `npm run build` | both | Production build |
| `npm start` | both | Start production server |
| `npm run lint` | frontend | Run ESLint |
| `npm test` | both | Run tests (Vitest / Jest) |
| `npm run test:e2e` | frontend | Run Playwright e2e tests |
| `npm run test:coverage` | frontend | Coverage report |
| `npm run seed` | backend | Seed the database |
| `npx prisma migrate dev` | backend | Apply database migrations |

## Architecture

### Backend

Strict MVC pattern with clear separation of concerns:

```
src/
├── routes/        # HTTP endpoint definitions
├── controllers/   # Business logic per domain
├── middlewares/   # Auth, RBAC, uploads
├── services/      # External integrations (AI, etc.)
└── utils/         # Helpers & shared config
prisma/
├── schema.prisma  # Database models (single source of truth)
└── migrations/    # Migration history
```

### Frontend

Feature-Sliced Design (FSD) — code grouped by business domain:

```
src/
├── app/           # Next.js App Router entry points
├── features/      # Domain modules (courses, auth, admin, ...)
├── components/    # Shared UI
├── hooks/         # Reusable React hooks
├── services/      # API clients
├── store/         # Zustand stores
└── types/         # TypeScript types
```

## Contribution Guidelines

1. Backend routes and controllers must stay decoupled (routes only map endpoints).
2. Frontend features must not have circular dependencies — communicate through their public boundaries.
3. Keep data-fetching logic in custom hooks (React Query), keeping components render-focused.
4. Use Zod validation for all external input, on both client and server.
