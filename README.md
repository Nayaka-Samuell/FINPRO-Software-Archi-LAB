# Jomoro Koffee

A complete full-stack web application with a microservices backend (NestJS) and a React + TypeScript frontend.

## Setup Instructions

1. **Database Setup**
   - Ensure you have MySQL running.
   - Import `database.sql` into MySQL via phpMyAdmin (paste SQL and click Go) or your preferred MySQL client.
   - The database name is `jomoro_koffee`.
   - Ensure the database user has access. Default configuration in `.env` assumes typical local setups (modify Prisma DATABASE_URL as needed if your password is not empty).

2. **Backend Services Setup**
   - Open three separate terminals for the microservices.
   - In `auth-service` folder run: `npm install` then `npx prisma generate` then `npm run start:dev` (runs on port 3001).
   - In `product-service` folder run: `npm install` then `npx prisma generate` then `npm run start:dev` (runs on port 3002).
   - In `transaction-service` folder run: `npm install` then `npx prisma generate` then `npm run start:dev` (runs on port 3003).
   - All 3 backend services must be running simultaneously.
   - Swagger available at `/api` on each service port.

3. **Frontend Setup**
   - Open a fourth terminal for the frontend.
   - In `frontend` folder run: `npm install` then `npm run dev`.
   - Open http://localhost:5173 in browser.

## Default Credentials

- Admin Email: `admin@jomoro.com`
- Admin Password: `Admin12345`
