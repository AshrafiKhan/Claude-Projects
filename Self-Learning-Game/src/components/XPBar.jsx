export default function XPBar({ xp }) {
  let pct, label;
  if (xp < 100) {
    pct = xp / 100;
    label = 'Phase 1';
  } else if (xp < 500) {
    pct = (xp - 100) / 400;
    label = 'Phase 2';
  } else {
    pct = Math.min((xp - 500) / 1000, 1);
    label = 'Phase 3';
  }

  return (
    <div className="xp-bar-wrap">
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${pct * 100}%` }} />
      </div>
      <span className="xp-label">{label} · {xp} XP</span>
    </div>
  );
}
