#!/bin/bash

echo "🚀 Publishing ztupid gen to GitHub..."
echo "===================================="
echo ""

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📁 Adding files to Git..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "🎉 Initial release of ztupid gen - Agentic vibe coding app builder

✨ Features:
- 4 unique AI personalities (Chill Dev, Hacker Vibes, Wholesome Coder, Chaotic Genius)
- React component generation with personality-driven styling
- Express API endpoint generation
- Utility function creation
- Full-stack app templates
- Modern UI with animations and code editor
- Copy/download functionality
- Multiple deployment options

🚀 Ready to deploy to Railway, Render, Vercel, Netlify, or Docker!

💫 Built with React, TypeScript, Express.js, Tailwind CSS, and lots of personality!"

echo ""
echo "🎯 Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Copy the remote URL (https://github.com/yourusername/ztupid-gen.git)"
echo "3. Run: git remote add origin YOUR_GITHUB_URL"
echo "4. Run: git push -u origin main"
echo ""
echo "🌟 Then deploy to your favorite platform!"
echo "💫 Railway: https://railway.app (recommended)"
echo "🎨 Render: https://render.com" 
echo "⚡ Vercel: https://vercel.com"
echo "🌍 Netlify: https://netlify.com"
echo ""
echo "✨ Your ztupid gen is ready to change the world! 🌍"