# MERN Webstore

## 🚀 Quick Start

1. **Install Dependencies** (First time only):
   ```bash
   npm run install:all
   ```

2. **Run Everything** (One Command):
   ```bash
   npm run dev
   ```
   *This starts the Database (Docker), Server, and Client concurrently.*

## 🔑 Admin Credentials

- **Email:** `admin@example.com`
- **Password:** `admin123`

## ☁️ Vercel Deployment Instructions

To deploy this project on Vercel, you **must** set the following Environment Variables in your Vercel Project Settings:

1. **MONGO_URI**
   - Value: `mongodb+srv://mernstack_db_user:Rizwan%40112233@mernstack.efhloa0.mongodb.net/mern_webstore?retryWrites=true&w=majority`
   - *Note: This connects to your MongoDB Atlas database.*

2. **JWT_SECRET**
   - Value: (Generate a strong secret or use the one from your local .env)
   - Example: `3f9a7e2c1b4e8a9d6c2f7b1e4d9a0f8c1a2b3c4d5e6f7a8b9c0d1e2f3a4b`

3. **ENABLE_DEV_SEED**
   - Value: `true`
   - *This ensures the admin user is created automatically.*

## 🛠️ Requirements

- **Docker Desktop** (must be running)
- **Node.js**

## 🛑 Stop Database

To stop the background database container:
```bash
npm run db:stop
```
