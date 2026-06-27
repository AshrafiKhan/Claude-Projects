export function getUnlockedCategories(xp) {
  if (xp >= 500) return ['math', 'pattern', 'memory', 'word'];
  if (xp >= 100) return ['math', 'pattern'];
  return ['math'];
}

function recentAccuracy(cat) {
  const r = cat.lastResults;
  if (r.length === 0) return 1;
  return r.filter(Boolean).length / r.length;
}

export function selectCategory(profile) {
  const pool = getUnlockedCategories(profile.xp);
  const recent = profile.recentCategories || [];

  const weighted = pool.map((cat) => {
    let w = 1;
    const acc = recentAccuracy(profile.categories[cat]);
    if (acc < 0.7) w *= 3;
    const lastIdx = recent.lastIndexOf(cat);
    if (lastIdx >= recent.length - 2) w *= 0.5;
    return { cat, w };
  });

  const total = weighted.reduce((s, x) => s + x.w, 0);
  let rand = Math.random() * total;
  for (const { cat, w } of weighted) {
    rand -= w;
    if (rand <= 0) return cat;
  }
  return weighted[weighted.length - 1].cat;
}
