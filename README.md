# Portfolio Fullstack - Khevynn Sá

This repository contains a modern fullstack portfolio, featuring a Node.js/Express backend and a React + Vite frontend. It is designed to showcase projects, skills, and experiences, and includes an authenticated admin panel for project management.

## Demo

- **Frontend:** React + Vite, TailwindCSS, React Query, JWT authentication, image upload, admin dashboard.
- **Backend:** Node.js, Express, Sequelize (MySQL), JWT authentication, file upload, RESTful API.

## Project Structure

```
api/         # Node.js/Express backend
frontend/    # React/Vite frontend
```

### Backend (`api/`)

- **Main technologies:** Express, Sequelize, MySQL, JWT, Multer, dotenv, bcrypt.
- **Features:**
  - Project CRUD (with image upload)
  - User authentication (login, register, logout)
  - Authentication and upload middlewares
  - Organized by controllers, services, models, and middlewares

### Frontend (`frontend/`)

- **Main technologies:** React, Vite, TailwindCSS, React Query, React Router, Axios, React Hook Form.
- **Features:**
  - Homepage with introduction, skills, education, projects, and contact
  - Project listing and details
  - Protected admin area for project CRUD
  - User authentication (login, register)
  - Component-based and responsive design

## Getting Started

### Prerequisites

- Node.js (v18+)
- MySQL
- Yarn or npm

### Backend

1. Install dependencies:
   ```sh
   cd api
   npm install
   ```
2. Configure the `.env` file with your database variables.
3. Run the SQL scripts in `db_scripts/create.sql` to create the tables.
4. Start the server:
   ```sh
   npm start
   ```

### Frontend

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start the frontend:
   ```sh
   npm run dev
   ```
3. Access at [http://localhost:5173](http://localhost:5173)

## Useful Scripts

- `node index` (backend): Starts the Express server.
- `npm run dev` (frontend): Starts Vite with hot reload.

## License

This project is licensed under the ISC License.
