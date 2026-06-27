import { useState, useCallback } from 'react';
import { loadProfile, saveProfile, resetProfile } from '../engine/playerProfile.js';

export function usePlayerProfile() {
  const [profile, setProfile] = useState(() => loadProfile());

  const updateProfile = useCallback((updated) => {
    saveProfile(updated);
    setProfile({ ...updated });
  }, []);

  const reset = useCallback(() => {
    const fresh = resetProfile();
    setProfile(fresh);
  }, []);

  return { profile, updateProfile, reset };
}
