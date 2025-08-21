# ✨ ztupid gen

> **An agentic vibe coding app builder with personality** 🚀

ztupid gen is an AI-powered code generation platform that creates code with different personalities and vibes. Choose from various AI agents, each with their own coding style and personality, to generate React components, Express APIs, utility functions, and full-stack applications.

![ztupid gen Demo](https://via.placeholder.com/800x400/0f0f23/39ff14?text=ztupid+gen+✨)

## 🎨 Features

- **🤖 AI Personalities**: Choose from 4 unique coding personalities:
  - **Chill Dev** 😎 - laid-back, clean code with good vibes
  - **Hacker Vibes** 🔥 - edgy, optimized, performance-focused
  - **Wholesome Coder** 🌟 - friendly, educational, beginner-friendly
  - **Chaotic Genius** 🚀 - experimental, creative, unconventional

- **📝 Multiple Templates**:
  - React Components with TypeScript
  - Express.js API endpoints
  - Utility functions
  - Full-stack applications

- **🎯 Smart Code Generation**: AI-powered code that matches the personality's style
- **💫 Modern UI**: Beautiful, responsive interface with animations and effects
- **📱 Code Editor**: Built-in Monaco editor with syntax highlighting
- **📋 Copy & Download**: Easy code sharing and file downloads
- **🎨 Personality-Based Styling**: Each personality generates unique CSS styles

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ztupid-gen.git
   cd ztupid-gen
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

The backend API will be running on `http://localhost:5000`

## 🏗️ Project Structure

```
ztupid-gen/
├── client/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Global styles
│   └── package.json
├── server/                 # Express.js backend
│   ├── index.js           # Main server file
│   └── package.json
├── docker-compose.yml      # Docker configuration
├── Dockerfile             # Container build
└── README.md
```

## 🎭 AI Personalities

### 😎 Chill Dev
- **Vibe**: Laid-back, clean code with good vibes
- **Style**: Minimalist, functional, well-commented
- **Best for**: Clean, maintainable code with modern practices

### 🔥 Hacker Vibes  
- **Vibe**: Edgy, optimized, performance-focused
- **Style**: Aggressive optimization, clever tricks, minimal comments
- **Best for**: High-performance code with advanced techniques

### 🌟 Wholesome Coder
- **Vibe**: Friendly, educational, beginner-friendly  
- **Style**: Well-documented, readable, includes explanations
- **Best for**: Learning projects and collaborative development

### 🚀 Chaotic Genius
- **Vibe**: Experimental, creative, unconventional
- **Style**: Unique patterns, creative solutions, artistic code
- **Best for**: Innovative solutions and creative projects

## 🛠️ API Endpoints

### Get Personalities
```http
GET /api/personalities
```

### Get Templates
```http
GET /api/templates
```

### Generate Code
```http
POST /api/generate
Content-Type: application/json

{
  "template": "react-component",
  "name": "MyComponent", 
  "props": [
    {"name": "title", "type": "string"},
    {"name": "isVisible", "type": "boolean"}
  ],
  "personality": "chill-dev"
}
```

## 🐳 Docker Deployment

### Build and run with Docker
```bash
docker-compose up --build
```

### Production deployment
```bash
docker-compose up -d
```

## ☁️ Cloud Deployment

### Vercel (Recommended for frontend + serverless)
1. Connect your GitHub repository to Vercel
2. Deploy automatically with the included `vercel.json` configuration

### Netlify 
1. Connect your repository to Netlify
2. Use the included `netlify.toml` configuration

### Docker Cloud Platforms
Deploy the Docker container to:
- **Railway**: Connect GitHub repo and deploy
- **Render**: Use Docker deployment option  
- **DigitalOcean App Platform**: Deploy from GitHub
- **Heroku**: Use container registry

## 🎨 Customization

### Adding New Personalities
Edit `server/index.js` and add to the `AGENT_PERSONALITIES` object:

```javascript
'your-personality': {
  name: 'Your Personality',
  vibe: 'your description',
  style: 'coding style description', 
  greeting: 'personality greeting'
}
```

### Adding New Templates
Add to the `CODE_TEMPLATES` object and implement the generation function:

```javascript
'your-template': {
  name: 'Your Template',
  description: 'Template description',
  template: (name, props, personality) => generateYourTemplate(name, props, personality)
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with React, TypeScript, Express.js, and lots of ✨
- UI powered by Tailwind CSS and Framer Motion
- Code editing with Monaco Editor
- Icons by Lucide React

## 🐛 Issues & Support

Found a bug or have a feature request? Please open an issue on GitHub!

---

**Made with 💖 and lots of ☕ by the ztupid gen team**

*Remember: The best code is the code that works and brings joy! ✨*