# Docker Setup for MERN Webstore

This project can be run using Docker with two modes: **Production** and **Development**.

## Prerequisites

- Docker and Docker Compose installed on your system

## Quick Start

### Production Mode

Build and run all services in production mode:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend server on port 5000
- Frontend on port 3000

Access the application at: http://localhost:3000

### Development Mode

Run with hot-reload for development:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This will start:
- MongoDB on port 27017
- Backend server with hot-reload on port 5000
- Frontend Vite dev server on port 5173

Access the application at: http://localhost:5173

## Useful Commands

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
docker-compose logs -f client
```

### Stop services
```bash
docker-compose down
```

### Rebuild images
```bash
# Production
docker-compose build --no-cache

# Development
docker-compose -f docker-compose.dev.yml build --no-cache
```

### Seed database
```bash
docker-compose exec server npm run seed
```

### Access MongoDB shell
```bash
docker-compose exec mongodb mongosh
```

### Check running containers
```bash
docker-compose ps
```

## Environment Variables

Create a `.env` file in the root directory for custom configuration:

```env
# Database
MONGO_URI=mongodb://mongodb:27017/mern_webstore

# Server
PORT=5000
NODE_ENV=production

# JWT Secret (create one for production!)
JWT_SECRET=your-secret-key-here
```

## Volumes

- **mongodb_data**: Persistent storage for MongoDB data
- **uploads**: Server uploads directory (mapped to ./server/public/uploads)

## Network

All services run on the `mern-network` bridge network for internal communication.

## Troubleshooting

### Clear everything and start fresh
```bash
docker-compose down -v  # Remove volumes
docker system prune -a  # Clean up Docker
docker-compose up -d --build
```

### Check container status
```bash
docker-compose ps
```

### View container logs
```bash
docker-compose logs server
docker-compose logs client
docker-compose logs mongodb
```

### Restart a specific service
```bash
docker-compose restart server
```

## Production Deployment

For production deployment:
1. Update environment variables in docker-compose.yml
2. Use secrets management (not env files)
3. Enable HTTPS with reverse proxy
4. Configure backup for MongoDB volumes
5. Set resource limits for containers

## Development Workflow

1. Start development environment: `docker-compose -f docker-compose.dev.yml up -d`
2. Make code changes (hot-reload is enabled)
3. View changes at http://localhost:5173
4. Backend changes auto-reload (watch mode)
5. MongoDB persists data in named volume

