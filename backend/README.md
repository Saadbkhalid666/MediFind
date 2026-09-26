# MediFind Backend

This is the backend for the MEAN stack application.

## Tech stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs
- dotenv
- CORS
- Helmet
- Morgan
- Cookie-parser
- Express-rate-limit
- Nodemon

## Setup

1. Install dependencies:
   npm install
2. Copy the env file:
   cp .env.example .env
3. Update values in .env as needed.
4. Start the app in development mode:
   npm run dev
5. Start the production server:
   npm start

## API routes

- GET /api/health
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

## Notes

- The app uses JWT-based auth.
- Protected routes require a valid Bearer token or cookie token.
- Mongo connection uses a fallback in-memory MongoDB when no local MongoDB instance is running.
