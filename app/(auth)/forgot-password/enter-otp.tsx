import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { OtpInput } from '@/components/ui/otp-input';
import { Colors, FontFamily } from '@/constants/theme';

const OTP_LENGTH = 4;
const RESEND_SECONDS = 48;

export default function EnterOtpScreen() {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startCountdown();
    return () => clearInterval(intervalRef.current ?? undefined);
  }, []);

  const startCountdown = () => {
    setCanResend(false);
    setCountdown(RESEND_SECONDS);
    clearInterval(intervalRef.current ?? undefined);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current ?? undefined);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp('');
    startCountdown();
    // TODO: trigger API resend
  };

  const handleContinue = () => {
    if (otp.length < OTP_LENGTH) return;
    router.push('/(auth)/forgot-password/set-new-password');
  };

  const mm = String(Math.floor(countdown / 60)).padStart(2, '0');
  const ss = String(countdown % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Verify Code</Text>
            <Text style={styles.subtitle}>
              {'Please enter the code we just sent to your number\n(907) 555-0101'}
            </Text>
          </View>
        </View>

        {/* ── OTP + resend ── */}
        <View style={styles.otpBlock}>
          <OtpInput value={otp} onChange={setOtp} length={OTP_LENGTH} />

          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text style={styles.resendText}>
              {canResend ? (
                <Text style={styles.resendLink}>Resend code</Text>
              ) : (
                <>
                  <Text style={styles.resendGrey}>Resend code in </Text>
                  <Text style={styles.resendTimer}>{`${mm}:${ss}`}</Text>
                </>
              )}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Continue button ── */}
        <Button
          label="Continue"
          onPress={handleContinue}
          disabled={otp.length < OTP_LENGTH}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
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
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.textSecondary,
  },
  otpBlock: {
    gap: 20,
    alignItems: 'center',
  },
  resendText: {
    textAlign: 'center',
  },
  resendGrey: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 21.7,
    color: Colors.textSecondary,
  },
  resendTimer: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 21.7,
    color: '#16B364',
  },
  resendLink: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 21.7,
    color: Colors.primary,
  },
});
