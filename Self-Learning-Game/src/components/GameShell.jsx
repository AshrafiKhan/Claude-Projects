import XPBar from './XPBar.jsx';
import ChallengeRenderer from './ChallengeRenderer.jsx';

export default function GameShell({ profile, challenge, feedback, submit, unlockMsg, onReset }) {
  return (
    <div className="game-shell">
      <header className="game-header">
        <span className="game-title">adapt</span>
        <span className="streak-display">
          {profile.streak > 0 ? `🔥 ${profile.streak}` : '—'}
        </span>
      </header>
      <XPBar xp={profile.xp} />
      <main className="game-main">
        <ChallengeRenderer
          challenge={challenge}
          feedback={feedback}
          submit={submit}
          unlockMsg={unlockMsg}
        />
      </main>
      <footer className="game-footer">
        <button className="reset-btn" onClick={onReset}>reset progress</button>
      </footer>
    </div>
  );
}
