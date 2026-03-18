import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { StorageKeys } from '@/constants/storage-keys';

interface AuthState {
  token: string | null;
  hasSeenOnboarding: boolean;
  hasConfirmedProfile: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  markOnboardingComplete: () => Promise<void>;
  markProfileConfirmed: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    hasSeenOnboarding: false,
    hasConfirmedProfile: false,
    isLoading: true,
  });

  // Hydrate from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const [token, seenOnboarding, confirmedProfile] = await Promise.all([
        AsyncStorage.getItem(StorageKeys.AUTH_TOKEN),
        AsyncStorage.getItem(StorageKeys.HAS_SEEN_ONBOARDING),
        AsyncStorage.getItem(StorageKeys.HAS_CONFIRMED_PROFILE),
      ]);
      setState({
        token,
        hasSeenOnboarding: seenOnboarding === 'true',
        hasConfirmedProfile: confirmedProfile === 'true',
        isLoading: false,
      });
    })();
  }, []);

  const signIn = useCallback(async (token: string) => {
    await AsyncStorage.setItem(StorageKeys.AUTH_TOKEN, token);
    setState((prev) => ({ ...prev, token }));
  }, []);

  const signOut = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem(StorageKeys.AUTH_TOKEN),
      AsyncStorage.removeItem(StorageKeys.HAS_CONFIRMED_PROFILE),
    ]);
    setState((prev) => ({
      ...prev,
      token: null,
      hasConfirmedProfile: false,
    }));
  }, []);

  const markOnboardingComplete = useCallback(async () => {
    await AsyncStorage.setItem(StorageKeys.HAS_SEEN_ONBOARDING, 'true');
    setState((prev) => ({ ...prev, hasSeenOnboarding: true }));
  }, []);

  const markProfileConfirmed = useCallback(async () => {
    await AsyncStorage.setItem(StorageKeys.HAS_CONFIRMED_PROFILE, 'true');
    setState((prev) => ({ ...prev, hasConfirmedProfile: true }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        markOnboardingComplete,
        markProfileConfirmed,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
