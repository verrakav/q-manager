# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy source code and build locally
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine AS runner
WORKDIR /app

# ✅ Copy pre-built app (no build needed at runtime)
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/public ./public

# ✅ Pass NODE_ENV to production
ENV NODE_ENV="production"

# ✅ Expose port and start
EXPOSE 8080

CMD ["node", "server.js"]

