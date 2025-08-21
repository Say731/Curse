import { create } from 'zustand'

export type Voxel = {
	position: [number, number, number]
	color: string
}

type SceneState = {
	voxels: Voxel[]
	gridSize: number
	selectedColor: string
	addVoxel: (position: [number, number, number], color?: string) => void
	removeVoxel: (position: [number, number, number]) => void
	clear: () => void
	setColor: (color: string) => void
	setVoxels: (voxels: Voxel[]) => void
}

export const useSceneStore = create<SceneState>((set, get) => ({
	voxels: [],
	gridSize: 32,
	selectedColor: '#4cc9f0',
	addVoxel: (position, color) =>
		set((state) => {
			const colorToUse = color ?? state.selectedColor
			const key = position.join(',')
			const exists = state.voxels.some((v) => v.position.join(',') === key)
			if (exists) return state
			return { voxels: [...state.voxels, { position, color: colorToUse }] }
		}),
	removeVoxel: (position) =>
		set((state) => ({
			voxels: state.voxels.filter(
				(v) => v.position.join(',') !== position.join(',')
			),
		})),
	clear: () => set({ voxels: [] }),
	setColor: (color) => set({ selectedColor: color }),
	setVoxels: (voxels) => set({ voxels }),
}))