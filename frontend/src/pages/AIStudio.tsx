import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Image, 
  Video, 
  Music, 
  Cube, 
  Type, 
  Send, 
  Download, 
  RefreshCw,
  Settings,
  Zap,
  Play,
  Pause
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface GenerationResult {
  id: string
  type: string
  prompt: string
  result: any
  timestamp: string
  isLoading?: boolean
}

const aiModes = [
  {
    id: 'image',
    name: 'Image Generation',
    description: 'Create stunning images from text descriptions',
    icon: Image,
    color: 'from-pink-500 to-rose-500',
    placeholder: 'A futuristic cityscape at sunset with flying cars...'
  },
  {
    id: 'video',
    name: 'Video Creation',
    description: 'Generate videos and animations',
    icon: Video,
    color: 'from-purple-500 to-indigo-500',
    placeholder: 'A time-lapse of a flower blooming in spring...'
  },
  {
    id: 'audio',
    name: 'Audio Generation',
    description: 'Create music and sound effects',
    icon: Music,
    color: 'from-green-500 to-teal-500',
    placeholder: 'Upbeat electronic music with synthesizers...'
  },
  {
    id: '3d',
    name: '3D Models',
    description: 'Generate 3D objects and voxel art',
    icon: Cube,
    color: 'from-blue-500 to-cyan-500',
    placeholder: 'A medieval castle with detailed architecture...'
  },
  {
    id: 'text',
    name: 'Text Generation',
    description: 'AI-powered writing and content creation',
    icon: Type,
    color: 'from-orange-500 to-red-500',
    placeholder: 'Write a story about space exploration...'
  }
]

export default function AIStudio() {
  const [selectedMode, setSelectedMode] = useState(aiModes[0])
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<GenerationResult[]>([])
  const [parameters, setParameters] = useState({
    quality: 'high',
    style: 'realistic',
    duration: 10,
    resolution: '1024x1024'
  })

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    
    const newResult: GenerationResult = {
      id: Date.now().toString(),
      type: selectedMode.id,
      prompt,
      result: null,
      timestamp: new Date().toISOString(),
      isLoading: true
    }
    
    setResults(prev => [newResult, ...prev])

    try {
      const response = await axios.post('/ai/generate', {
        prompt,
        type: selectedMode.id,
        parameters
      })

      setResults(prev => 
        prev.map(result => 
          result.id === newResult.id 
            ? { ...result, result: response.data.result, isLoading: false }
            : result
        )
      )
      
      toast.success('Generation completed!')
      setPrompt('')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Generation failed')
      
      setResults(prev => prev.filter(result => result.id !== newResult.id))
    } finally {
      setIsGenerating(false)
    }
  }

  const renderResult = (result: GenerationResult) => {
    if (result.isLoading) {
      return (
        <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-dark-700 rounded-lg">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-primary-600" />
            <p className="text-gray-600 dark:text-gray-400">Generating...</p>
          </div>
        </div>
      )
    }

    switch (result.type) {
      case 'image':
        return (
          <div className="relative group">
            <img
              src={result.result?.url || '/api/placeholder/400/300'}
              alt={result.prompt}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <button className="btn-primary mr-2">
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        )
      
      case 'video':
        return (
          <div className="relative bg-gray-900 rounded-lg h-48 flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-12 h-12 mx-auto mb-2" />
              <p>Video Preview</p>
              <p className="text-sm opacity-75">Click to play</p>
            </div>
          </div>
        )
      
      case 'audio':
        return (
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Music className="w-8 h-8" />
              <div className="flex space-x-2">
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-1/3"></div>
              </div>
              <span className="text-sm">0:30 / 1:30</span>
            </div>
          </div>
        )
      
      case '3d':
        return (
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-6 text-white h-48 flex items-center justify-center">
            <div className="text-center">
              <Cube className="w-12 h-12 mx-auto mb-2" />
              <p className="font-medium">3D Model Generated</p>
              <p className="text-sm opacity-75">Click to view in 3D</p>
            </div>
          </div>
        )
      
      case 'text':
        return (
          <div className="bg-white dark:bg-dark-700 rounded-lg p-4 border border-gray-200 dark:border-dark-600">
            <p className="text-gray-900 dark:text-white leading-relaxed">
              {result.result?.text || 'Generated text content will appear here...'}
            </p>
          </div>
        )
      
      default:
        return (
          <div className="bg-gray-100 dark:bg-dark-700 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {result.result?.message || 'Content generated'}
            </p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Sparkles className="w-8 h-8 mr-3 text-primary-600" />
            AI Studio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate images, videos, audio, 3D models, and text with AI
          </p>
        </div>
        
        <button className="btn-secondary flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Mode Selection */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              AI Modes
            </h3>
            <div className="space-y-2">
              {aiModes.map((mode) => {
                const Icon = mode.icon
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedMode.id === mode.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800'
                        : 'hover:bg-gray-50 dark:hover:bg-dark-700 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${mode.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {mode.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Parameters */}
          <div className="card p-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Parameters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quality
                </label>
                <select
                  value={parameters.quality}
                  onChange={(e) => setParameters(prev => ({ ...prev, quality: e.target.value }))}
                  className="input-field"
                >
                  <option value="draft">Draft</option>
                  <option value="standard">Standard</option>
                  <option value="high">High</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Style
                </label>
                <select
                  value={parameters.style}
                  onChange={(e) => setParameters(prev => ({ ...prev, style: e.target.value }))}
                  className="input-field"
                >
                  <option value="realistic">Realistic</option>
                  <option value="artistic">Artistic</option>
                  <option value="cartoon">Cartoon</option>
                  <option value="abstract">Abstract</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Generation Interface */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${selectedMode.color} rounded-lg flex items-center justify-center`}>
                <selectedMode.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedMode.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedMode.description}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={selectedMode.placeholder}
                  className="input-field h-24 resize-none"
                  disabled={isGenerating}
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated Content
              </h3>
              {results.length > 0 && (
                <button
                  onClick={() => setResults([])}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {results.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Your generated content will appear here
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {results.map((result) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-3"
                    >
                      {renderResult(result)}
                      <div className="text-sm">
                        <p className="text-gray-900 dark:text-white font-medium truncate">
                          {result.prompt}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                          {new Date(result.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}