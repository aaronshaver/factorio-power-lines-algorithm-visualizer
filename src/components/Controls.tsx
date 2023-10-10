import React from 'react';

const Controls = ({ }) => {
  return (
    <div className="ControlsWrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
      Algorithm:
      <div className="radioWrapper" style={{ marginTop: '10px' }}>
        <label>
            {/* <input type="radio" value="All" checked={algo === 'All'} onChange={} /> */}
            <input type="radio" value="All" checked />
            All
        </label>
      </div>
      <div className="radioWrapper">
        <label>
            {/* <input type="radio" value="No diagonals" checked={algo === 'No diagonals'} onChange={handleAlgoChange} disabled={isProcessing} /> */}
            <input type="radio" value="No diagonals" />
            No diagonals
        </label>
      </div>
      {/* <button onClick={handlePlay} disabled={isProcessing}>Play</button> */}
      <button>Clear</button>
    </div>
  );
};

export default Controls;