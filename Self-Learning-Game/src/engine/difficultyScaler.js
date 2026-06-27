// ms threshold below which a response is considered "fast"
const SPEED_THRESHOLDS = {
  math: 6000,
  pattern: 8000,
  memory: Infinity, // memory uses timed display phase, not reaction speed
  word: 10000,
};

export function scaleDifficulty(profile, category) {
  const cat = profile.categories[category];
  const results = cat.lastResults;
  if (results.length < 3) return cat.difficulty; // not enough data yet

  const correct = results.filter(Boolean).length;
  const accuracy = correct / results.length;

  const recentTimes = cat.responseTimes.slice(-10);
  const avgTime =
    recentTimes.length > 0
      ? recentTimes.reduce((a, b) => a + b, 0) / recentTimes.length
      : Infinity;

  const threshold = SPEED_THRESHOLDS[category];
  const isFast = avgTime < threshold;

  if (accuracy >= 0.85 && isFast) {
    return Math.min(cat.difficulty + 1, 10);
  } else if (accuracy < 0.6) {
    return Math.max(cat.difficulty - 1, 1);
  }
  return cat.difficulty;
}
