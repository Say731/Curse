import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Cube, 
  Sparkles, 
  FileText, 
  Mic, 
  Plus, 
  TrendingUp, 
  Clock, 
  Users,
  ArrowRight,
  Zap
} from 'lucide-react'

const quickActions = [
  {
    title: 'Create Voxel Model',
    description: 'Start building in 3D',
    icon: Cube,
    href: '/voxel-editor',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'AI Generation',
    description: 'Generate with AI',
    icon: Sparkles,
    href: '/ai-studio',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Process Files',
    description: 'Upload and analyze',
    icon: FileText,
    href: '/file-processor',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Voice Assistant',
    description: 'Talk to AI',
    icon: Mic,
    href: '/voice-assistant',
    color: 'from-orange-500 to-red-500'
  }
]

const recentProjects = [
  { name: 'Voxel Castle', type: '3D Model', lastEdited: '2 hours ago', progress: 85 },
  { name: 'AI Portrait', type: 'Image', lastEdited: '5 hours ago', progress: 100 },
  { name: 'Product Demo', type: 'Video', lastEdited: '1 day ago', progress: 60 },
  { name: 'Voice Narration', type: 'Audio', lastEdited: '2 days ago', progress: 90 }
]

const stats = [
  { label: 'Projects Created', value: '24', icon: Cube, change: '+12%' },
  { label: 'AI Generations', value: '156', icon: Sparkles, change: '+28%' },
  { label: 'Files Processed', value: '89', icon: FileText, change: '+15%' },
  { label: 'Voice Sessions', value: '45', icon: Mic, change: '+8%' }
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Voxel AI
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your creative AI workspace for 3D modeling, multimedia processing, and more.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                to={action.href}
                className="group card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                  <span className="text-sm font-medium">Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            )
          })}
        </div>
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Recent Projects
            </h2>
            <Link
              to="/projects"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              View All
            </Link>
          </div>
          
          <div className="card">
            <div className="divide-y divide-gray-200 dark:divide-dark-700">
              {recentProjects.map((project, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {project.name}
                        </h3>
                        <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                          {project.type}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <Clock className="w-4 h-4 mr-2" />
                        {project.lastEdited}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                    <button className="ml-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Activity
            </h2>
          </div>
          
          <div className="card p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    AI model generated successfully
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 minutes ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Cube className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Voxel model saved
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 hour ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    PDF processed and analyzed
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    3 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}