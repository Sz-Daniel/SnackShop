# Copilot Instructions for SnackShop

## Project Overview
- **Monorepo** with `backend/` (Node.js, Fastify, SQLite3) and `frontend/` (React + TypeScript, MUI)
- **Parallel development**: Frontend and backend are developed and refactored together for rapid iteration
- **Goal**: Main SPA page is fully functional for all users; admin/user features are layered on top

## Architecture & Data Flow
- **Backend**
  - Entrypoint: `backend/server.js`
  - Database: `backend/db/db.js` (SQLite3, seeded with admin)
  - API routes: `backend/routes/` (`public.js`, `user.js`, `admin.js`, `auth.js`, `dev.js`)
  - Middleware: `backend/middleware/` (e.g., `isAuthenticated`, `isAdmin`)
  - Plugins: `backend/plugins/session.js` (session/cookie handling)
  - CORS enabled for frontend-backend communication
- **Frontend**
  - Entrypoint: `frontend/src/index.tsx`, main app: `frontend/src/App.tsx`
  - Routing: `frontend/src/routes/Routes.tsx`
  - API: `frontend/src/api/apiClient.ts`, `apiHooks.ts`, `check.ts`
  - Pages: `frontend/src/pages/`
  - Types: `frontend/src/type/type.ts`

## Developer Workflows
- **Backend**: `cd backend && node --watch server.js`
- **Frontend**: `cd frontend && npm start`
- **Database**: Schema in `backend/db/schema.sql`; seeded via `db.js`
- **No formal test suite yet**; manual testing via frontend and API endpoints

## API Conventions
- All API endpoints are prefixed with `/api/`
- Auth: `POST /api/register`, `POST /api/login`
- Products: `GET /api/products`, `PUT/DELETE /api/products/:id` (admin)
- Dev/test endpoints: `/api/allTable`, `/api/resetDummyProducts`, `/api/dummy*`
- See `backend/routes/` for full details

## Project-Specific Patterns
- **Session/cookie**: Managed via Fastify plugins (`@fastify/session`, `@fastify/cookie`)
- **Frontend API**: Use `apiClient.ts` and `apiHooks.ts` for all HTTP requests
- **Component structure**: Pages in `pages/`, layout in `Layout.tsx`, shared UI in `Header.tsx`/`Footer.tsx`
- **TypeScript**: Frontend is fully typed; backend migration to TS is planned
- **Styling**: MUI + Emotion

## Integration Points
- **Frontend-backend**: Communicate via REST API, CORS enabled
- **Session**: Auth/session state is shared via cookies

## Examples
- To add a new API route: create a file in `backend/routes/`, register it in `server.js`
- To add a new page: create a component in `frontend/src/pages/`, add route in `Routes.tsx`

## References
- See `README.md` for stack, roadmap, and API details
- Key files: `backend/server.js`, `backend/db/db.js`, `frontend/src/App.tsx`, `frontend/src/routes/Routes.tsx`, `frontend/src/api/apiClient.ts`
