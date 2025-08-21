import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Layers, Wrench } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selected: string;
  onSelect: (template: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selected,
  onSelect,
}) => {
  const getTemplateIcon = (id: string) => {
    switch (id) {
      case 'react-component':
        return <Code className="text-cyber-blue" size={20} />;
      case 'express-api':
        return <Server className="text-neon-green" size={20} />;
      case 'full-stack-app':
        return <Layers className="text-chaos-pink" size={20} />;
      case 'utility-function':
        return <Wrench className="text-yellow-400" size={20} />;
      default:
        return <Code className="text-gray-400" size={20} />;
    }
  };

  const getTemplateColor = (id: string) => {
    switch (id) {
      case 'react-component':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/50';
      case 'express-api':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/50';
      case 'full-stack-app':
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/50';
      case 'utility-function':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
      default:
        return 'from-gray-500/20 to-slate-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {templates.map((template, index) => (
        <motion.button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
            selected === template.id
              ? `bg-gradient-to-br ${getTemplateColor(template.id)} ring-2 ring-white/20`
              : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-600/40'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.05 }}
        >
          <div className="flex items-center justify-center mb-2">
            {getTemplateIcon(template.id)}
          </div>
          <div className="text-center">
            <div className="font-semibold text-sm text-white mb-1">
              {template.name}
            </div>
            <div className="text-xs text-gray-300 leading-tight">
              {template.description}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default TemplateSelector;