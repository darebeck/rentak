import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { clearUserState, defaultState, loadUserState, saveUserState, type UserState } from './userStore';

type UserContextValue = {
  state: UserState;
  /** Merge a partial change into user state and persist it. */
  update: (patch: Partial<UserState>) => void;
  /** Wipe persisted state and return to first-run defaults. */
  reset: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  // null means "not loaded yet" — distinct from "loaded, and empty"
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadUserState().then((loaded) => {
      if (!cancelled) setState(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<UserContextValue | null>(() => {
    if (!state) return null;
    return {
      state,
      update: (patch) => {
        setState((prev) => {
          if (!prev) return prev;
          const next = { ...prev, ...patch };
          void saveUserState(next);   // fire-and-forget; UI doesn't wait on the disk
          return next;
        });
      },
      reset: () => {
        void clearUserState();
        setState(defaultState);
      },
    };
  }, [state]);

  if (!value) return null;   // hold the tree back until state exists

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
}