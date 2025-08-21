import React from 'react';
import { motion } from 'framer-motion';
import { User, Zap, Heart, Sparkles } from 'lucide-react';

interface Personality {
  name: string;
  vibe: string;
  style: string;
  greeting: string;
}

interface PersonalitySelectorProps {
  personalities: Record<string, Personality>;
  selected: string;
  onSelect: (personality: string) => void;
}

const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({
  personalities,
  selected,
  onSelect,
}) => {
  const getPersonalityIcon = (key: string) => {
    switch (key) {
      case 'chill-dev':
        return <User className="text-cyber-blue" size={20} />;
      case 'hacker-vibes':
        return <Zap className="text-neon-green" size={20} />;
      case 'wholesome-coder':
        return <Heart className="text-pink-400" size={20} />;
      case 'chaotic-genius':
        return <Sparkles className="text-chaos-pink" size={20} />;
      default:
        return <User className="text-gray-400" size={20} />;
    }
  };

  const getPersonalityColor = (key: string) => {
    switch (key) {
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

  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(personalities).map(([key, personality]) => (
        <motion.button
          key={key}
          onClick={() => onSelect(key)}
          className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
            selected === key
              ? `bg-gradient-to-br ${getPersonalityColor(key)} ring-2 ring-white/20`
              : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-600/40'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-center mb-2">
            {getPersonalityIcon(key)}
          </div>
          <div className="text-center">
            <div className="font-semibold text-sm text-white mb-1">
              {personality.name}
            </div>
            <div className="text-xs text-gray-300 leading-tight">
              {personality.vibe}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default PersonalitySelector;