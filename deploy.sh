#!/bin/bash

# ztupid gen deployment script
echo "🚀 Deploying ztupid gen..."

# Build client
echo "📦 Building client..."
cd client && npm run build

# Go back to root
cd ..

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t ztupid-gen .

# Tag for production
docker tag ztupid-gen ztupid-gen:latest

echo "✅ Build complete!"
echo ""
echo "🎯 Deployment options:"
echo "1. Local: docker run -p 5000:5000 ztupid-gen"
echo "2. Docker Compose: docker-compose up -d"
echo "3. Push to registry: docker push your-registry/ztupid-gen"
echo ""
echo "🌐 Access your app at: http://localhost:5000"
echo "💫 Happy coding with ztupid gen! ✨"