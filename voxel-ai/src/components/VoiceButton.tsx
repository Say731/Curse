import { useEffect, useRef, useState } from 'react'

type Props = {
	onTranscript: (text: string) => void
}

export function VoiceButton({ onTranscript }: Props) {
	const recognitionRef = useRef<SpeechRecognition | null>(null)
	const [available, setAvailable] = useState(false)
	const [listening, setListening] = useState(false)

	useEffect(() => {
		const SpeechRecognitionImpl = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
		if (SpeechRecognitionImpl) {
			const rec: SpeechRecognition = new SpeechRecognitionImpl()
			rec.lang = 'en-US'
			rec.interimResults = false
			rec.continuous = false
			rec.onresult = (e: SpeechRecognitionEvent) => {
				const text = Array.from(e.results)
					.map((r) => r[0].transcript)
					.join(' ')
				onTranscript(text)
				setListening(false)
			}
			rec.onend = () => setListening(false)
			rec.onerror = () => setListening(false)
			recognitionRef.current = rec
			setAvailable(true)
		}
	}, [])

	const start = () => {
		if (!recognitionRef.current) return
		setListening(true)
		recognitionRef.current.start()
	}

	if (!available) return <button disabled title="Voice not supported">🎙️</button>
	return (
		<button onClick={start} aria-pressed={listening} title="Speak prompt">{listening ? '🛑' : '🎙️'}</button>
	)
}

