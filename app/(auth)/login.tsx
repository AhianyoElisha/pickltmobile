import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GoogleIcon } from '@/components/ui/google-icon';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useAuth } from '@/context/auth-context';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

type LoginMethod = 'email' | 'phone';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { colors, isDark } = useAppTheme();
  const [method, setMethod] = useState<LoginMethod>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email.trim().length > 0 && password.length > 0;

  const handleLogin = async () => {
    if (!isValid) return;
    // TODO: Replace with real API call
    await signIn('mock_token');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Welcome Back!</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Enter your registered account to sign in</Text>
          </View>
        </View>

        {/* ── Segmented control: Email / Phone Number ── */}
        <View style={styles.segmented}>
          <TouchableOpacity
            style={[styles.segment, method === 'email' && styles.segmentActive]}
            onPress={() => setMethod('email')}
            activeOpacity={0.8}>
            <Text style={[styles.segmentText, method === 'email' && { color: Colors.textPrimary }]}>
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segment, method === 'phone' && styles.segmentActive]}
            onPress={() => setMethod('phone')}
            activeOpacity={0.8}>
            <Text style={[styles.segmentText, method === 'phone' && { color: Colors.textPrimary }]}>
              Phone Number
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Fields ── */}
        <View style={styles.fields}>
          {method === 'email' ? (
            <FormField
              label="Email"
              placeholder="Enter your email address.."
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          ) : (
            <FormField
              label="Phone Number"
              placeholder="Enter your phone number.."
              keyboardType="phone-pad"
              value={email}
              onChangeText={setEmail}
            />
          )}

          <View style={styles.passwordBlock}>
            <FormField
              label="Password"
              placeholder="Enter your password.."
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => router.push('/(auth)/forgot-password')}
              style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Sign In button ── */}
        <Button
          label="Sign In"
          onPress={handleLogin}
          disabled={!isValid}
        />

        {/* ── Or continue with ── */}
        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: colors.borderLight }]} />
          <Text style={[styles.dividerText, { color: colors.textSecondary }]}>Or continue with</Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.borderLight }]} />
        </View>

        {/* ── Google button ── */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={[styles.googleBtn, { borderColor: colors.borderDark, backgroundColor: colors.surface }]} activeOpacity={0.8}>
            <GoogleIcon size={24} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')} activeOpacity={0.7}>
          <Text style={styles.footerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: undefined,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 24,
  },

  // Header
  header: {
    gap: 12,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    gap: 6,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 24,
    lineHeight: 36,
    color: undefined,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: undefined,
  },

  // Segmented control
  segmented: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 6,
    gap: 16,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: Colors.white,
  },
  segmentText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.white,
    textAlign: 'center',
  },
  segmentTextActive: {
    color: undefined,
  },

  // Fields
  fields: {
    gap: 16,
  },
  passwordBlock: {
    gap: 8,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.primary,
    textAlign: 'right',
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: undefined,
  },
  dividerText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: undefined,
  },

  // Google
  socialRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleBtn: {
    width: 56,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: undefined,
    backgroundColor: undefined,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 28,
    paddingTop: 8,
  },
  footerText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
    color: undefined,
  },
  footerLink: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.primary,
  },
});
