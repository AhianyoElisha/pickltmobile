import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { StorageKeys } from '@/constants/storage-keys';
import { type ThemeColors, darkColors, lightColors } from '@/constants/theme';

export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  /** User preference: 'light' | 'dark' | 'system' */
  theme: ThemePreference;
  /** Resolved to 'light' | 'dark' after applying system preference */
  resolvedTheme: 'light' | 'dark';
  /** Whether the resolved theme is dark */
  isDark: boolean;
  /** The resolved colour palette */
  colors: ThemeColors;
  /** Update and persist the theme preference */
  setTheme: (preference: ThemePreference) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(StorageKeys.THEME_PREFERENCE);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setPreference(stored);
      }
      setHydrated(true);
    })();
  }, []);

  const setTheme = useCallback(async (pref: ThemePreference) => {
    setPreference(pref);
    await AsyncStorage.setItem(StorageKeys.THEME_PREFERENCE, pref);
  }, []);

  const resolvedTheme: 'light' | 'dark' = useMemo(() => {
    if (preference === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return preference;
  }, [preference, systemScheme]);

  const isDark = resolvedTheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: preference, resolvedTheme, isDark, colors, setTheme }),
    [preference, resolvedTheme, isDark, colors, setTheme],
  );

  // Don't render children until theme preference is hydrated to avoid flicker
  if (!hydrated) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within AppThemeProvider');
  return ctx;
}
