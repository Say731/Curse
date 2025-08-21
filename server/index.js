const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Agentic AI personalities for code generation
const AGENT_PERSONALITIES = {
  'chill-dev': {
    name: 'Chill Dev',
    vibe: 'laid-back, clean code with good vibes',
    style: 'minimalist, functional, well-commented',
    greeting: 'yo, let\'s build something cool 😎'
  },
  'hacker-vibes': {
    name: 'Hacker Vibes',
    vibe: 'edgy, optimized, performance-focused',
    style: 'aggressive optimization, clever tricks, minimal comments',
    greeting: 'time to hack the matrix 🔥'
  },
  'wholesome-coder': {
    name: 'Wholesome Coder',
    vibe: 'friendly, educational, beginner-friendly',
    style: 'well-documented, readable, includes explanations',
    greeting: 'let\'s learn and build together! 🌟'
  },
  'chaotic-genius': {
    name: 'Chaotic Genius',
    vibe: 'experimental, creative, unconventional',
    style: 'unique patterns, creative solutions, artistic code',
    greeting: 'buckle up, we\'re going off the rails 🚀'
  }
};

// Code templates for different app types
const CODE_TEMPLATES = {
  'react-component': {
    name: 'React Component',
    description: 'Generate a React functional component',
    template: (name, props, personality) => generateReactComponent(name, props, personality)
  },
  'express-api': {
    name: 'Express API',
    description: 'Generate an Express.js API endpoint',
    template: (name, props, personality) => generateExpressAPI(name, props, personality)
  },
  'full-stack-app': {
    name: 'Full Stack App',
    description: 'Generate a complete full-stack application',
    template: (name, props, personality) => generateFullStackApp(name, props, personality)
  },
  'utility-function': {
    name: 'Utility Function',
    description: 'Generate a utility function',
    template: (name, props, personality) => generateUtilityFunction(name, props, personality)
  }
};

// AI-powered code generation functions
function generateReactComponent(name, props, personality) {
  const agent = AGENT_PERSONALITIES[personality] || AGENT_PERSONALITIES['chill-dev'];
  
  const componentCode = `import React from 'react';
import './${name}.css';

interface ${name}Props {
  ${props.map(prop => `${prop.name}: ${prop.type};`).join('\n  ')}
}

const ${name}: React.FC<${name}Props> = ({ ${props.map(p => p.name).join(', ')} }) => {
  ${personality === 'chaotic-genius' ? '// 🎨 let the chaos begin!' : ''}
  ${personality === 'wholesome-coder' ? '// This component is designed to be friendly and accessible' : ''}
  ${personality === 'hacker-vibes' ? '// optimized for performance 💪' : ''}
  
  return (
    <div className="${name.toLowerCase()}">
      ${personality === 'wholesome-coder' ? 
        `<h1>Welcome to ${name}! 🌟</h1>
      <p>This component was built with love and care.</p>` :
        personality === 'hacker-vibes' ?
        `<div className="matrix-style">
      <span className="glitch">${name}</span>
      </div>` :
        personality === 'chaotic-genius' ?
        `<div className="chaos-container">
      <div className="floating-element">${name}</div>
      <div className="random-shapes"></div>
      </div>` :
        `<h2>${name}</h2>
      <p>Just vibing with some clean code ✨</p>`
      }
      ${props.map(prop => 
        `<div className="prop-display">
        <strong>${prop.name}:</strong> {${prop.name}}
      </div>`
      ).join('\n      ')}
    </div>
  );
};

export default ${name};`;

  const cssCode = generateComponentCSS(name, personality);
  
  return {
    component: componentCode,
    styles: cssCode,
    personality: agent.name,
    vibe: agent.vibe
  };
}

function generateComponentCSS(name, personality) {
  const agent = AGENT_PERSONALITIES[personality] || AGENT_PERSONALITIES['chill-dev'];
  
  switch(personality) {
    case 'hacker-vibes':
      return `.${name.toLowerCase()} {
  background: #0a0a0a;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  padding: 20px;
  border: 1px solid #00ff00;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.matrix-style {
  animation: glitch 2s infinite;
}

.glitch {
  font-weight: bold;
  text-shadow: 2px 2px #ff0000;
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}`;
    
    case 'wholesome-coder':
      return `.${name.toLowerCase()} {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.prop-display {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}`;
    
    case 'chaotic-genius':
      return `.${name.toLowerCase()} {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
  background-size: 400% 400%;
  animation: chaosGradient 4s ease infinite;
  padding: 25px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.chaos-container {
  position: relative;
  z-index: 2;
}

.floating-element {
  animation: float 3s ease-in-out infinite;
  font-size: 2em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.random-shapes::before {
  content: '';
  position: absolute;
  top: 10%;
  left: 20%;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: bounce 2s infinite;
}

@keyframes chaosGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}`;
    
    default: // chill-dev
      return `.${name.toLowerCase()} {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  padding: 25px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.${name.toLowerCase()}:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.prop-display {
  background: rgba(255, 255, 255, 0.2);
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px;
  backdrop-filter: blur(5px);
}`;
  }
}

