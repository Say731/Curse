import { memo } from 'react'
import { Box } from '@react-three/drei'
import { MeshProps } from '@react-three/fiber'

type Props = MeshProps & {
	color: string
}

const VoxelCubeImpl = ({ color, ...props }: Props) => {
	return (
		<Box args={[1, 1, 1]} {...props}>
			<meshStandardMaterial color={color} />
		</Box>
	)
}

export const VoxelCube = memo(VoxelCubeImpl)

