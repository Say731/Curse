# Voxel AI

An interactive voxel editor and simple prompt-to-voxel generator built with React, TypeScript, Vite, and Three.js.

## Features
- Editable voxel world on a grid with orbit camera controls
- Color palette and eyedropper-like selection
- Text prompt generator for quick shapes (e.g., "tree", "house", "smile")
- Optional voice input (Web Speech API) to fill the generator prompt
- Export and import:
  - JSON scene format
  - glTF export
- Animated dark theme background

## Getting started

```bash
npm install
npm run dev
```

Open the app at the printed URL (typically `http://localhost:5173`).

## Usage tips
- Left click on the grid to place a voxel in the selected color
- Right click on a voxel position to remove
- Use the color swatches or the color input to change paint color
- Use the prompt generator to scaffold structures; voice button will transcribe into the prompt field
- Export your scene to JSON or glTF from the Export panel

## Project structure
- `src/components/VoxelScene.tsx`: Three.js canvas and voxel rendering
- `src/store.ts`: Zustand store for voxels and UI state
- `src/components/GeneratorPanel.tsx`: Prompt + voice to generate procedural shapes
- `src/components/ExportPanel.tsx`: JSON/glTF export and import
- `src/utils/exporters.ts`: glTF exporter utilities

## License
MIT
