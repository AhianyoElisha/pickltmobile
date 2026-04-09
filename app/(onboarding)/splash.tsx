import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

const logoLight = require('@/assets/images/logo.png');
const logoDark = require('@/assets/images/logoDark.png');

export default function SplashScreen() {
  const { colors, isDark } = useAppTheme();
  const logo = isDark ? logoDark : logoLight;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(onboarding)/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={styles.logoGroup}>
        <Image source={logo} style={styles.logo} contentFit="contain" />
        <Text style={[styles.tagline, { color: colors.textPrimary }]}>A stress-free move, every time.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGroup: {
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 147,
    height: 49,
  },
  tagline: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,

    textAlign: 'center',
    width: 205,
  },
});
