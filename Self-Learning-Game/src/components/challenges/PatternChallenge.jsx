import { useState } from 'react';

export default function PatternChallenge({ challenge, onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onSubmit(input.trim());
    setInput('');
  };

  return (
    <div className="challenge-body">
      <div className="challenge-label">What comes next?</div>
      <div className="pattern-sequence">
        {challenge.sequence.map((v, i) => (
          <span key={i} className={`pattern-item ${v === '?' ? 'pattern-gap' : ''}`}>
            {v}
          </span>
        ))}
      </div>
      {challenge.options ? (
        <div className="options-grid">
          {challenge.options.map((opt) => (
            <button key={opt} className="option-btn" onClick={() => onSubmit(opt)}>
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="text-input-form">
          <input
            className="text-answer"
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            placeholder="missing number"
          />
          <button type="submit" className="submit-btn">Check</button>
        </form>
      )}
    </div>
  );
}
