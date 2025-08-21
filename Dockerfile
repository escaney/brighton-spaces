# Production-only Dockerfile for Brighton Spaces React app
FROM node:18-alpine

WORKDIR /app

# Copy package files for dependency caching
COPY package*.json ./

# Install dependencies and serve package
RUN npm ci --only=production=false && npm install -g serve

# Accept build arguments for environment variables
ARG REACT_APP_SUPABASE_URL
ARG REACT_APP_SUPABASE_ANON_KEY

# Set environment variables from build args
ENV REACT_APP_SUPABASE_URL=$REACT_APP_SUPABASE_URL
ENV REACT_APP_SUPABASE_ANON_KEY=$REACT_APP_SUPABASE_ANON_KEY

# Copy source code
COPY . .

# Build the application with environment variables
RUN npm run build

# Railway provides PORT environment variable
# Use Railway's PORT or fallback to 5000
ARG PORT=5000
ENV PORT=${PORT:-5000}

# Expose the port
EXPOSE $PORT

# Serve on 0.0.0.0 (required for Railway) and use PORT variable
CMD ["sh", "-c", "serve -s build -l $PORT"]