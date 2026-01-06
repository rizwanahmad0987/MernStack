# Docker Quick Start Guide

## 🚀 Quick Commands

### Production Build & Run
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development (Hot Reload)
```bash
# Start with hot reload
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop
docker-compose -f docker-compose.dev.yml down
```

## 📦 Services

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| Client | 3000 | http://localhost:3000 | Frontend (Production) |
| Client | 5173 | http://localhost:5173 | Frontend (Development) |
| Server | 5000 | http://localhost:5000 | Backend API |
| MongoDB | 27017 | localhost:27017 | Database |

## 🛠️ Common Tasks

### Seed Database
```bash
# Production
docker-compose exec server npm run seed

# Development
docker-compose -f docker-compose.dev.yml exec server npm run seed
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f mongodb
```

### Rebuild After Changes
```bash
# Production
docker-compose up -d --build

# Development
docker-compose -f docker-compose.dev.yml up -d --build
```

### Access Container Shell
```bash
# Server container
docker-compose exec server sh

# Client container
docker-compose exec client sh

# MongoDB shell
docker-compose exec mongodb mongosh
```

### Clean Everything
```bash
# Stop and remove containers
docker-compose down

# Remove volumes (⚠️ deletes database data)
docker-compose down -v

# Complete cleanup
docker system prune -a
```

### Check Status
```bash
docker-compose ps
```

## 🔧 Environment Variables

Default configuration (no .env file needed for basic setup):
- MongoDB: `mongodb://mongodb:27017/mern_webstore`
- Server Port: `5000`
- Client Port: `80` (production) or `5173` (development)

## 📝 Default Admin Account

After seeding the database:
- Email: `admin@example.com`
- Password: `admin123`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
# Windows
netstat -ano | findstr :5000

# Linux/Mac
lsof -i :5000
```

### Container Won't Start
```bash
# Check logs
docker-compose logs

# Restart specific service
docker-compose restart server
```

### Database Issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Access MongoDB directly
docker-compose exec mongodb mongosh
```

### Images Not Updating
```bash
# Force rebuild without cache
docker-compose build --no-cache

# Or rebuild and restart
docker-compose up -d --build --force-recreate
```

## 🎯 Development Workflow

1. **Start development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Make code changes:**
   - Client: Edit files in `client/src/`
   - Server: Edit files in `server/src/`
   - Changes auto-reload (hot reload enabled)

3. **View changes:**
   - Open http://localhost:5173

4. **Check logs if issues:**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f
   ```

## 📦 Production Deployment

1. **Build for production:**
   ```bash
   docker-compose build
   ```

2. **Run production:**
   ```bash
   docker-compose up -d
   ```

3. **Access application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

4. **Set environment variables** in production:
   - Create `.env` file or use Docker secrets
   - Configure JWT_SECRET
   - Set NODE_ENV=production
   - Configure MongoDB connection

## 📂 Project Structure

```
mern-webstore/
├── client/              # React frontend
│   ├── Dockerfile       # Production build
│   ├── Dockerfile.dev   # Development with hot reload
│   ├── nginx.conf       # Nginx config for production
│   └── src/           # React source code
│
├── server/              # Express backend
│   ├── Dockerfile       # Production server
│   ├── Dockerfile.dev   # Development with watch mode
│   └── src/            # Server source code
│
├── docker-compose.yml           # Production setup
└── docker-compose.dev.yml       # Development setup
```

## 🎓 Next Steps

- Read [README.Docker.md](README.Docker.md) for detailed documentation
- Read [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) for non-Docker setup
- Customize environment variables for your needs
- Set up proper secrets management for production
- Configure HTTPS with reverse proxy (nginx/traefik)

