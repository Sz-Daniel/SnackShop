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

- Code refactoring, file sorting
- UI Refactoring
- Backend auth fixing

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
- Middleware as Plugin: UniqueID, onResponse OnError logging into db
- Session and cookie handling as Plugin
- CORS configured
- Parallel API refactoring alongside frontend development

#### Frontend

- Basic API handling
- Role-component-routing structure
- Layout, role-components
- Single Page Application: main page implemented
- ProductList
- ProductDisplay - Delete - Modif - Add Car
- Login - Session handling - Register
- CartContext, Functionality, Cart Page
- Orders Page
- Logs Page

---

## API Details

#### auth.js

- `POST /api/register` – Register new user (username, password)
- `POST /api/login` – User login (username, password)
- `GET /api/session` – Session re-validitaon
- `POST /api/Logout` – Session destroing

#### public.js

- `GET /api/products` – snacks listing

#### user.js

- `POST /api/order` – Send order

#### admin.js

- `POST /api/products` - New Product data upload
- `PUT /api/products/:id` - Product data modification
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders` - All order data
- `GET /api/log` - Backend Logs

#### devRoutes.js

- `GET /api/allTable` - Get the whole database
- `GET /api/resetDummyProducts` - Delete all Product and replace the Dummy ones
