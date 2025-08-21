import * as THREE from 'three'
import { GLTFExporter } from 'three-stdlib'
import type { Voxel } from '../store'

export async function exportVoxelsToGLTF(voxels: Voxel[]): Promise<Blob> {
	const scene = new THREE.Scene()
	const colorToInstances = new Map<string, THREE.InstancedMesh>()
	const box = new THREE.BoxGeometry(1, 1, 1)
	for (const v of voxels) {
		let instanced = colorToInstances.get(v.color)
		if (!instanced) {
			instanced = new THREE.InstancedMesh(
				box,
				new THREE.MeshStandardMaterial({ color: new THREE.Color(v.color) }),
				voxels.length
			)
			instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
			colorToInstances.set(v.color, instanced)
			scene.add(instanced)
		}
		const index = (instanced.count = instanced.count + 1) - 1
		const matrix = new THREE.Matrix4().makeTranslation(
			v.position[0],
			v.position[1],
			v.position[2]
		)
		instanced.setMatrixAt(index, matrix)
	}

	const exporter = new GLTFExporter()
	return new Promise((resolve, reject) => {
		exporter.parse(
			scene,
			(result) => {
				if (result instanceof ArrayBuffer) {
					resolve(new Blob([result], { type: 'model/gltf-binary' }))
				} else {
					resolve(new Blob([JSON.stringify(result)], { type: 'model/gltf+json' }))
				}
			},
			{ binary: false }
		)
	})
}

