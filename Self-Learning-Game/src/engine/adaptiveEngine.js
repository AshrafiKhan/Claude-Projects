import { saveProfile } from './playerProfile.js';
import { scaleDifficulty } from './difficultyScaler.js';
import { selectCategory } from './categorySelector.js';
import { generateMath } from '../challenges/mathChallenge.js';
import { generatePattern } from '../challenges/patternChallenge.js';
import { generateMemory } from '../challenges/memoryChallenge.js';
import { generateWord } from '../challenges/wordChallenge.js';

const generators = {
  math: generateMath,
  pattern: generatePattern,
  memory: generateMemory,
  word: generateWord,
};

export function nextChallenge(profile) {
  const category = selectCategory(profile);
  const difficulty = profile.categories[category].difficulty;
  const challenge = generators[category](difficulty);
  return { ...challenge, category };
}

export function recordAnswer(profile, category, isCorrect, responseTimeMs) {
  const cat = profile.categories[category];

  // update results
  cat.lastResults = [...cat.lastResults, isCorrect].slice(-10);
  cat.responseTimes = [...cat.responseTimes, responseTimeMs].slice(-50);

  // adjust difficulty
  cat.difficulty = scaleDifficulty(profile, category);

  // award XP
  if (isCorrect) {
    profile.xp += 10 + cat.difficulty * 2;
  }

  // streak
  profile.streak = isCorrect ? profile.streak + 1 : 0;

  // track recent categories for rotation
  profile.recentCategories = [...(profile.recentCategories || []), category].slice(-5);

  // track seen categories for unlock announcements
  if (!profile.seenCategories.includes(category)) {
    profile.seenCategories = [...profile.seenCategories, category];
  }

  saveProfile(profile);
  return { ...profile };
}
