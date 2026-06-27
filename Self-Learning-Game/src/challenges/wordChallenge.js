function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function scramble(word) {
  const arr = word.split('');
  let result;
  do {
    result = shuffle(arr).join('');
  } while (result === word);
  return result;
}

// grouped by length
const WORDS = {
  3: ['CAT', 'DOG', 'SUN', 'MAP', 'CUP', 'HAT', 'PEN', 'RUN', 'FLY', 'SKY'],
  4: ['BIRD', 'FISH', 'TREE', 'WIND', 'FIRE', 'STAR', 'PLAY', 'JUMP', 'BLUE', 'FROG'],
  5: ['PLANT', 'CLOUD', 'STONE', 'BREAD', 'DANCE', 'FLAME', 'LIGHT', 'CHAIR', 'FLOOR', 'GRAPE'],
  6: ['BRIDGE', 'FOREST', 'PLANET', 'BOTTLE', 'BUTTER', 'GARDEN', 'STREAM', 'MARKET', 'WINTER', 'PUZZLE'],
  7: ['SHELTER', 'CAPTAIN', 'MORNING', 'RAINBOW', 'WINDOWS', 'JOURNEY', 'BLANKET', 'FREEDOM', 'COUNTRY', 'THUNDER'],
  8: ['MOUNTAIN', 'SUNSHINE', 'MUSHROOM', 'CALENDAR', 'NOTEBOOK', 'AIRPLANE', 'SHOULDER', 'PRINCESS', 'TRIANGLE', 'DAUGHTER'],
};

function pickWord(minLen, maxLen) {
  const eligible = [];
  for (let l = minLen; l <= maxLen; l++) {
    if (WORDS[l]) eligible.push(...WORDS[l]);
  }
  return eligible[Math.floor(Math.random() * eligible.length)];
}

export function generateWord(difficulty) {
  let word, hint;
  const useMultiChoice = difficulty <= 3;

  if (difficulty <= 3) {
    word = pickWord(3, 4);
  } else if (difficulty <= 6) {
    word = pickWord(5, 6);
  } else {
    word = pickWord(7, 8);
  }

  let scrambled = scramble(word);

  // at high difficulty remove the first letter hint
  if (difficulty >= 7) {
    hint = null;
  } else {
    hint = word[0];
  }

  let options = null;
  if (useMultiChoice) {
    // generate 3 wrong words of same length
    const pool = (WORDS[word.length] || []).filter((w) => w !== word);
    const wrongs = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    options = [word, ...wrongs].sort(() => Math.random() - 0.5);
  }

  return { type: 'word', scrambled, answer: word, hint, options };
}
