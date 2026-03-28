import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack, router, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/context/auth-context';
import { Colors } from '@/constants/theme';

// Matches the app background so screens never flash white during transitions
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.background,
  },
};

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isLoading, token, hasSeenOnboarding, hasConfirmedProfile } = useAuth();
  const segments = useSegments();

  const [fontsLoaded] = useFonts({
    'SFProDisplay-Regular': require('@/assets/fonts/SF-Pro-Display-Regular.otf'),
    'SFProDisplay-Medium': require('@/assets/fonts/SF-Pro-Display-Medium.otf'),
    'SFProDisplay-Semibold': require('@/assets/fonts/SF-Pro-Display-Semibold.otf'),
    'SFProDisplay-Bold': require('@/assets/fonts/SF-Pro-Display-Bold.otf'),
    'SFProDisplay-Heavy': require('@/assets/fonts/SF-Pro-Display-Heavy.otf'),
  });

  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    SplashScreen.hideAsync();

    const inOnboarding = segments[0] === '(onboarding)';
    const inAuth = segments[0] === '(auth)';
    const onProfileConfirmation = segments[0] === 'profile-confirmation';

    if (token === null) {
      if (!hasSeenOnboarding && !inOnboarding) {
        router.replace('/(onboarding)/splash');
      } else if (hasSeenOnboarding && !inAuth && !inOnboarding) {
        // !inOnboarding allows get-started to remain in the onboarding group
        // while the user decides to sign up or sign in
        router.replace('/(auth)/login');
      }
    } else {
      if (!hasConfirmedProfile && !onProfileConfirmation) {
        router.replace('/profile-confirmation');
      } else if (hasConfirmedProfile && (inOnboarding || inAuth)) {
        // Only redirect to tabs when coming from unauthenticated flows —
        // not when navigating to app screens like instant-results, move-details, etc.
        router.replace('/(tabs)');
      }
    }
  }, [isLoading, fontsLoaded, token, hasSeenOnboarding, hasConfirmedProfile, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Native slide-from-right for every push — feels intentional, not choppy
        animation: 'slide_from_right',
        // Match app background so there is never a white flash mid-transition
        contentStyle: { backgroundColor: Colors.background },
        // Allow swipe-back on iOS; gesture tracks the animation in real time
        gestureEnabled: true,
      }}>
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="profile-confirmation"
        options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen name="move-details" />
      <Stack.Screen
        name="instant/pickup-information"
        options={{
          presentation: 'transparentModal',
          animation: 'none',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="instant/add-move-photos" />
      <Stack.Screen name="instant/select-mover" />
      <Stack.Screen name="instant/track-move" />
      <Stack.Screen
        name="scheduled/pickup-information"
        options={{
          presentation: 'transparentModal',
          animation: 'none',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="shared/call"
        options={{
          presentation: 'transparentModal',
          animation: 'none',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="shared/message"
        options={{
          presentation: 'transparentModal',
          animation: 'none',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="scheduled-results" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider value={AppTheme}>
        <RootNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
