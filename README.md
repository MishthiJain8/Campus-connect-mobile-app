# Campus Connect

Campus Connect is a production-ready mobile + backend monorepo built for Apple-style iOS engineering showcases.

## Architecture

- `apps/mobile` — `React Native + Expo` mobile client in TypeScript
- `apps/api` — `Node.js + Express` REST API in TypeScript
- `packages/shared` — shared type definitions for mobile/backend contract safety
- `Dockerfile.backend` / `Dockerfile.mobile` — container definitions for infrastructure demos
- `vercel.json` — Vercel config for fast frontend + backend deployment

## Key features

- Apple-inspired mobile UI with polished navigation, dark mode, accessibility, and animations
- JWT auth and refresh tokens
- PostgreSQL database with Prisma ORM
- REST APIs for campuses, events, profiles, messaging, notifications, bookmarks, and admin controls
- Secure middleware, request validation, structured error handling, logging, and CORS
- Production readiness with Docker, environment config, README guidance, and deployment setup

## Local setup

1. Install dependencies

```bash
npm install
```

2. Configure environment files

```bash
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env
```

3. Start backend and mobile client

```bash
npm run dev
```

4. Run Prisma migrations

```bash
cd apps/api
npx prisma migrate dev --name init
```

## Deployment

- Mobile client deploys to Vercel as an Expo web entrypoint / static preview
- Backend deploys to Vercel using serverless functions
- Dockerfiles support production container builds for API and mobile preview

## Resume highlights

- Designed a full-stack TypeScript Campus Connect portfolio project with mobile app, backend API, and shared contract types
- Implemented secure JWT auth, scalable REST patterns, PostgreSQL schema modeling, and Prisma data access
- Delivered Apple-quality UI patterns, feature-rich screens, dark mode, motion, and accessible navigation
- Built deployment-ready Docker and Vercel configuration for fast hosting and modern DevOps
# Campus-connect-mobile-app
