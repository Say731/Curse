import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Eye, EyeOff, CheckCircle } from 'lucide-react';
import CodeEditor from './CodeEditor';

interface Personality {
  name: string;
  vibe: string;
  style: string;
  greeting: string;
}

interface GeneratedCode {
  id: string;
  template: string;
  name: string;
  personality: string;
  generated: any;
  timestamp: string;
}

interface GeneratedCodeDisplayProps {
  generatedCode: GeneratedCode;
  personality?: Personality;
}

const GeneratedCodeDisplay: React.FC<GeneratedCodeDisplayProps> = ({
  generatedCode,
  personality,
}) => {
  const [activeTab, setActiveTab] = useState<string>('component');
  const [copied, setCopied] = useState<string>('');
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(true);

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPersonalityColor = (personalityKey: string) => {
    switch (personalityKey) {
      case 'chill-dev':
        return 'from-cyan-500/20 to-blue-500/20 border-cyan-500/50';
      case 'hacker-vibes':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/50';
      case 'wholesome-coder':
        return 'from-pink-500/20 to-rose-500/20 border-pink-500/50';
      case 'chaotic-genius':
        return 'from-purple-500/20 to-fuchsia-500/20 border-purple-500/50';
      default:
        return 'from-gray-500/20 to-slate-500/20 border-gray-500/50';
    }
  };

  const renderCodeTabs = () => {
    const { generated } = generatedCode;
    
    if (generatedCode.template === 'react-component') {
      return (
        <div className="space-y-4">
          <div className="flex space-x-2 border-b border-slate-600/50">
            <button
              onClick={() => setActiveTab('component')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'component'
                  ? 'text-neon-green border-b-2 border-neon-green'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Component
            </button>
            <button
              onClick={() => setActiveTab('styles')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'styles'
                  ? 'text-neon-green border-b-2 border-neon-green'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Styles
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute top-2 right-2 z-10 flex space-x-2">
              <button
                onClick={() => handleCopy(
                  activeTab === 'component' ? generated.component : generated.styles,
                  activeTab
                )}
                className="p-2 bg-slate-700/80 hover:bg-slate-600/80 rounded-lg transition-colors backdrop-blur-sm"
                title="Copy to clipboard"
              >
                {copied === activeTab ? (
                  <CheckCircle className="text-neon-green" size={16} />
                ) : (
                  <Copy className="text-gray-300" size={16} />
                )}
              </button>
              <button
                onClick={() => handleDownload(
                  activeTab === 'component' ? generated.component : generated.styles,
                  `${generatedCode.name}.${activeTab === 'component' ? 'tsx' : 'css'}`
                )}
                className="p-2 bg-slate-700/80 hover:bg-slate-600/80 rounded-lg transition-colors backdrop-blur-sm"
                title="Download file"
              >
                <Download className="text-gray-300" size={16} />
              </button>
            </div>
            
            <CodeEditor
              value={activeTab === 'component' ? generated.component : generated.styles}
              onChange={() => {}}
              language={activeTab === 'component' ? 'typescript' : 'css'}
              height="500px"
              readOnly={true}
            />
          </div>
        </div>
      );
    } else if (generatedCode.template === 'full-stack-app') {
      return (
        <div className="space-y-4">
          <div className="flex space-x-2 border-b border-slate-600/50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'frontend'
                  ? 'text-neon-green border-b-2 border-neon-green'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'backend'
                  ? 'text-neon-green border-b-2 border-neon-green'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Backend
            </button>
            <button
              onClick={() => setActiveTab('styles')}
              className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'styles'
                  ? 'text-neon-green border-b-2 border-neon-green'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Styles
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute top-2 right-2 z-10 flex space-x-2">
              <button
                onClick={() => {
                  let content = '';
                  let extension = '';
                  if (activeTab === 'frontend') {
                    content = generated.frontend.component;
                    extension = 'tsx';
                  } else if (activeTab === 'backend') {
                    content = generated.backend.code;
                    extension = 'js';
                  } else {
                    content = generated.frontend.styles;
                    extension = 'css';
                  }
                  handleCopy(content, activeTab);
                }}
                className="p-2 bg-slate-700/80 hover:bg-slate-600/80 rounded-lg transition-colors backdrop-blur-sm"
                title="Copy to clipboard"
              >
                {copied === activeTab ? (
                  <CheckCircle className="text-neon-green" size={16} />
                ) : (
                  <Copy className="text-gray-300" size={16} />
                )}
              </button>
              <button
                onClick={() => {
                  let content = '';
                  let extension = '';
                  if (activeTab === 'frontend') {
                    content = generated.frontend.component;
                    extension = 'tsx';
                  } else if (activeTab === 'backend') {
                    content = generated.backend.code;
                    extension = 'js';
                  } else {
                    content = generated.frontend.styles;
                    extension = 'css';
                  }
                  handleDownload(content, `${generatedCode.name}.${extension}`);
                }}
                className="p-2 bg-slate-700/80 hover:bg-slate-600/80 rounded-lg transition-colors backdrop-blur-sm"
                title="Download file"
              >
                <Download className="text-gray-300" size={16} />
              </button>
            </div>
            
            <CodeEditor
              value={
                activeTab === 'frontend' ? generated.frontend.component :
                activeTab === 'backend' ? generated.backend.code :
                generated.frontend.styles
              }
              onChange={() => {}}
              language={
                activeTab === 'frontend' ? 'typescript' :
                activeTab === 'backend' ? 'javascript' :
                'css'
              }
              height="500px"
              readOnly={true}
            />
          </div>
        </div>
      );
    } else {
      // Single code output (express-api, utility-function)
      return (
        <div className="relative">
          <div className="absolute top-2 right-2 z-10 flex space-x-2">
            <button
              onClick={() => handleCopy(generated.code, 'code')}
              className="p-2 bg-slate-700/80 hover:bg-slate-600/80 rounded-lg transition-colors backdrop-blur-sm"
              title="Copy to clipboard"
            >
              {copied === 'code' ? (
                <CheckCircle className="text-neon-green" size={16} />
              ) : (
                <Copy className="text-gray-300" size={16} />
              )}
            </button>
            <button
              onClick={() => handleDownload(
                generated.code,
                `${generatedCode.name}.${generatedCode.template === 'express-api' ? 'js' : 'ts'}`
              )}
              className="p-2 bg-slate-700/80 hover:bg-slate-600/80 rounded-lg transition-colors backdrop-blur-sm"
              title="Download file"
            >
              <Download className="text-gray-300" size={16} />
            </button>
          </div>
          
          <CodeEditor
            value={generated.code}
            onChange={() => {}}
            language={generatedCode.template === 'express-api' ? 'javascript' : 'typescript'}
            height="500px"
            readOnly={true}
          />
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className={`bg-gradient-to-br ${getPersonalityColor(generatedCode.personality)} backdrop-blur-xl rounded-2xl p-6 border`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {generatedCode.name}
            </h3>
            <p className="text-sm text-gray-300">
              Generated with {personality?.name || generatedCode.personality} personality
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">
              {new Date(generatedCode.timestamp).toLocaleString()}
            </div>
            <div className="text-sm font-medium text-gray-300 capitalize">
              {generatedCode.template.replace('-', ' ')}
            </div>
          </div>
        </div>
        
        {personality && (
          <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-gray-200 italic">
              "{personality.greeting}"
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Style: {personality.style}
            </p>
          </div>
        )}
      </div>

      {/* Code Display */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-600/50">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">Generated Code</h4>
            <button
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
            >
              {isPreviewVisible ? (
                <EyeOff className="text-gray-300" size={16} />
              ) : (
                <Eye className="text-gray-300" size={16} />
              )}
              <span className="text-sm text-gray-300">
                {isPreviewVisible ? 'Hide' : 'Show'} Code
              </span>
            </button>
          </div>
        </div>
        
        {isPreviewVisible && (
          <div className="p-4">
            {renderCodeTabs()}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GeneratedCodeDisplay;