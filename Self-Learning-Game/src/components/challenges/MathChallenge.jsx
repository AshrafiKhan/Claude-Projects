import { useState } from 'react';

export default function MathChallenge({ challenge, onSubmit }) {
  const [input, setInput] = useState('');

  const handleOption = (opt) => {
    onSubmit(opt);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onSubmit(input.trim());
    setInput('');
  };

  return (
    <div className="challenge-body">
      <div className="challenge-question">{challenge.question} = ?</div>
      {challenge.options ? (
        <div className="options-grid">
          {challenge.options.map((opt) => (
            <button key={opt} className="option-btn" onClick={() => handleOption(opt)}>
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
            placeholder="your answer"
          />
          <button type="submit" className="submit-btn">Check</button>
        </form>
      )}
    </div>
  );
}
