import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Cube, 
  Sparkles, 
  FileText, 
  Mic, 
  Video, 
  Image, 
  Music, 
  ArrowRight,
  Play,
  Zap,
  Shield,
  Palette
} from 'lucide-react'

const features = [
  {
    icon: Cube,
    title: 'Voxel Engine',
    description: 'Advanced 3D voxel editor with real-time rendering and animation capabilities.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Sparkles,
    title: 'AI Generation',
    description: 'Generate images, videos, 3D models, and animations using cutting-edge AI.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: FileText,
    title: 'File Processing',
    description: 'Process PDFs, PowerPoints, and documents with intelligent AI analysis.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Mic,
    title: 'Voice Assistant',
    description: 'Interactive voice commands and text-to-speech powered by advanced AI.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Video,
    title: 'Video Processing',
    description: 'AI-powered video editing, effects, and automated content generation.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Music,
    title: 'Audio AI',
    description: 'Generate music, process audio, and create immersive soundscapes.',
    color: 'from-teal-500 to-blue-500'
  }
]

const stats = [
  { label: 'AI Models', value: '50+' },
  { label: 'File Formats', value: '25+' },
  { label: 'Rendering FPS', value: '120' },
  { label: 'Processing Speed', value: '10x' }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Cube className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">Voxel AI</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Voxel AI</span>
              <br />
              <span className="text-gray-900 dark:text-white">
                The Future of 3D
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced AI application with voxel rendering, multimedia processing, voice assistant, 
              and comprehensive file handling. Create, edit, and animate in a whole new dimension.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <button className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to create, process, and interact with multimedia content 
              using the latest AI technologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators using Voxel AI to bring their ideas to life 
              with cutting-edge AI technology.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Cube className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Voxel AI</span>
            </div>
            
            <div className="text-gray-400">
              © 2024 Voxel AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}