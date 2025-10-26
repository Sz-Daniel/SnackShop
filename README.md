# SnackShop

A lightweight, beginner-friendly webshop simulation demonstrating core web development concepts, including user authentication, order handling, and basic admin management.

Admin user
Username: admin
Password: SnackBoss2025

## Run Instructions

### Backend

```bash
npm install
node --watch server.js
```

### Frontend

```bash
npm install
npm start
```

---

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

## Documentation Notes

### Development Perspective

- Parallel development and synchronization: Frontend → Backend
- Built an initial functional version, then focused on structure, optimization, and readability — aiming for the quality I would expect from others.
- The main SPA page should be fully functional without admin/user rights
- Refactoring needed on both frontend and backend sides
- The README will be fully extended and rewritten after the first major refactor once the main SPA is functional

---

## Stack

### Backend

- Node.js (planned migration to TypeScript)
- SQLite3
- bcrypt
- @fastify/session
- @fastify/cookie

### Frontend

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

### Backend

- `server.js`
- `db/db.js` with initial database creation and admin seeding
- Basic API routing: `publicRoutes`, `userRoutes`, `adminRoutes`, `authRoutes`, `devRoutes`
- Middleware as Plugin: UniqueID, onResponse OnError logging into db
- Session and cookie handling as Plugin
- CORS configured
- Parallel API refactoring alongside frontend development

### Frontend

- Basic API handling
- Role-component-routing structure
- Layout, role-components
- Single Page Application: main page implemented
- ProductList
- ProductDisplay - Delete - Modify - Add to Cart
- Login - Session handling - Register
- CartContext, Functionality, Cart Page
- Orders Page
- Logs Page

---

## API Details

### auth.js

- `POST /api/register` – Register new user (username, password)
- `POST /api/login` – User login (username, password)
- `GET /api/session` – Session re-validation
- `POST /api/Logout` – Session destroying

### public.js

- `GET /api/products` – snacks listing

### user.js

- `POST /api/order` – Send order

### admin.js

- `POST /api/products` - New Product data upload
- `PUT /api/products/:id` - Product data modification
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders` - All order data
- `GET /api/log` - Backend Logs

### devRoutes.js

- `GET /api/allTable` - Get the whole database
- `GET /api/resetDummyProducts` - Delete all Product and replace the Dummy ones
