import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useVoxelStore } from '../store/voxelStore'
import { 
  Play, 
  Pause, 
  Save, 
  Trash2, 
  RotateCcw, 
  Plus, 
  Minus, 
  Palette,
  Grid3X3,
  Eye,
  EyeOff
} from 'lucide-react'
import * as THREE from 'three'

// Voxel component for 3D rendering
function VoxelMesh({ position, color, active, onClick }: {
  position: [number, number, number]
  color: string
  active: boolean
  onClick: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[0.9, 0.9, 0.9]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={active ? color : '#f0f0f0'}
        opacity={active ? 1 : 0.3}
        transparent
      />
    </Box>
  )
}

// 3D Scene component
function VoxelScene() {
  const { currentModel, updateVoxel, selectedColor } = useVoxelStore()

  if (!currentModel) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <Grid3X3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Create a new model to start editing</p>
        </div>
      </div>
    )
  }

  const handleVoxelClick = (x: number, y: number, z: number) => {
    const voxel = currentModel.voxels[x][y][z]
    updateVoxel(x, y, z, !voxel.active, selectedColor)
  }

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 75 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      
      {currentModel.voxels.map((layer, x) =>
        layer.map((row, y) =>
          row.map((voxel, z) => (
            <VoxelMesh
              key={`${x}-${y}-${z}`}
              position={[x - currentModel.size.x / 2, y - currentModel.size.y / 2, z - currentModel.size.z / 2]}
              color={voxel.color}
              active={voxel.active}
              onClick={() => handleVoxelClick(x, y, z)}
            />
          ))
        )
      )}
    </Canvas>
  )
}

// Color Palette component
function ColorPalette() {
  const { selectedColor, setSelectedColor } = useVoxelStore()
  
  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#ffffff', '#000000', '#808080', '#800000', '#008000', '#000080',
    '#808000', '#800080', '#008080', '#c0c0c0', '#ffa500', '#ffc0cb'
  ]

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Palette className="w-5 h-5 mr-2" />
        Color Palette
      </h3>
      <div className="grid grid-cols-6 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
              selectedColor === color 
                ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Custom Color
        </label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
        />
      </div>
    </div>
  )
}

// Model Controls component
function ModelControls() {
  const { 
    currentModel, 
    createModel, 
    saveModel, 
    clearModel, 
    setCurrentModel,
    gridSize,
    setGridSize
  } = useVoxelStore()
  
  const [showNewModelDialog, setShowNewModelDialog] = useState(false)
  const [newModelName, setNewModelName] = useState('')
  const [newModelSize, setNewModelSize] = useState({ x: 8, y: 8, z: 8 })

  const handleCreateModel = () => {
    if (!newModelName.trim()) return
    
    createModel(newModelName, newModelSize)
    setShowNewModelDialog(false)
    setNewModelName('')
  }

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Model Controls
        </h3>
        
        <div className="space-y-3">
          <button
            onClick={() => setShowNewModelDialog(true)}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Model</span>
          </button>
          
          {currentModel && (
            <>
              <button
                onClick={saveModel}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              
              <button
                onClick={clearModel}
                className="w-full btn-secondary flex items-center justify-center space-x-2 text-orange-600 dark:text-orange-400"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear</span>
              </button>
              
              <button
                onClick={() => setCurrentModel(null)}
                className="w-full btn-secondary flex items-center justify-center space-x-2 text-red-600 dark:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
                <span>Close</span>
              </button>
            </>
          )}
        </div>
      </div>

      {currentModel && (
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Model Info
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Name:</span>
              <span className="text-gray-900 dark:text-white">{currentModel.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Size:</span>
              <span className="text-gray-900 dark:text-white">
                {currentModel.size.x}×{currentModel.size.y}×{currentModel.size.z}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Voxels:</span>
              <span className="text-gray-900 dark:text-white">
                {currentModel.voxels.flat(2).filter(v => v.active).length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* New Model Dialog */}
      {showNewModelDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowNewModelDialog(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create New Model
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model Name
                </label>
                <input
                  type="text"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  className="input-field"
                  placeholder="Enter model name"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Width
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="32"
                    value={newModelSize.x}
                    onChange={(e) => setNewModelSize(prev => ({ ...prev, x: parseInt(e.target.value) || 1 }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="32"
                    value={newModelSize.y}
                    onChange={(e) => setNewModelSize(prev => ({ ...prev, y: parseInt(e.target.value) || 1 }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Depth
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="32"
                    value={newModelSize.z}
                    onChange={(e) => setNewModelSize(prev => ({ ...prev, z: parseInt(e.target.value) || 1 }))}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewModelDialog(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateModel}
                disabled={!newModelName.trim()}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default function VoxelEditor() {
  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* 3D Viewport */}
      <div className="flex-1 card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Grid3X3 className="w-6 h-6 mr-2" />
            Voxel Editor
          </h2>
          
          <div className="flex items-center space-x-2">
            <button className="btn-secondary p-2">
              <Eye className="w-4 h-4" />
            </button>
            <button className="btn-secondary p-2">
              <Play className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="h-96 lg:h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-800 rounded-lg overflow-hidden">
          <VoxelScene />
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-full lg:w-80 space-y-6">
        <ModelControls />
        <ColorPalette />
      </div>
    </div>
  )
}