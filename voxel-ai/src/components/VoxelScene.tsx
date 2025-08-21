import { useMemo, useRef, useState } from 'react'
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { useSceneStore } from '../store'
import { VoxelCube } from './VoxelCube'

const GRID_SIZE = 32

function CursorHelper() {
	const mesh = useRef<THREE.Mesh>(null)
	useFrame(({ camera }) => {
		if (mesh.current) {
			mesh.current.lookAt(camera.position)
		}
	})
	return (
		<mesh ref={mesh}>
			<boxGeometry args={[1.02, 1.02, 1.02]} />
			<meshBasicMaterial wireframe color="#ffffff" opacity={0.35} transparent />
		</mesh>
	)
}

function SceneContent() {
	const { voxels, addVoxel, removeVoxel, selectedColor } = useSceneStore()
	const [hovered, setHovered] = useState<[number, number, number] | null>(null)

	const voxelMeshes = useMemo(
		() =>
			voxels.map(({ position, color }) => (
				<VoxelCube
					key={position.join(',')}
					position={position}
					color={color}
				/>
			)),
		[voxels]
	)

	const handlePointer = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation()
		const point = e.point.clone().floor().addScalar(0.5)
		const position: [number, number, number] = [
			Math.max(-GRID_SIZE / 2, Math.min(GRID_SIZE / 2 - 1, point.x)),
			Math.max(0, Math.min(GRID_SIZE - 1, point.y)),
			Math.max(-GRID_SIZE / 2, Math.min(GRID_SIZE / 2 - 1, point.z)),
		] as unknown as [number, number, number]
		setHovered(position)
	}

	const onClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation()
		const point = e.point.clone().floor().addScalar(0.5)
		const pos: [number, number, number] = [
			Math.round(point.x),
			Math.max(0, Math.round(point.y)),
			Math.round(point.z),
		]
		if (e.nativeEvent.button === 2) {
			removeVoxel(pos)
		} else {
			addVoxel(pos, selectedColor)
		}
	}

	return (
		<group>
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 10, 2]} intensity={1} />
			<Grid args={[GRID_SIZE, GRID_SIZE]} position={[0, -0.5, 0]} infiniteGrid />
			<mesh
				onPointerMove={handlePointer}
				onClick={onClick}
				onContextMenu={(e) => e.preventDefault()}
			>
				<boxGeometry args={[GRID_SIZE, 0.5, GRID_SIZE]} />
				<meshBasicMaterial visible={false} />
			</mesh>
			{hovered && (
				<group position={hovered}>
					<CursorHelper />
				</group>
			)}
			{voxelMeshes}
			<OrbitControls makeDefault enablePan enableRotate enableZoom />
		</group>
	)
}

export function VoxelScene() {
	return (
		<Canvas
			shadows
			camera={{ position: [12, 12, 12], fov: 50 }}
			style={{ width: '100%', height: '100%' }}
		>
			<color attach="background" args={["#0b0f14"]} />
			<SceneContent />
		</Canvas>
	)
}

