import { GeneratorPanel } from './GeneratorPanel'
import { Toolbar } from './Toolbar'
import { useState } from 'react'
import { VoiceButton } from './VoiceButton'

export function Sidebar() {
	const [input, setInput] = useState('tree')
	return (
		<div className="toolbar">
			<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
				<input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe what to build" />
				<VoiceButton onTranscript={(t) => setInput(t)} />
			</div>
			<GeneratorPanel />
			<Toolbar />
		</div>
	)
}

