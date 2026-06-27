import { useState, useEffect, useRef, useCallback } from 'react';
import { nextChallenge, recordAnswer } from '../engine/adaptiveEngine.js';
import { getUnlockedCategories } from '../engine/categorySelector.js';
import { saveProfile } from '../engine/playerProfile.js';

export function useChallenge(profile, updateProfile) {
  const [challenge, setChallenge] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [unlockMsg, setUnlockMsg] = useState(null);
  const startTimeRef = useRef(null);
  const profileRef = useRef(profile);
  profileRef.current = profile;

  const spawnNext = useCallback(
    (currentProfile) => {
      const c = nextChallenge(currentProfile);
      const isNew = !currentProfile.seenCategories.includes(c.category);

      if (isNew) {
        // mark seen immediately so it won't show again this session
        const updated = {
          ...currentProfile,
          seenCategories: [...currentProfile.seenCategories, c.category],
        };
        saveProfile(updated);
        updateProfile(updated);

        setUnlockMsg(c.category);
        setTimeout(() => {
          setUnlockMsg(null);
          setChallenge(c);
          startTimeRef.current = Date.now();
        }, 2200);
      } else {
        setChallenge(c);
        startTimeRef.current = Date.now();
      }
    },
    [updateProfile]
  );

  useEffect(() => {
    spawnNext(profileRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = useCallback(
    (answer) => {
      if (!challenge || feedback) return;
      const isCorrect =
        String(answer).trim().toUpperCase() ===
        String(challenge.answer).toUpperCase();
      const elapsed = Date.now() - (startTimeRef.current || Date.now());

      setFeedback(isCorrect ? 'correct' : 'wrong');

      const updated = recordAnswer(
        { ...profileRef.current },
        challenge.category,
        isCorrect,
        elapsed
      );
      updateProfile(updated);

      setTimeout(() => {
        setFeedback(null);
        spawnNext(updated);
      }, 600);
    },
    [challenge, feedback, updateProfile, spawnNext]
  );

  const unlockedCategories = getUnlockedCategories(profileRef.current.xp);

  return { challenge, feedback, submit, unlockMsg, unlockedCategories };
}
