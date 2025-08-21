import { useState } from 'react'
import { useSceneStore } from '../store'
import { VoiceButton } from './VoiceButton'

type Rule = {
	pattern: RegExp
	apply: (text: string) => Array<{ position: [number, number, number]; color: string }>
}

const rules: Rule[] = [
	{
		pattern: /(tree|pine|spruce)/i,
		apply: () => {
			const voxels = [] as Array<{ position: [number, number, number]; color: string }>
			for (let y = 0; y < 4; y++) voxels.push({ position: [0, y, 0], color: '#8d5524' })
			let radius = 3
			for (let layer = 0; layer < 4; layer++) {
				for (let x = -radius; x <= radius; x++)
					for (let z = -radius; z <= radius; z++)
						if (Math.abs(x) + Math.abs(z) <= radius + 1)
							voxels.push({ position: [x, 4 + layer, z], color: '#2a9d8f' })
				radius -= 1
			}
			return voxels
		},
	},
	{
		pattern: /(house|hut)/i,
		apply: () => {
			const voxels = [] as Array<{ position: [number, number, number]; color: string }>
			for (let x = -3; x <= 3; x++) for (let z = -3; z <= 3; z++) voxels.push({ position: [x, 0, z], color: '#b08968' })
			for (let y = 1; y <= 3; y++) {
				for (let x = -3; x <= 3; x++) {
					voxels.push({ position: [x, y, -3], color: '#d4a373' })
					voxels.push({ position: [x, y, 3], color: '#d4a373' })
				}
				for (let z = -3; z <= 3; z++) {
					voxels.push({ position: [-3, y, z], color: '#d4a373' })
					voxels.push({ position: [3, y, z], color: '#d4a373' })
				}
			}
			for (let x = -3; x <= 3; x++) for (let z = -3; z <= 3; z++) voxels.push({ position: [x, 4, z], color: '#9d0208' })
			return voxels
		},
	},
	{
		pattern: /(smile|emoji|face)/i,
		apply: () => {
			const voxels = [] as Array<{ position: [number, number, number]; color: string }>
			const R = 6
			for (let x = -R; x <= R; x++) for (let y = 0; y <= 2 * R; y++) {
				const dx = x
				const dy = y - R
				if (dx * dx + dy * dy <= R * R) voxels.push({ position: [x, y, 0], color: '#f9c74f' })
			}
			for (const eyeX of [-2, 2]) for (let yy = 8; yy <= 9; yy++) voxels.push({ position: [eyeX, yy, 1], color: '#000000' })
			for (let x = -3; x <= 3; x++) voxels.push({ position: [x, 3, 1], color: '#000000' })
			for (let x = -4; x <= 4; x++) voxels.push({ position: [x, 2, 1], color: '#000000' })
			return voxels
		},
	},
]

export function GeneratorPanel() {
	const { addVoxel, clear } = useSceneStore()
	const [text, setText] = useState('tree')

	const generate = () => {
		clear()
		for (const rule of rules) {
			if (rule.pattern.test(text)) {
				for (const v of rule.apply(text)) addVoxel(v.position, v.color)
				return
			}
		}
		for (let x = -3; x <= 3; x++) for (let z = -3; z <= 3; z++) addVoxel([x, 0, z], '#4361ee')
	}

	return (
		<div className="generator">
			<div className="field-row">
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Describe what to make (e.g., tree, house)"
				/>
				<VoiceButton onTranscript={(t) => setText(t)} />
			</div>
			<button onClick={generate}>Generate</button>
		</div>
	)
}

