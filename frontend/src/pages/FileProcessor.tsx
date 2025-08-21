import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Upload, 
  File, 
  Image, 
  Video, 
  Music, 
  Archive,
  CheckCircle,
  AlertCircle,
  X,
  Download,
  Eye,
  Trash2
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface ProcessedFile {
  id: string
  name: string
  type: string
  size: number
  status: 'processing' | 'completed' | 'error'
  result?: any
  uploadedAt: string
}

const fileTypeIcons = {
  'application/pdf': FileText,
  'application/vnd.ms-powerpoint': FileText,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': FileText,
  'image/': Image,
  'video/': Video,
  'audio/': Music,
  'application/zip': Archive,
  'default': File
}

const getFileIcon = (mimeType: string) => {
  for (const [type, icon] of Object.entries(fileTypeIcons)) {
    if (mimeType.startsWith(type)) {
      return icon
    }
  }
  return fileTypeIcons.default
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function FileProcessor() {
  const [files, setFiles] = useState<ProcessedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true)
    
    for (const file of acceptedFiles) {
      const fileId = Date.now().toString() + Math.random().toString(36)
      const newFile: ProcessedFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        status: 'processing',
        uploadedAt: new Date().toISOString()
      }
      
      setFiles(prev => [newFile, ...prev])
      
      try {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await axios.post('/upload/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, status: 'completed', result: response.data }
              : f
          )
        )
        
        toast.success(`${file.name} processed successfully`)
      } catch (error) {
        console.error('Upload error:', error)
        
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, status: 'error' }
              : f
          )
        )
        
        toast.error(`Failed to process ${file.name}`)
      }
    }
    
    setIsUploading(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv'],
      'audio/*': ['.mp3', '.wav', '.flac', '.aac'],
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const clearAll = () => {
    setFiles([])
  }

  const renderFileResult = (file: ProcessedFile) => {
    if (file.status === 'processing') {
      return (
        <div className="flex items-center text-blue-600 dark:text-blue-400">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
          <span className="text-sm">Processing...</span>
        </div>
      )
    }
    
    if (file.status === 'error') {
      return (
        <div className="flex items-center text-red-600 dark:text-red-400">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">Processing failed</span>
        </div>
      )
    }
    
    return (
      <div className="space-y-2">
        <div className="flex items-center text-green-600 dark:text-green-400">
          <CheckCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">Processed successfully</span>
        </div>
        
        {file.result && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {file.result.file_info?.dimensions && (
              <p>Dimensions: {file.result.file_info.dimensions[0]} × {file.result.file_info.dimensions[1]}</p>
            )}
            {file.result.file_info?.type && (
              <p>Type: {file.result.file_info.type}</p>
            )}
          </div>
        )}
        
        <div className="flex space-x-2">
          <button className="btn-secondary text-xs px-2 py-1">
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </button>
          <button className="btn-secondary text-xs px-2 py-1">
            <Download className="w-3 h-3 mr-1" />
            Download
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="w-8 h-8 mr-3 text-primary-600" />
            File Processor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload and process PDFs, presentations, images, videos, and audio files
          </p>
        </div>
        
        {files.length > 0 && (
          <button
            onClick={clearAll}
            className="btn-secondary flex items-center space-x-2 text-red-600 dark:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Upload Area */}
      <div className="card p-8">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 cursor-pointer
            ${isDragActive 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <motion.div
            animate={{ scale: isDragActive ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            
            {isDragActive ? (
              <p className="text-primary-600 dark:text-primary-400 font-medium">
                Drop files here to process them
              </p>
            ) : (
              <div>
                <p className="text-gray-900 dark:text-white font-medium mb-2">
                  Drag & drop files here, or click to select
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Supports PDF, PPT, images, videos, audio, and archives (max 100MB)
                </p>
              </div>
            )}
          </motion.div>
        </div>
        
        {isUploading && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center text-blue-600 dark:text-blue-400">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
              <span>Uploading files...</span>
            </div>
          </div>
        )}
      </div>

      {/* Supported File Types */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Supported File Types
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <FileText className="w-8 h-8 text-red-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Documents</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">PDF, PPT, PPTX</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <Image className="w-8 h-8 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Images</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG, GIF, WebP</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <Video className="w-8 h-8 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Videos</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">MP4, AVI, MOV</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <Music className="w-8 h-8 text-purple-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Audio</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">MP3, WAV, FLAC</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <Archive className="w-8 h-8 text-orange-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Archives</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">ZIP, RAR</p>
            </div>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Processed Files ({files.length})
          </h3>
          
          <div className="space-y-4">
            <AnimatePresence>
              {files.map((file) => {
                const FileIcon = getFileIcon(file.type)
                
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-white dark:bg-dark-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleString()}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => removeFile(file.id)}
                          className="ml-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="mt-3">
                        {renderFileResult(file)}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}