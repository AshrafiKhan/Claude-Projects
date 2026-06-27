import { useState } from 'react';

export default function WordChallenge({ challenge, onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onSubmit(input.trim().toUpperCase());
    setInput('');
  };

  return (
    <div className="challenge-body">
      <div className="challenge-label">Unscramble the word</div>
      <div className="word-scrambled">{challenge.scrambled}</div>
      {challenge.hint && (
        <div className="word-hint">Starts with: <strong>{challenge.hint}</strong></div>
      )}
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
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            placeholder="type the word"
          />
          <button type="submit" className="submit-btn">Check</button>
        </form>
      )}
    </div>
  );
}
