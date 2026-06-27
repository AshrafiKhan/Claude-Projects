import { useState, useEffect } from 'react';

export default function MemoryChallenge({ challenge, onSubmit }) {
  const [phase, setPhase] = useState('show'); // 'show' | 'recall'
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setPhase('show');
    setSelected([]);
    const t = setTimeout(() => setPhase('recall'), challenge.displayMs);
    return () => clearTimeout(t);
  }, [challenge]);

  const totalCells = challenge.rows * challenge.cols;

  const toggle = (idx) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSubmit = () => {
    const sortedSelected = [...selected].sort((a, b) => a - b).join(',');
    onSubmit(sortedSelected);
  };

  return (
    <div className="challenge-body">
      {phase === 'show' ? (
        <>
          <div className="challenge-label">Remember these cells</div>
          <div
            className="memory-grid"
            style={{ gridTemplateColumns: `repeat(${challenge.cols}, 1fr)` }}
          >
            {Array.from({ length: totalCells }, (_, i) => (
              <div
                key={i}
                className={`memory-cell ${challenge.highlighted.includes(i) ? 'memory-cell-lit' : ''}`}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="challenge-label">Which cells were lit?</div>
          <div
            className="memory-grid"
            style={{ gridTemplateColumns: `repeat(${challenge.cols}, 1fr)` }}
          >
            {Array.from({ length: totalCells }, (_, i) => (
              <div
                key={i}
                className={`memory-cell memory-cell-recall ${selected.includes(i) ? 'memory-cell-selected' : ''}`}
                onClick={() => toggle(i)}
              />
            ))}
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            Confirm
          </button>
        </>
      )}
    </div>
  );
}
