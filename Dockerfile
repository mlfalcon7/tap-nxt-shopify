FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps || npm install

# Copy application code
COPY . .

# Build the application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Expose port
EXPOSE 3004

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3004
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "start"]
