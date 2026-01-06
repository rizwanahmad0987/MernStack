# Server Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server source code
COPY src ./src

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]