function generateExpressAPI(name, props, personality) {
  const agent = AGENT_PERSONALITIES[personality] || AGENT_PERSONALITIES['chill-dev'];
  
  return {
    code: `const express = require('express');
const router = express.Router();

${personality === 'wholesome-coder' ? '// This API endpoint was created with care and attention to detail 💝' : ''}
${personality === 'hacker-vibes' ? '// lean and mean API endpoint 🔥' : ''}
${personality === 'chaotic-genius' ? '// prepare for some wild API magic ✨' : ''}

// ${agent.greeting}
router.get('/${name.toLowerCase()}', async (req, res) => {
  try {
    ${personality === 'hacker-vibes' ? 
      '// blazing fast response' :
      personality === 'wholesome-coder' ?
      '// Let\'s handle this request with kindness' :
      '// just keeping it simple and clean'
    }
    
    const result = {
      message: '${agent.greeting}',
      data: {
        ${props.map(prop => `${prop.name}: req.query.${prop.name} || 'default_value'`).join(',\n        ')}
      },
      timestamp: new Date().toISOString(),
      personality: '${personality}'
    };
    
    res.json(result);
  } catch (error) {
    ${personality === 'wholesome-coder' ? 
      'console.error(\'Oops, something went wrong, but that\'s okay! We\'ll handle it gracefully:\', error);' :
      'console.error(\'Error:\', error);'
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;`,
    personality: agent.name,
    vibe: agent.vibe
  };
}

function generateUtilityFunction(name, props, personality) {
  const agent = AGENT_PERSONALITIES[personality] || AGENT_PERSONALITIES['chill-dev'];
  
  return {
    code: `${personality === 'wholesome-coder' ? '/**\n * This utility function was crafted with love ❤️\n * It\'s designed to be helpful and easy to understand\n */' : ''}
${personality === 'hacker-vibes' ? '// optimized utility function - no bloat 💪' : ''}
${personality === 'chaotic-genius' ? '// buckle up for some creative problem solving 🎨' : ''}

function ${name}(${props.map(p => p.name).join(', ')}) {
  ${personality === 'wholesome-coder' ? '// Let\'s validate our inputs first, because we care about data integrity!' : ''}
  ${personality === 'hacker-vibes' ? '// straight to business' : ''}
  ${personality === 'chaotic-genius' ? '// time for some algorithmic artistry' : ''}
  
  ${props.map(prop => 
    personality === 'wholesome-coder' ? 
      `if (${prop.name} === undefined || ${prop.name} === null) {
    console.warn('Hey there! ${prop.name} seems to be missing. Using a safe default instead.');
    ${prop.name} = 'default';
  }` :
    personality === 'hacker-vibes' ?
      `${prop.name} = ${prop.name} || 'default'; // fast fallback` :
      `${prop.name} = ${prop.name} ?? 'default'; // nullish coalescing magic ✨`
  ).join('\n  ')}
  
  ${personality === 'chaotic-genius' ? 
    `// let's do something unexpected
  const result = [${props.map(p => p.name).join(', ')}]
    .map(val => String(val).split('').reverse().join(''))
    .join('_')
    .toLowerCase();
  
  return { 
    original: [${props.map(p => p.name).join(', ')}],
    transformed: result,
    chaos_level: Math.random(),
    timestamp: Date.now()
  };` :
    personality === 'hacker-vibes' ?
    `// optimized return
  return [${props.map(p => p.name).join(', ')}].join('').toLowerCase().replace(/\\s+/g, '');` :
    personality === 'wholesome-coder' ?
    `// Let's return a friendly result object
  return {
    message: 'Hello from ${name}! 🌟',
    inputs: { ${props.map(p => `${p.name}: ${p.name}`).join(', ')} },
    processedAt: new Date().toLocaleString(),
    withLove: true
  };` :
    `// clean and simple return
  return {
    ${props.map(p => `${p.name}: ${p.name}`).join(',\n    ')},
    processed: true
  };`
  }
}

export default ${name};`,
    personality: agent.name,
    vibe: agent.vibe
  };
}

function generateFullStackApp(name, props, personality) {
  const agent = AGENT_PERSONALITIES[personality] || AGENT_PERSONALITIES['chill-dev'];
  
  return {
    frontend: generateReactComponent(name, props, personality),
    backend: generateExpressAPI(name, props, personality),
    personality: agent.name,
    vibe: agent.vibe
  };
}

// Routes
app.get('/api/personalities', (req, res) => {
  res.json(AGENT_PERSONALITIES);
});

app.get('/api/templates', (req, res) => {
  res.json(Object.keys(CODE_TEMPLATES).map(key => ({
    id: key,
    ...CODE_TEMPLATES[key]
  })));
});

app.post('/api/generate', async (req, res) => {
  try {
    const { template, name, props, personality } = req.body;
    
    if (!template || !name) {
      return res.status(400).json({ error: 'Template and name are required' });
    }
    
    const templateFunc = CODE_TEMPLATES[template];
    if (!templateFunc) {
      return res.status(400).json({ error: 'Invalid template' });
    }
    
    const result = templateFunc.template(name, props || [], personality || 'chill-dev');
    
    res.json({
      id: uuidv4(),
      template,
      name,
      personality: personality || 'chill-dev',
      generated: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: 'Failed to generate code' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ztupid gen server running on port ${PORT}`);
  console.log(`💫 Ready to generate some code with personality!`);
});