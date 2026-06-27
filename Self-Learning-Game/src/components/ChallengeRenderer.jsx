import MathChallenge from './challenges/MathChallenge.jsx';
import PatternChallenge from './challenges/PatternChallenge.jsx';
import MemoryChallenge from './challenges/MemoryChallenge.jsx';
import WordChallenge from './challenges/WordChallenge.jsx';

const CATEGORY_ICONS = {
  math: '🔢',
  pattern: '🔗',
  memory: '🧠',
  word: '📝',
};

const CATEGORY_LABELS = {
  math: 'Math',
  pattern: 'Pattern',
  memory: 'Memory',
  word: 'Word',
};

const UNLOCK_MESSAGES = {
  pattern: 'Pattern Sequences Unlocked!',
  memory: 'Memory Grid Unlocked!',
  word: 'Word Scramble Unlocked!',
};

export default function ChallengeRenderer({ challenge, feedback, submit, unlockMsg }) {
  if (unlockMsg) {
    return (
      <div className="unlock-msg">
        <div className="unlock-icon">{CATEGORY_ICONS[unlockMsg]}</div>
        <div>{UNLOCK_MESSAGES[unlockMsg]}</div>
      </div>
    );
  }

  if (!challenge) return <div className="loading">Loading...</div>;

  const props = { challenge, onSubmit: submit };

  return (
    <div className="challenge-card">
      <div className="challenge-type-label">
        {CATEGORY_ICONS[challenge.category]} {CATEGORY_LABELS[challenge.category]}
      </div>
      <div className={`challenge-content ${feedback ? `feedback-${feedback}` : ''}`}>
        {challenge.type === 'math' && <MathChallenge {...props} />}
        {challenge.type === 'pattern' && <PatternChallenge {...props} />}
        {challenge.type === 'memory' && <MemoryChallenge {...props} />}
        {challenge.type === 'word' && <WordChallenge {...props} />}
      </div>
    </div>
  );
}
