import { saveAs } from 'file-saver'
import { useSceneStore } from '../store'
import { exportVoxelsToGLTF } from '../utils/exporters'

export function ExportPanel() {
	const { voxels, setVoxels } = useSceneStore()

	const exportJSON = () => {
		const blob = new Blob([JSON.stringify({ voxels }, null, 2)], { type: 'application/json' })
		saveAs(blob, 'scene.json')
	}

	const importJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		const text = await file.text()
		try {
			const data = JSON.parse(text)
			if (Array.isArray(data.voxels)) setVoxels(data.voxels)
		} catch {}
	}

	const exportGLTF = async () => {
		const blob = await exportVoxelsToGLTF(voxels)
		saveAs(blob, 'scene.gltf')
	}

	return (
		<div className="actions" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
			<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
				<button onClick={exportJSON}>Export JSON</button>
				<label className="button-like">
					<input type="file" accept="application/json" onChange={importJSON} style={{ display: 'none' }} />
					Import JSON
				</label>
				<button onClick={exportGLTF}>Export glTF</button>
			</div>
			<small style={{ opacity: 0.7 }}>Voxels: {voxels.length}</small>
		</div>
	)
}

