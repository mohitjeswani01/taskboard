# taskboard

A small task manager for teams. Log in, filter tasks by status, and keep track
of what's in progress.

## Stack

- **Backend**: Node.js + Express, in-memory data store (no database setup needed)
- **Frontend**: React + Vite

## Getting started

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

The API runs on `http://localhost:4000` by default.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` and proxies `/api` requests to the
backend.

### Logging in

Two seed users are available:

- `amara` / `password123`
- `devon` / `password123`

## Project structure

```
backend/
  src/
    routes/       # Express route handlers
    middleware/   # auth middleware
    services/     # session + task business logic
    data/         # in-memory seed data
frontend/
  src/
    api/          # fetch wrapper for the backend API
    auth/         # client-side session handling
    components/   # UI components
    hooks/        # data-fetching hooks
```

## Roadmap

- Move from in-memory storage to a real database
- Task creation, editing, and comments
- Per-project boards instead of one shared list
