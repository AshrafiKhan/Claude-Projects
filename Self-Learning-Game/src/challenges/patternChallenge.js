function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

export function generatePattern(difficulty) {
  let length, stepMin, stepMax, gapPosition, useMultiChoice;

  if (difficulty <= 3) {
    length = 4; stepMin = 1; stepMax = 5; gapPosition = length - 1; useMultiChoice = true;
  } else if (difficulty <= 6) {
    length = 5; stepMin = 1; stepMax = 10; gapPosition = rand(1, length - 2); useMultiChoice = false;
  } else {
    length = 6; stepMin = 1; stepMax = 20; gapPosition = rand(0, length - 1); useMultiChoice = false;
  }

  const step = rand(stepMin, stepMax);
  const start = rand(1, 20);
  const full = Array.from({ length }, (_, i) => start + i * step);
  const answer = full[gapPosition];
  const sequence = full.map((v, i) => (i === gapPosition ? '?' : v));

  const options = useMultiChoice
    ? shuffle([answer, answer + step, answer - step, answer + step * 2].filter((v, i, a) => a.indexOf(v) === i))
    : null;

  return { type: 'pattern', sequence, answer, options };
}
