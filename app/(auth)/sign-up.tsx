import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useAuth } from '@/context/auth-context';
import { Colors, FontFamily } from '@/constants/theme';

export default function SignUpScreen() {
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    agreed;

  const handleSignUp = async () => {
    if (!isValid) return;
    // TODO: Replace with real API call
    await signIn('mock_token');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>
              Join us today and unlock endless possibilities. It's quick, easy, and just a step away!
            </Text>
          </View>
        </View>

        {/* ── Fields ── */}
        <View style={styles.fields}>
          <FormField
            label="Full Name"
            placeholder="Enter your name.."
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
          <FormField
            label="Email"
            placeholder="Enter your email address.."
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordBlock}>
            <FormField
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* ── Terms checkbox ── */}
          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setAgreed((v) => !v)}
            activeOpacity={0.8}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && (
                <Ionicons name="checkmark" size={11} color={Colors.white} />
              )}
            </View>
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms and Conditions</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Notice.</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Sign Up button ── */}
        <Button
          label="Sign Up"
          onPress={handleSignUp}
          disabled={!isValid}
        />
      </ScrollView>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?  </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
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
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.textSecondary,
  },

  // Fields
  fields: {
    gap: 16,
  },
  passwordBlock: {
    gap: 8,
  },

  // Terms
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  termsText: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.textSecondary,
  },
  termsLink: {
    color: '#16B364',
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
    color: Colors.textSecondary,
  },
  footerLink: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.primary,
  },
});
