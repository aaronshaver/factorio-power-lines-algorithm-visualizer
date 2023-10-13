import { useState } from 'react'

type ControlsProps = {
    clearGrid: (algorithm: string) => void
    MAX_CONNECTIONS: number
    MAX_DISTANCE: number
}

const Controls: React.FC<ControlsProps> = ({ clearGrid, MAX_CONNECTIONS, MAX_DISTANCE }) => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Maximal")

    return (
        <div className="ControlsWrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <p>Max connections {MAX_CONNECTIONS}; Maximum distance: {MAX_DISTANCE}</p>
            <div className="dropdownWrapper" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <label htmlFor="algorithm" style={{ marginRight: '8px' }}>Algorithm:</label>
                <select id="algorithm" name="algorithm" defaultValue="Maximal" onChange={(e) => {setSelectedAlgorithm(e.target.value); clearGrid(e.target.value)}}>
                    <option value="Maximal">Maximal</option>
                    <option value="Maximal (avoid diagonals)">Maximal (avoid diagonals)</option>
                    <option value="Minimal">Minimal</option>
                    <option value="Minimal (avoid diagonals)">Minimal (avoid diagonals)</option>
                </select>
            </div>
            <button onClick={(e) => clearGrid(selectedAlgorithm)} style={{ marginBottom: '10px' }}>Clear</button>
        </div>
    );
};

export default Controls;