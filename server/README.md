# Server (Node/Express)

## Prerequisites
- MongoDB running locally (default port 27017)

## Setup
1. Create `.env` or use defaults:
```
MONGO_URI=mongodb://127.0.0.1:27017/mern_webstore
PORT=5000
JWT_SECRET=dev_secret_change_me
```
2. Install deps:
```
npm install
```
3. Seed data (admin + sample products):
```
npm run seed
```
4. Start API:
```
npm run dev
```

Health check: GET http://localhost:5000/api/health

Admin login (after seed): `admin@example.com` / `admin123`
