#!/bin/bash

echo "🐳 Building Brighton Spaces Docker image..."

# Build the Docker image
docker build -t brighton-spaces:latest .

echo "✅ Build complete!"
echo ""
echo "To run the container:"
echo "  docker run -p 5000:5000 --env-file .env.local brighton-spaces:latest"
echo ""
echo "Or use docker-compose:"
echo "  docker-compose up"