function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sample(arr, n) {
  return arr.slice().sort(() => Math.random() - 0.5).slice(0, n);
}

export function generateMemory(difficulty) {
  let rows, cols, highlightCount, displayMs;

  if (difficulty <= 2) {
    rows = 2; cols = 2; highlightCount = 1; displayMs = 2000;
  } else if (difficulty <= 5) {
    rows = 3; cols = 3; highlightCount = rand(2, 3); displayMs = 1500;
  } else if (difficulty <= 8) {
    rows = 3; cols = 3; highlightCount = rand(4, 5); displayMs = 1000;
  } else {
    rows = 4; cols = 4; highlightCount = rand(4, 6); displayMs = 800;
  }

  const total = rows * cols;
  const allIndices = Array.from({ length: total }, (_, i) => i);
  const highlighted = sample(allIndices, highlightCount).sort((a, b) => a - b);

  const answer = highlighted.join(',');
  return { type: 'memory', rows, cols, highlighted, displayMs, answer };
}
