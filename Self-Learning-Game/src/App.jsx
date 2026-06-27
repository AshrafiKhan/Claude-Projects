import { useState } from 'react';
import GameShell from './components/GameShell.jsx';
import { usePlayerProfile } from './hooks/usePlayerProfile.js';
import { useChallenge } from './hooks/useChallenge.js';

function Game({ profile, updateProfile, onReset }) {
  const { challenge, feedback, submit, unlockMsg } = useChallenge(profile, updateProfile);

  return (
    <GameShell
      profile={profile}
      challenge={challenge}
      feedback={feedback}
      submit={submit}
      unlockMsg={unlockMsg}
      onReset={onReset}
    />
  );
}

function App() {
  const { profile, updateProfile, reset } = usePlayerProfile();
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    if (window.confirm('Reset all progress?')) {
      reset();
      setResetKey((k) => k + 1);
    }
  };

  return (
    <Game
      key={resetKey}
      profile={profile}
      updateProfile={updateProfile}
      onReset={handleReset}
    />
  );
}

export default App;
