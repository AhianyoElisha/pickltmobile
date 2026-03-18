import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/context/auth-context';

export default function PhoneOtpScreen() {
  const { signIn } = useAuth();

  const handleVerify = async () => {
    // TODO: Replace with real OTP verification
    await signIn('mock_token');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Verify your phone</Text>
      <Text style={styles.subtitle}>
        Enter your phone number and we'll send you a verification code.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="+1 (000) 000-0000"
          keyboardType="phone-pad"
          placeholderTextColor="#687076"
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
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 32,
  },
  backText: {
    fontSize: 15,
    color: '#0a7ea4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#687076',
    marginBottom: 40,
    lineHeight: 22,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#11181C',
  },
  primaryButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
