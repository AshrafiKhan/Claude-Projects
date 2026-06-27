const STORAGE_KEY = 'adaptive_game_profile';

const defaultCategory = () => ({
  difficulty: 1,
  lastResults: [],
  responseTimes: [],
});

export const defaultProfile = () => ({
  xp: 0,
  streak: 0,
  seenCategories: ['math'],
  recentCategories: [],
  categories: {
    math: defaultCategory(),
    pattern: defaultCategory(),
    memory: defaultCategory(),
    word: defaultCategory(),
  },
});

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile();
    const parsed = JSON.parse(raw);
    // merge in any missing keys from defaults
    const def = defaultProfile();
    return {
      ...def,
      ...parsed,
      categories: {
        ...def.categories,
        ...parsed.categories,
      },
    };
  } catch {
    return defaultProfile();
  }
}

export function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function resetProfile() {
  localStorage.removeItem(STORAGE_KEY);
  return defaultProfile();
}
