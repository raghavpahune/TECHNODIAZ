# Multi-stage Dockerfile for TECHNODIAZ 2K26 Full Stack Platform
FROM node:20-alpine AS builder

WORKDIR /app

# Copy client and build frontend assets
COPY client/package*.json ./client/
RUN cd client && npm install

COPY client/ ./client/
RUN cd client && npm run build

# Production Runner stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Copy server package & install production dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

# Copy server files and compiled client dist
COPY server/ ./server/
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 5000

CMD ["node", "server/server.js"]
