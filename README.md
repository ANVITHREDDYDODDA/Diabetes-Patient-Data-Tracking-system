# Diabetes Patient Data Tracking System

Full-stack web app for managing patient health data, appointments, and doctor feedback – built with **React, Node.js, MongoDB, and Stripe**.

## Why this project matters

I built this as a production-style app where a single system supports:
- Multiple roles (patients, doctors, staff)
- **Booking-style flows** (appointments, follow-ups)
- Payments (via Stripe)

It’s a good proxy for how I’d approach:
- Matching people to the right “service” (doctors ↔ patients, like hosts ↔ venues)
- Building flows that are fast and easy to use
- Owning the stack end-to-end, from database to UI

## Tech Stack
- Frontend: React, Tailwind, React Router
- Backend: Node.js, Express.js
- Database: MongoDB (MongoDB Atlas)
- Payments: Stripe (test mode)
- Auth: JWT-based authentication

## Key Features
- User registration & login
- Daily health tracking (glucose, insulin, etc.)
- Appointment creation & management
- Doctor feedback & reviews
- Secure payment for consultations via Stripe
