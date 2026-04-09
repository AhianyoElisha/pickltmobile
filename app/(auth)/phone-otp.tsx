import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useAppTheme } from '@/context/theme-context';

export default function PhoneOtpScreen() {
  const { signIn } = useAuth();
  const { colors } = useAppTheme();

  const handleVerify = async () => {
    // TODO: Replace with real OTP verification
    await signIn('mock_token');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.textPrimary }]}>Verify your phone</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Enter your phone number and we'll send you a verification code.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.textPrimary, backgroundColor: colors.surface }]}
          placeholder="+1 (000) 000-0000"
          keyboardType="phone-pad"
          placeholderTextColor={colors.placeholder}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
          <Text style={styles.primaryButtonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: undefined,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 32,
  },
  backText: {
    fontSize: 15,
    color: Colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: undefined,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: undefined,
    marginBottom: 40,
    lineHeight: 22,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: undefined,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: undefined,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
