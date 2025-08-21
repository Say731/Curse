#!/bin/bash

echo "🚀 Setting up Voxel AI..."
echo "=========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.9+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
pip3 install -r requirements.txt
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "  npm run dev"
echo ""
echo "This will start:"
echo "  - Backend API on http://localhost:8000"
echo "  - Frontend app on http://localhost:3000"
echo ""
echo "🎨 Features included:"
echo "  ✅ Voxel 3D Editor with real-time rendering"
echo "  ✅ AI Studio for image, video, audio, 3D generation"
echo "  ✅ File Processor for PDF, PPT, media files"
echo "  ✅ Voice Assistant with speech recognition"
echo "  ✅ Dark mode with automatic theme switching"
echo "  ✅ User authentication and authorization"
echo "  ✅ Responsive design for all devices"
echo ""
echo "🚀 Happy creating with Voxel AI!"