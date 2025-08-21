import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { useThemeStore } from './store/themeStore'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import VoxelEditor from './pages/VoxelEditor'
import AIStudio from './pages/AIStudio'
import FileProcessor from './pages/FileProcessor'
import VoiceAssistant from './pages/VoiceAssistant'
import Preview from './pages/Preview'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const { user, isLoading, initializeAuth } = useAuthStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark')
    initializeAuth()
  }, [theme, initializeAuth])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
        <Route path="/" element={<Home />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={user ? <Layout><Dashboard /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/voxel-editor" element={user ? <Layout><VoxelEditor /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/ai-studio" element={user ? <Layout><AIStudio /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/file-processor" element={user ? <Layout><FileProcessor /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/voice-assistant" element={user ? <Layout><VoiceAssistant /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/preview/:type/:id" element={user ? <Layout><Preview /></Layout> : <Navigate to="/login" replace />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App