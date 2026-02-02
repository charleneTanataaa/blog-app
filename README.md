# MERN Blog App

a full-stack blog application built with MongoDB, Express, React, and Node.js.

## Features
- User authentication (Register/Login)
- Create, Read, Update, Delete Posts
- Comment System
- User authorization

## Tech Stack
**Frontend:** React, Tailwind CSS
**Backend:** Node.js, Express, MongoDB
**Authentication:** JWT

## Setup

### Backend
```bash
cd backend
npm install
# create .env file with DATABASE_URL and JWT_SECRET
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
**Backend (.env):**
```
DATABASE_URL=yout_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3001
```

**FRONTEND (.env):**
```
VITE_API_URL=http://localhost:3001
```
