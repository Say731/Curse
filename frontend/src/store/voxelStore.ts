import { create } from 'zustand'

export interface VoxelData {
  x: number
  y: number
  z: number
  color: string
  active: boolean
}

export interface VoxelModel {
  id: string
  name: string
  voxels: VoxelData[][][]
  size: { x: number; y: number; z: number }
  colors: string[]
  createdAt: string
  updatedAt: string
}

interface VoxelState {
  currentModel: VoxelModel | null
  models: VoxelModel[]
  selectedColor: string
  gridSize: { x: number; y: number; z: number }
  isEditing: boolean
  
  // Actions
  createModel: (name: string, size: { x: number; y: number; z: number }) => void
  setCurrentModel: (model: VoxelModel | null) => void
  updateVoxel: (x: number, y: number, z: number, active: boolean, color?: string) => void
  setSelectedColor: (color: string) => void
  setGridSize: (size: { x: number; y: number; z: number }) => void
  saveModel: () => void
  loadModel: (id: string) => void
  deleteModel: (id: string) => void
  clearModel: () => void
  setIsEditing: (editing: boolean) => void
}

const defaultColors = [
  '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
  '#ffffff', '#000000', '#808080', '#800000', '#008000', '#000080',
  '#808000', '#800080', '#008080', '#c0c0c0'
]

const createEmptyVoxels = (size: { x: number; y: number; z: number }): VoxelData[][][] => {
  const voxels: VoxelData[][][] = []
  for (let x = 0; x < size.x; x++) {
    voxels[x] = []
    for (let y = 0; y < size.y; y++) {
      voxels[x][y] = []
      for (let z = 0; z < size.z; z++) {
        voxels[x][y][z] = {
          x,
          y,
          z,
          color: defaultColors[0],
          active: false
        }
      }
    }
  }
  return voxels
}

export const useVoxelStore = create<VoxelState>((set, get) => ({
  currentModel: null,
  models: [],
  selectedColor: defaultColors[0],
  gridSize: { x: 16, y: 16, z: 16 },
  isEditing: false,

  createModel: (name: string, size: { x: number; y: number; z: number }) => {
    const newModel: VoxelModel = {
      id: `model_${Date.now()}`,
      name,
      voxels: createEmptyVoxels(size),
      size,
      colors: [...defaultColors],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    set(state => ({
      currentModel: newModel,
      models: [...state.models, newModel],
      gridSize: size
    }))
  },

  setCurrentModel: (model: VoxelModel | null) => {
    set({ currentModel: model })
    if (model) {
      set({ gridSize: model.size })
    }
  },

  updateVoxel: (x: number, y: number, z: number, active: boolean, color?: string) => {
    const { currentModel, selectedColor } = get()
    if (!currentModel) return

    const updatedModel = {
      ...currentModel,
      voxels: currentModel.voxels.map((layer, xi) =>
        layer.map((row, yi) =>
          row.map((voxel, zi) => {
            if (xi === x && yi === y && zi === z) {
              return {
                ...voxel,
                active,
                color: color || selectedColor
              }
            }
            return voxel
          })
        )
      ),
      updatedAt: new Date().toISOString()
    }

    set(state => ({
      currentModel: updatedModel,
      models: state.models.map(model => 
        model.id === updatedModel.id ? updatedModel : model
      )
    }))
  },

  setSelectedColor: (color: string) => {
    set({ selectedColor: color })
  },

  setGridSize: (size: { x: number; y: number; z: number }) => {
    set({ gridSize: size })
  },

  saveModel: () => {
    const { currentModel } = get()
    if (!currentModel) return

    // In a real app, this would save to the backend
    console.log('Saving model:', currentModel.name)
  },

  loadModel: (id: string) => {
    const { models } = get()
    const model = models.find(m => m.id === id)
    if (model) {
      set({ currentModel: model, gridSize: model.size })
    }
  },

  deleteModel: (id: string) => {
    set(state => ({
      models: state.models.filter(model => model.id !== id),
      currentModel: state.currentModel?.id === id ? null : state.currentModel
    }))
  },

  clearModel: () => {
    const { currentModel } = get()
    if (!currentModel) return

    const clearedModel = {
      ...currentModel,
      voxels: createEmptyVoxels(currentModel.size),
      updatedAt: new Date().toISOString()
    }

    set(state => ({
      currentModel: clearedModel,
      models: state.models.map(model => 
        model.id === clearedModel.id ? clearedModel : model
      )
    }))
  },

  setIsEditing: (editing: boolean) => {
    set({ isEditing: editing })
  }
}))