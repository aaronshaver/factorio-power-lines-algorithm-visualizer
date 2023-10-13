import { useState } from 'react'
import './App.css';
import Controls from './components/Controls';
import Canvas from './components/Canvas';
import Grid from './Grid'

function App() {
  const MAX_CONNECTIONS = 5
  const MAX_DISTANCE = 7
  const [grid, setGrid] = useState(new Grid(MAX_CONNECTIONS, MAX_DISTANCE))

  const clearGrid = (algorithm: string = "Maximal") => {
    setGrid(new Grid(MAX_CONNECTIONS, MAX_DISTANCE, algorithm))
  }

  return (
    <div className="App">
      <p><b>Factorio-style Power Line Algorithm Visualizer</b></p>
      <Controls
        clearGrid={clearGrid}
        MAX_CONNECTIONS={MAX_CONNECTIONS}
        MAX_DISTANCE={MAX_DISTANCE}
      />
      <Canvas grid={grid} />
    </div>
  );
}

export default App;