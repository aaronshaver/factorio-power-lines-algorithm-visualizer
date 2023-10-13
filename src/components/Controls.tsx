type ControlsProps = {
    clearGrid: () => void
    MAX_CONNECTIONS: number
    MAX_DISTANCE: number
}

const Controls: React.FC<ControlsProps> = ({ clearGrid, MAX_CONNECTIONS, MAX_DISTANCE }) => {
    return (
        <div className="ControlsWrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <p>Max connections {MAX_CONNECTIONS}; Maximum distance: {MAX_DISTANCE}</p>
            <div className="dropdownWrapper" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <label htmlFor="algorithm" style={{ marginRight: '8px' }}>Algorithm:</label>
                <select id="algorithm" name="algorithm" defaultValue="Maximal" onChange={clearGrid}>
                    <option value="Maximal">Maximal</option>
                    <option value="Maximal (avoid diagonal)">Maximal (avoid diagonal)</option>
                    <option value="Minimal">Minimal</option>
                    <option value="Minimal (avoid diagonal)">Minimal (avoid diagonal)</option>
                </select>
            </div>
            <button onClick={clearGrid} style={{ marginBottom: '10px' }}>Clear</button>
        </div>
    );
};

export default Controls;