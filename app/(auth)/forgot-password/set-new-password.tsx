import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

export default function SetNewPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { colors, isDark } = useAppTheme();

  const isValid =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  const handleCreate = () => {
    if (!isValid) return;
    // TODO: Replace with real API call
    setShowSuccess(true);
  };

  const handleLoginNow = () => {
    setShowSuccess(false);
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.content}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>New Password</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Create a new password that is safe and easy to remember
            </Text>
          </View>
        </View>

        {/* ── Fields ── */}
        <View style={styles.fields}>
          <FormField
            label="New Password"
            placeholder="Enter your password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <FormField
            label="Confirm New password"
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* ── CTA ── */}
        <View style={styles.spacer} />
        <Button
          label="Create New Password"
          onPress={handleCreate}
          disabled={!isValid}
        />
      </View>

      {/* ── Success Modal ── */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        statusBarTranslucent>
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            {/* Illustration */}
            <View style={styles.illustration}>
              {/* Sparkle decorations */}
              <View style={[styles.sparkle, styles.sparkleTopLeft]} />
              <View style={[styles.sparkle, styles.sparkleTopRight]} />
              <View style={[styles.sparkle, styles.sparkleBottomLeft]} />
              <View style={[styles.sparkle, styles.sparkleBottomRight]} />
              <View style={[styles.sparkleDot, styles.dotTop]} />
              <View style={[styles.sparkleDot, styles.dotLeft]} />
              <View style={[styles.sparkleDot, styles.dotRight]} />
              <View style={[styles.sparkleDot, styles.dotBottom]} />
              {/* Main circle */}
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={72} color={Colors.white} />
              </View>
            </View>

            {/* Text */}
            <View style={styles.modalTextBlock}>
              <Text style={styles.modalTitle}>Password Changed!</Text>
              <Text style={styles.modalBody}>
                Your password has been successfully updated. You can now log in
                with your new password.
              </Text>
            </View>

            {/* Button */}
            <Button label="Login Now" onPress={handleLoginNow} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: undefined,
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
    color: undefined,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: undefined,
  },
  fields: {
    gap: 16,
  },
  spacer: {
    flex: 1,
  },

  // Success modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: 'rgba(13,13,13,0.85)',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: 'center',
    gap: 24,
  },
  illustration: {
    width: 144,
    height: 144,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sparkle cross shapes (two thin crossed rectangles)
  sparkle: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: Colors.primary,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  sparkleTopLeft: { top: 8, left: 14 },
  sparkleTopRight: { top: 4, right: 10 },
  sparkleBottomLeft: { bottom: 12, left: 8 },
  sparkleBottomRight: { bottom: 8, right: 14 },
  // Small dot accents
  sparkleDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  dotTop: { top: 2, left: '50%' },
  dotLeft: { left: 2, top: '50%' },
  dotRight: { right: 2, top: '42%' },
  dotBottom: { bottom: 2, right: '40%' },
  modalTextBlock: {
    gap: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 18,
    lineHeight: 25.2,
    color: Colors.white,
    textAlign: 'center',
  },
  modalBody: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.white,
    textAlign: 'center',
  },
});
