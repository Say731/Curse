import './index.css'
import { VoxelScene } from './components/VoxelScene'
import { GeneratorPanel } from './components/GeneratorPanel'
import { ExportPanel } from './components/ExportPanel'

function App() {
  return (
    <div className="app-root">
      <div className="header">Voxel AI</div>
      <div className="content">
        <div className="canvas-wrap">
          <VoxelScene />
        </div>
        <div className="toolbar">
          <GeneratorPanel />
          <ExportPanel />
        </div>
      </div>
    </div>
  )
}

export default App
