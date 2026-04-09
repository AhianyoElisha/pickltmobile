import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { RadioOptionCard } from '@/components/ui/radio-option-card';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

type ResetMethod = 'email' | 'phone';

export default function SelectOtpMethodScreen() {
  const [method, setMethod] = useState<ResetMethod>('email');
  const { colors, isDark } = useAppTheme();

  const handleContinue = () => {
    router.push('/(auth)/forgot-password/enter-otp');
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
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Forgot Password</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Select verification method and we will send verification code
            </Text>
          </View>
        </View>

        {/* ── Method options ── */}
        <View style={styles.options}>
          <RadioOptionCard
            iconName="mail-outline"
            title="Email"
            maskedValue="********@mail.com"
            selected={method === 'email'}
            onPress={() => setMethod('email')}
          />
          <RadioOptionCard
            iconName="call-outline"
            title="Phone Number"
            maskedValue="**** **** **** 0101"
            selected={method === 'phone'}
            onPress={() => setMethod('phone')}
          />
        </View>

        {/* ── Continue button ── */}
        <Button label="Send Code" onPress={handleContinue} />
      </ScrollView>
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
  options: {
    gap: 16,
  },
});
