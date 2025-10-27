# Local Development (Without Docker)

This guide is for running the project locally without Docker containers.

## Prerequisites

- Node.js 18 or higher
- MongoDB installed and running locally

## Setup Steps

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
# macOS/Linux
mongod

# Windows - depends on your MongoDB installation
# Check Services or start MongoDB service
```

### 3. Configure Environment

The server is configured to use `mongodb://127.0.0.1:27017/mern_webstore` by default.

For the client to proxy correctly to the server, set the environment variable:

```bash
# In client directory
cd client
export VITE_API_PROXY=http://localhost:5000  # Linux/Mac

# Or on Windows (PowerShell)
$env:VITE_API_PROXY="http://localhost:5000"
```

Or on Windows CMD:
```cmd
set VITE_API_PROXY=http://localhost:5000
```

### 4. Start the Servers

Terminal 1 - Backend Server:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend Client:
```bash
cd client
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Seeding the Database

To populate the database with sample data:

```bash
cd server
npm run seed
```

## Troubleshooting

### Port Already in Use

If port 5000 or 5173 is already in use:

1. Stop the conflicting service, or
2. Change the ports in the configuration files

### MongoDB Connection Error

Make sure MongoDB is running:

```bash
# Check if MongoDB is running
ps aux | grep mongod  # Linux/Mac
```

### Client Can't Reach Server

If the frontend shows network errors:
1. Verify the server is running on port 5000
2. Check `VITE_API_PROXY` environment variable is set
3. Make sure no firewall is blocking the connection

## File Uploads

Uploaded files are stored in `server/public/uploads/products/`. Create this directory if it doesn't exist:

```bash
mkdir -p server/public/uploads/products
```

