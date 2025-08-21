import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code, Zap, Brain, Download, Copy, Palette } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import PersonalitySelector from './components/PersonalitySelector';
import TemplateSelector from './components/TemplateSelector';
import GeneratedCodeDisplay from './components/GeneratedCodeDisplay';
import './App.css';

interface Personality {
  name: string;
  vibe: string;
  style: string;
  greeting: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
}

interface GeneratedCode {
  id: string;
  template: string;
  name: string;
  personality: string;
  generated: any;
  timestamp: string;
}

function App() {
  const [personalities, setPersonalities] = useState<Record<string, Personality>>({});
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedPersonality, setSelectedPersonality] = useState<string>('chill-dev');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('react-component');
  const [componentName, setComponentName] = useState<string>('MyAwesomeComponent');
  const [props, setProps] = useState<Array<{name: string, type: string}>>([
    { name: 'title', type: 'string' },
    { name: 'isVisible', type: 'boolean' }
  ]);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentGreeting, setCurrentGreeting] = useState<string>('');

  useEffect(() => {
    fetchPersonalities();
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (personalities[selectedPersonality]) {
      setCurrentGreeting(personalities[selectedPersonality].greeting);
    }
  }, [selectedPersonality, personalities]);

  const fetchPersonalities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/personalities');
      const data = await response.json();
      setPersonalities(data);
    } catch (error) {
      console.error('Failed to fetch personalities:', error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/templates');
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const generateCode = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: selectedTemplate,
          name: componentName,
          props,
          personality: selectedPersonality,
        }),
      });
      
      const result = await response.json();
      setGeneratedCode(result);
    } catch (error) {
      console.error('Failed to generate code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addProp = () => {
    setProps([...props, { name: `prop${props.length + 1}`, type: 'string' }]);
  };

  const removeProp = (index: number) => {
    setProps(props.filter((_, i) => i !== index));
  };

  const updateProp = (index: number, field: 'name' | 'type', value: string) => {
    const newProps = [...props];
    newProps[index][field] = value;
    setProps(newProps);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="floating-shapes"></div>
      
      {/* Matrix-style background effect */}
      <div className="matrix-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-neon-green text-xs opacity-20 animate-matrix"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {Math.random().toString(36).substring(7)}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-6xl font-bold bg-gradient-to-r from-neon-green via-cyber-blue to-chaos-pink bg-clip-text text-transparent mb-4 glow-text"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            <Sparkles className="inline-block mr-4 text-neon-green" size={48} />
            ztupid gen
            <Zap className="inline-block ml-4 text-cyber-blue" size={48} />
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            agentic vibe coding app builder with personality ✨
          </motion.p>
          
          <motion.div
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-4 max-w-md mx-auto border border-purple-500/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Brain className="inline-block mr-2 text-vibe-purple" size={20} />
            <span className="text-lg font-medium">{currentGreeting}</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Personality Selector */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Palette className="mr-2 text-chaos-pink" size={24} />
                Choose Your AI Personality
              </h2>
              <PersonalitySelector
                personalities={personalities}
                selected={selectedPersonality}
                onSelect={setSelectedPersonality}
              />
            </div>

            {/* Template Selector */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Code className="mr-2 text-cyber-blue" size={24} />
                Select Template
              </h2>
              <TemplateSelector
                templates={templates}
                selected={selectedTemplate}
                onSelect={setSelectedTemplate}
              />
            </div>

            {/* Component Configuration */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-4">Configure Your Code</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Component/Function Name
                  </label>
                  <input
                    type="text"
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent text-white"
                    placeholder="MyAwesomeComponent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Props/Parameters
                  </label>
                  <div className="space-y-2">
                    {props.map((prop, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={prop.name}
                          onChange={(e) => updateProp(index, 'name', e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green text-white text-sm"
                          placeholder="prop name"
                        />
                        <select
                          value={prop.type}
                          onChange={(e) => updateProp(index, 'type', e.target.value)}
                          className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green text-white text-sm"
                        >
                          <option value="string">string</option>
                          <option value="number">number</option>
                          <option value="boolean">boolean</option>
                          <option value="object">object</option>
                          <option value="array">array</option>
                        </select>
                        <button
                          onClick={() => removeProp(index)}
                          className="px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors text-red-300 text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addProp}
                      className="w-full px-4 py-2 bg-neon-green/20 border border-neon-green/50 rounded-lg hover:bg-neon-green/30 transition-colors text-neon-green font-medium"
                    >
                      + Add Prop
                    </button>
                  </div>
                </div>

                <motion.button
                  onClick={generateCode}
                  disabled={isGenerating}
                  className="w-full px-6 py-3 bg-gradient-to-r from-neon-green to-cyber-blue rounded-lg font-bold text-black hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      Generating with AI...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Sparkles className="mr-2" size={20} />
                      Generate Code
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Generated Code Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <AnimatePresence>
              {generatedCode && (
                <GeneratedCodeDisplay
                  generatedCode={generatedCode}
                  personality={personalities[generatedCode.personality]}
                />
              )}
            </AnimatePresence>
            
            {!generatedCode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/30 text-center"
              >
                <Code className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Ready to Generate Some Code?
                </h3>
                <p className="text-gray-400">
                  Choose your AI personality, select a template, configure your parameters, and let the magic happen! ✨
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;