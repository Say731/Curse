import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  MessageCircle,
  Bot,
  User,
  Settings,
  Trash2,
  Download
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: string
  isVoice?: boolean
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    // Initialize WebSocket connection
    const connectWebSocket = () => {
      try {
        wsRef.current = new WebSocket('ws://localhost:8000/ws/voice')
        
        wsRef.current.onopen = () => {
          setIsConnected(true)
          toast.success('Voice assistant connected')
        }
        
        wsRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data)
          
          const newMessage: Message = {
            id: Date.now().toString(),
            type: 'assistant',
            content: data.text,
            timestamp: new Date().toISOString(),
            isVoice: data.type === 'voice_response'
          }
          
          setMessages(prev => [...prev, newMessage])
          
          // Speak the response if voice is enabled
          if (voiceEnabled && data.text) {
            speakText(data.text)
          }
        }
        
        wsRef.current.onclose = () => {
          setIsConnected(false)
          toast.error('Voice assistant disconnected')
        }
        
        wsRef.current.onerror = (error) => {
          console.error('WebSocket error:', error)
          toast.error('Connection error')
        }
      } catch (error) {
        console.error('Failed to connect to voice assistant:', error)
        toast.error('Failed to connect to voice assistant')
      }
    }

    connectWebSocket()

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        handleSendMessage(transcript, true)
        setIsListening(false)
      }
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        toast.error('Speech recognition error')
      }
      
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [voiceEnabled])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (text: string, isVoice = false) => {
    if (!text.trim() || !isConnected) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      isVoice
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // Send to WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: isVoice ? 'voice_input' : 'text_input',
        text: text
      }))
    }
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
      toast.success('Listening...')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    if (synthRef.current && voiceEnabled) {
      synthRef.current.cancel() // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      synthRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
    toast.success('Chat cleared')
  }

  const exportChat = () => {
    const chatData = {
      messages,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `voice-chat-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Mic className="w-8 h-8 mr-3 text-primary-600" />
            Voice Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Talk to AI or chat with text • {isConnected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg transition-colors ${
              voiceEnabled 
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                : 'bg-gray-100 text-gray-400 dark:bg-dark-700 dark:text-gray-500'
            }`}
            title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={exportChat}
            disabled={messages.length === 0}
            className="btn-secondary p-2 disabled:opacity-50"
            title="Export chat"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button
            onClick={clearMessages}
            disabled={messages.length === 0}
            className="btn-secondary p-2 text-red-600 dark:text-red-400 disabled:opacity-50"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 card p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">
                Start a conversation by typing or speaking
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Try saying "Hello" or asking a question
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex items-start space-x-3 ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${
                        message.type === 'user' 
                          ? 'text-primary-100' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                      {message.isVoice && (
                        <Mic className={`w-3 h-3 ${
                          message.type === 'user' 
                            ? 'text-primary-200' 
                            : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-dark-600 pt-6">
          <div className="flex items-center space-x-4">
            {/* Voice Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={!isConnected}
              className={`p-3 rounded-full transition-all duration-200 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-primary-600 hover:bg-primary-700 text-white disabled:bg-gray-300 disabled:text-gray-500'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder={isListening ? 'Listening...' : 'Type your message...'}
                disabled={!isConnected || isListening}
                className="input-field pr-12"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || !isConnected}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary-600 hover:text-primary-700 disabled:text-gray-400"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Speaking Indicator */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="p-3 rounded-full bg-green-500 text-white animate-pulse"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Status */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span>
              {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ready'}
            </span>
            <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}