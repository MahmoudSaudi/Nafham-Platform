# Environment Variables Inventory

## Backend (`nafham-backend/.env`)

| Variable | Sensitive | Used By | Notes |
|---|---|---|---|
| `PORT` | No | Express server | Default `5000` |
| `CLIENT_URL` | No | CORS | Frontend origin |
| `DATABASE_URL` | **Yes** | Prisma | Contains DB password |
| `JWT_SECRET` | **Yes** | Auth | Long random string |
| `ENCRYPTION_SECRET` | **Yes** | AI key encryption | **Exactly 32 chars** |

## Frontend (`nafham/.env.local`)

| Variable | Sensitive | Used By | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | No | Browser | Injected at **build time** |
| `AUTH_SECRET` | **Yes** | NextAuth v5 | Changing it logs out all users |

## Rules

- Never commit real secrets. Only `.env.example` with placeholders goes to Git.
- `ENCRYPTION_SECRET` must be exactly 32 characters.
- `NEXT_PUBLIC_*` values are baked into the build — changing them requires a rebuild.
