type ControlsProps = {
    clearGrid: () => void
}

const Controls: React.FC<ControlsProps> = ({ clearGrid }) => {
    return (
        <div className="ControlsWrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <div className="dropdownWrapper" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <label htmlFor="algorithm" style={{ marginRight: '8px' }}>Algorithm:</label>
                <select id="algorithm" name="algorithm" defaultValue="Maximal">
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