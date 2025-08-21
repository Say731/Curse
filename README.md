# Voxel AI

Advanced AI application with voxel rendering, multimedia processing, voice assistant, and comprehensive file handling capabilities.

## Features

### 🎨 Core Capabilities
- **Voxel Engine**: Advanced 3D voxel editor with real-time rendering and animation
- **AI Generation**: Create images, videos, 3D models, and animations using cutting-edge AI
- **File Processing**: Process PDFs, PowerPoints, and documents with intelligent AI analysis
- **Voice Assistant**: Interactive voice commands and text-to-speech powered by advanced AI
- **Multimedia Support**: Handle images, videos, audio files with AI-powered processing

### 🎯 Key Features
- **Dark Mode**: Automatic color-changing background with system preference detection
- **User Authentication**: Secure login and registration system
- **Real-time Communication**: WebSocket-based voice assistant and live updates
- **3D Visualization**: Interactive 3D voxel models with Three.js integration
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **File Upload**: Drag-and-drop file processing with support for 25+ formats

### 🚀 AI Capabilities
- **Image Generation**: Create stunning visuals from text descriptions
- **Video Creation**: Generate videos and animations with AI
- **3D Model Generation**: Create voxel art and 3D objects
- **Audio Processing**: Generate music and sound effects
- **Text Generation**: AI-powered writing and content creation
- **Document Analysis**: Extract insights from PDFs and presentations

## Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **WebSocket**: Real-time communication for voice assistant
- **JWT Authentication**: Secure token-based authentication
- **AI Libraries**: OpenAI Whisper, Transformers, Diffusers
- **3D Processing**: Open3D, Trimesh for 3D model handling
- **File Processing**: PDFPlumber, python-pptx for document processing

### Frontend
- **React 18**: Modern React with hooks and context
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Three.js**: 3D graphics and voxel rendering
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Data fetching and caching
- **Zustand**: Lightweight state management

## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+ and pip
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voxel-ai
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start:
- Backend API server on `http://localhost:8000`
- Frontend development server on `http://localhost:3000`

### Manual Installation

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Usage

### Getting Started
1. Open `http://localhost:3000` in your browser
2. Register a new account or login
3. Explore the different features:
   - **Dashboard**: Overview of your projects and activity
   - **Voxel Editor**: Create and edit 3D voxel models
   - **AI Studio**: Generate content with AI
   - **File Processor**: Upload and analyze files
   - **Voice Assistant**: Chat with AI using voice or text

### Voxel Editor
- Create new 3D models with customizable dimensions
- Paint voxels with different colors
- Real-time 3D preview with orbit controls
- Save and load your creations

### AI Studio
- Generate images from text descriptions
- Create videos and animations
- Generate 3D models and voxel art
- AI-powered text generation
- Audio and music creation

### File Processor
- Drag and drop files to upload
- Support for PDF, PPT, images, videos, audio
- AI-powered analysis and processing
- Extract text and insights from documents

### Voice Assistant
- Voice-to-text recognition
- Text-to-speech responses
- Real-time conversation with AI
- Export chat history

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info

### AI Generation
- `POST /ai/generate` - Generate AI content
- `POST /voxel/create` - Create voxel model

### File Processing
- `POST /upload/file` - Upload and process files

### WebSocket
- `WS /ws/voice` - Voice assistant communication

## Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./voxel_ai.db
OPENAI_API_KEY=your-openai-api-key
```

### Customization
- **Theme**: The app automatically detects system dark/light mode preference
- **Colors**: Customize the color scheme in `tailwind.config.js`
- **API URL**: Update the API base URL in the frontend auth store

## Development

### Project Structure
```
voxel-ai/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application file
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # State management
│   │   └── App.tsx         # Main app component
│   ├── package.json        # Node dependencies
│   └── tailwind.config.js  # Tailwind configuration
└── package.json            # Root package.json for scripts
```

### Available Scripts
- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build frontend for production
- `npm run install:all` - Install all dependencies

### Adding New Features
1. **Backend**: Add new endpoints in `main.py`
2. **Frontend**: Create new pages in `src/pages/`
3. **Components**: Add reusable components in `src/components/`
4. **State**: Manage state with Zustand stores in `src/store/`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments for implementation details

---

**Voxel AI** - The Future of 3D AI Creation 🚀