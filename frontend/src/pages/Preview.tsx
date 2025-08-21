import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Edit, 
  Maximize2, 
  Play, 
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react'
import { useState } from 'react'

export default function Preview() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const renderPreview = () => {
    switch (type) {
      case 'image':
        return (
          <div className="w-full h-full bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center">
            <img
              src="/api/placeholder/800/600"
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        )
      
      case 'video':
        return (
          <div className="w-full h-full bg-black rounded-lg flex items-center justify-center relative">
            <video
              className="max-w-full max-h-full rounded-lg"
              controls
              poster="/api/placeholder/800/450"
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      
      case 'audio':
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <Volume2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Audio Preview</h3>
              <p className="text-white/80 mb-6">Generated audio content</p>
              
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="mt-6 bg-white/20 rounded-full h-2 w-64 mx-auto">
                <div className="bg-white h-2 rounded-full w-1/3"></div>
              </div>
            </div>
          </div>
        )
      
      case '3d':
        return (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-800 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              
              {/* Sample 3D content */}
              <Box args={[2, 2, 2]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#3b82f6" />
              </Box>
              
              <Box args={[1, 1, 1]} position={[3, 0, 0]}>
                <meshStandardMaterial color="#ef4444" />
              </Box>
              
              <Box args={[1.5, 1.5, 1.5]} position={[-3, 0, 0]}>
                <meshStandardMaterial color="#10b981" />
              </Box>
            </Canvas>
          </div>
        )
      
      default:
        return (
          <div className="w-full h-full bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg">Preview not available</p>
              <p className="text-sm">Unsupported content type: {type}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
              {type} Preview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              ID: {id}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="btn-secondary flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          
          <button className="btn-secondary flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="btn-secondary p-2"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 ${isFullscreen ? 'fixed inset-0 z-50 bg-black p-4' : ''}`}
      >
        <div className={`w-full h-full ${isFullscreen ? '' : 'max-h-[70vh]'}`}>
          {renderPreview()}
        </div>
        
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 btn-secondary p-2 z-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </motion.div>

      {/* Details Panel */}
      {!isFullscreen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-6 card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Content Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Type:</span>
                <span className="text-gray-900 dark:text-white capitalize">{type}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ID:</span>
                <span className="text-gray-900 dark:text-white font-mono text-sm">{id}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created:</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Size:</span>
                <span className="text-gray-900 dark:text-white">2.4 MB</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Format:</span>
                <span className="text-gray-900 dark:text-white uppercase">
                  {type === 'image' ? 'PNG' : type === 'video' ? 'MP4' : type === 'audio' ? 'WAV' : type === '3d' ? 'OBJ' : 'Unknown'}
                </span>
              </div>
              
              {type === 'image' && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                  <span className="text-gray-900 dark:text-white">1024 × 768</span>
                </div>
              )}
              
              {type === 'video' && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                  <span className="text-gray-900 dark:text-white">0:30</span>
                </div>
              )}
              
              {type === 'audio' && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                  <span className="text-gray-900 dark:text-white">1:45</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Quality:</span>
                <span className="text-gray-900 dark:text-white">High</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-600">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Generation Prompt
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              "Create a futuristic cityscape with flying cars and neon lights at sunset"
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}