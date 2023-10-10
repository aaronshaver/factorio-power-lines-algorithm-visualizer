import { useState } from 'react'
import './App.css';
import Controls from './components/Controls';
import Canvas from './components/Canvas';
import Grid from './Grid'

function App() {
  const [grid, setGrid] = useState(new Grid())

  const clearGrid = () => {
    grid.clearPoles()
    setGrid(new Grid())
  }

  return (
    <div className="App">
      <p><b>Factorio-style Power Line Algorithm Visualizer</b></p>
      <Controls clearGrid={clearGrid} />
      <Canvas grid={grid} />
    </div>
  );
}

export default App;