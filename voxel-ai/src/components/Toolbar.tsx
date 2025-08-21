import { useSceneStore } from '../store'
import cn from 'classnames'
import { useState } from 'react'

export function Toolbar() {
	const { selectedColor, setColor, clear, voxels } = useSceneStore()
	const [hex, setHex] = useState(selectedColor)

	const colors = ['#4cc9f0', '#f72585', '#b5179e', '#7209b7', '#3a0ca3', '#4361ee', '#4895ef', '#4cc9f0', '#90be6d', '#f9c74f', '#f8961e', '#f3722c']

	return (
		<div className="toolbar">
			<div className="color-row">
				{colors.map((c) => (
					<button key={c} className={cn('swatch', { active: c === selectedColor })} style={{ background: c }} onClick={() => { setColor(c); setHex(c) }} />
				))}
				<input
					type="color"
					value={hex}
					onChange={(e) => { setHex(e.target.value); setColor(e.target.value) }}
				/>
			</div>
			<div className="actions">
				<button onClick={() => clear()}>Clear ({voxels.length})</button>
			</div>
		</div>
	)
}

