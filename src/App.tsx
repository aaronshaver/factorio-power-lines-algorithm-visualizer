import './App.css';
import Controls from './components/Controls';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App">
      <p><b>Factorio-style Power Line Algorithm Visualizer</b></p>
      <Controls />
      <Canvas />
    </div>
  );
}

export default App;