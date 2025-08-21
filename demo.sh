#!/bin/bash

# ztupid gen demo script
echo "✨ ztupid gen Demo - Showcasing AI Personalities ✨"
echo "=================================================="
echo ""

# Check if server is running
echo "🔍 Checking server status..."
if curl -s http://localhost:5000/api/personalities > /dev/null; then
    echo "✅ Server is running!"
else
    echo "❌ Server not running. Please start with: npm run server"
    exit 1
fi

echo ""
echo "🎭 Available Personalities:"
curl -s http://localhost:5000/api/personalities | jq -r 'to_entries[] | "- \(.value.name): \(.value.greeting)"'

echo ""
echo "🚀 Generating sample components with different personalities..."
echo ""

# Demo each personality
personalities=("chill-dev" "hacker-vibes" "wholesome-coder" "chaotic-genius")
component_name="DemoComponent"

for personality in "${personalities[@]}"; do
    echo "🎨 Generating with $personality personality..."
    
    response=$(curl -s -X POST -H "Content-Type: application/json" \
        -d "{\"template\":\"react-component\",\"name\":\"$component_name\",\"props\":[{\"name\":\"message\",\"type\":\"string\"}],\"personality\":\"$personality\"}" \
        http://localhost:5000/api/generate)
    
    if [ $? -eq 0 ]; then
        echo "✅ Generated successfully!"
        # Extract just the personality and vibe from response
        echo "   $(echo $response | jq -r '.generated.personality'): $(echo $response | jq -r '.generated.vibe')"
    else
        echo "❌ Failed to generate"
    fi
    echo ""
done

echo "🎉 Demo complete! Visit http://localhost:3000 to try the full interface!"
echo "💫 Happy coding with ztupid gen! ✨"