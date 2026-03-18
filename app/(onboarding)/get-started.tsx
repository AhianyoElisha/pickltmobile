import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GoogleIcon } from '@/components/ui/google-icon';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { Colors, FontFamily, TextStyles } from '@/constants/theme';

const logo = require('@/assets/images/logo.png');

export default function GetStartedScreen() {
  const { markOnboardingComplete } = useAuth();

  const handleSignUpEmail = async () => {
    await markOnboardingComplete();
    router.push('/(auth)/sign-up');
  };

  const handleSignUpGoogle = async () => {
    await markOnboardingComplete();
    // TODO: Google OAuth
  };

  const handleSignIn = async () => {
    await markOnboardingComplete();
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Centre block: logo + heading + buttons */}
      <View style={styles.centreBlock}>
        {/* Logo */}
        <View style={styles.logoWrap}>
          <Image source={logo} style={styles.logo} contentFit="contain" />
        </View>

        {/* Heading text */}
        <View style={styles.textBlock}>
          <Text style={styles.heading}>Lets Get Started</Text>
          <Text style={styles.subheading}>A stress-free move, every time.</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsBlock}>
          <Button
            label="Sign Up Email"
            variant="primary"
            onPress={handleSignUpEmail}
          />

          <Text style={styles.orText}>Or Use Instant Sign Up</Text>

          <Button
            label="Sign Up with Google"
            variant="outline"
            leftIcon={<GoogleIcon size={20} />}
            onPress={handleSignUpGoogle}
          />
        </View>
      </View>

      {/* Bottom: Already have an account */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already Have an Account? </Text>
        <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
          <Text style={styles.footerLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Centre block — vertically centred in available space
  centreBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 36,
  },

  // Logo
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 147,
    height: 49,
  },

  // Text
  textBlock: {
    width: '100%',
    alignItems: 'center',
    gap: 0,
  },
  heading: {
    ...TextStyles.h4,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subheading: {
    ...TextStyles.bodyMediumRegular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // Buttons
  buttonsBlock: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  orText: {
    ...TextStyles.bodySmallRegular,
    color: Colors.textPrimary,
    textAlign: 'center',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
    paddingTop: 8,
  },
  footerText: {
    ...TextStyles.bodySmallMedium,
    color: Colors.textSecondary,
  },
  footerLink: {
    ...TextStyles.bodySmallMedium,
    color: Colors.primary,
  },
});
