# SnackShop

### Run Instructions

#### Backend

```bash
node --watch server.js
```

#### Frontend

```bash
npm start
```

---

## Next

- Logging
- Cart

## Roadmap

- Basic backend setup
- Basic frontend setup
- CORS implementation
- Frontend SPA with full functionality and parallel API development
- Login / Registration page
- Order page
- Separation of layouts: public / user / admin
- Full frontend refactor with MUI

---

### Documentation Notes

#### Development Perspective

- Parallel development and synchronization: Frontend → Backend
- Initial goal: make it 'somehow' work → then structure and optimize → make it as readable and usable as possible. Let it be the kind I would like to receive from someone else.
- The main SPA page should be fully functional without admin/user rights
- Refactoring needed on both frontend and backend sides
- The README will be fully extended and rewritten after the first major refactor once the main SPA is functional

---

### Stack

#### Backend

- JavaScript (planned migration to TypeScript)
- SQLite3
- bcrypt
- @fastify/session
- @fastify/cookie

#### Frontend

- create-react-app with TypeScript template
- @mui/material
- @emotion/react
- @emotion/styled
- axios
- lodash
- axios-retry
- zod

---

## Completed

#### Backend

- `server.js`
- `db/db.js` with initial database creation and admin seeding
- Basic API routing: `publicRoutes`, `userRoutes`, `adminRoutes`, `authRoutes`, `devRoutes`
- Middleware: `isAuthenticated`, `isAdmin`
- Session and cookie handling
- CORS configured
- Parallel API refactoring alongside frontend development

#### Frontend

- Basic API handling
- Routing structure
- Layout setup
- Single Page Application: main page implemented
- ProductList
- ProductDisplay - Delete - Modif

---

## API Details

#### auth.js

- `POST /api/register` – Register new user (username, password)
- `POST /api/login` – User login (username, password)

#### public.js

- `GET /api/products` – snacks listing

#### admin.js

- `PUT /api/products/:id` - Product data modification
- `DELETE /api/products/:id` - Delete product

#### devRoutes.js

- `GET /api/allTable` - Get the whole database
- `GET /api/resetDummyProducts` - Delete all Product and replace the Dummy ones
- `POST /api/dummyPost/:id`, `DELETE /api/dummyDelete/:id`, `PUT /api/dummyPut/:id` -
  Testing the Methods inputs
