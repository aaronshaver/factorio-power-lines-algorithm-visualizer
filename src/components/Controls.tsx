const Controls = ({ }) => {
  return (
    <div className="ControlsWrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
      Algorithm:
      <div className="radioWrapper" style={{ marginTop: '10px' }}>
        <label>
            {/* <input type="radio" value="All" checked={algo === 'All'} onChange={} /> */}
            <input type="radio" value="All" />
            All
        </label>
      </div>
      <div className="radioWrapper">
        <label>
            {/* <input type="radio" value="No diagonals" checked={algo === 'No diagonals'} onChange={handleAlgoChange} disabled={isProcessing} /> */}
            <input type="radio" value="Maximum without diagonals" />
            Maximum without diagonals
        </label>
      </div>
      <div className="radioWrapper">
        <label>
            {/* <input type="radio" value="No diagonals" checked={algo === 'No diagonals'} onChange={handleAlgoChange} disabled={isProcessing} /> */}
            <input type="radio" value="Minimum; prefer no diagonals" />
            Minimum; prefer no diagonals
        </label>
      </div>
      {/* <button onClick={handlePlay} disabled={isProcessing}>Play</button> */}
      <button style={{ marginBottom: '10px' }}>Clear</button>
    </div>
  );
};

export default Controls;