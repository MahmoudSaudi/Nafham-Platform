# syntax=docker/dockerfile:1

# ===== Base =====
FROM node:22-slim AS base
WORKDIR /app
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# ===== Deps (all deps, including dev) =====
FROM base AS deps
COPY package*.json ./
RUN npm ci
COPY prisma.config.ts ./
COPY prisma ./prisma
RUN npx prisma generate


# ===== Builder (compile + drop dev deps) =====
FROM deps AS builder
COPY tsconfig.json ./
COPY src ./src
RUN npm run build
RUN npm prune --omit=dev

# ===== Migrator (keeps dev deps for prisma CLI + seed) =====
FROM deps AS migrator
COPY tsconfig.json ./
COPY src ./src

# ===== Runtime =====
FROM base AS runner
ENV NODE_ENV=production
RUN groupadd --system --gid 1001 app \
 && useradd --system --uid 1001 --gid app app
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/dist         ./dist
COPY --from=builder --chown=app:app /app/prisma       ./prisma
COPY --from=builder --chown=app:app /app/package.json ./package.json
USER app
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://localhost:5000/health/live').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/server.js"]
