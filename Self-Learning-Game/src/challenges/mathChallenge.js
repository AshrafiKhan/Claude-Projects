function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wrongOptions(answer, count = 3) {
  const opts = new Set();
  while (opts.size < count) {
    const offset = rand(-5, 5);
    if (offset !== 0) opts.add(answer + offset);
  }
  return [...opts];
}

function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

export function generateMath(difficulty) {
  let a, b, op, answer;

  if (difficulty <= 2) {
    a = rand(1, 10); b = rand(1, 10); op = '+'; answer = a + b;
  } else if (difficulty <= 4) {
    op = Math.random() < 0.5 ? '+' : '-';
    a = rand(1, 20); b = rand(1, op === '-' ? a : 20);
    answer = op === '+' ? a + b : a - b;
  } else if (difficulty <= 6) {
    op = Math.random() < 0.5 ? '+' : '-';
    a = rand(1, 50); b = rand(1, op === '-' ? a : 50);
    answer = op === '+' ? a + b : a - b;
  } else if (difficulty <= 8) {
    const ops = ['+', '-', '*'];
    op = ops[Math.floor(Math.random() * ops.length)];
    if (op === '*') {
      a = rand(2, 12); b = rand(2, 12); answer = a * b;
    } else {
      a = rand(1, 50); b = rand(1, op === '-' ? a : 50);
      answer = op === '+' ? a + b : a - b;
    }
  } else {
    const ops = ['+', '-', '*'];
    op = ops[Math.floor(Math.random() * ops.length)];
    if (op === '*') {
      a = rand(2, 15); b = rand(2, 15); answer = a * b;
    } else {
      a = rand(10, 100); b = rand(1, op === '-' ? a : 100);
      answer = op === '+' ? a + b : a - b;
    }
  }

  const opSymbol = op === '*' ? '×' : op;
  const useMultiChoice = difficulty <= 4;

  return {
    type: 'math',
    question: `${a} ${opSymbol} ${b}`,
    answer,
    options: useMultiChoice ? shuffle([answer, ...wrongOptions(answer)]) : null,
  };
}
