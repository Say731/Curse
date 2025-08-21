#!/bin/bash

echo "🚀 Building ztupid gen for deployment..."

# Build the client
echo "📦 Building React client..."
cd client
npm run build
cd ..

# Copy server files to a deployment directory
echo "🔧 Preparing server files..."
mkdir -p deployment
cp -r server deployment/
cp -r client/build deployment/public
cp package.json deployment/
cp README.md deployment/

# Create a simple server for static hosting
echo "🌐 Creating production server..."
cat > deployment/server.js << 'EOF'
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Import the main server logic
const mainServer = require('./server/index.js');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', mainServer);

// Catch all handler for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 ztupid gen running on port ${PORT}`);
});
EOF

# Create deployment package.json
cat > deployment/package.json << 'EOF'
{
  "name": "ztupid-gen-deployed",
  "version": "1.0.0",
  "description": "ztupid gen - deployed version",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "build": "echo 'Build completed'"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "axios": "^1.6.0",
    "multer": "^1.4.5-lts.1",
    "fs-extra": "^11.1.1",
    "uuid": "^9.0.1"
  },
  "engines": {
    "node": "18.x"
  }
}
EOF

echo "✅ Build complete! Deployment files are in ./deployment/"
echo ""
echo "🎯 Deployment options:"
echo "1. Railway: Connect GitHub repo"
echo "2. Render: Deploy from GitHub" 
echo "3. Heroku: git push heroku main"
echo "4. DigitalOcean: Use App Platform"
echo ""
echo "💫 ztupid gen is ready to deploy! ✨"