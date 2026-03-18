import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/context/auth-context';

export default function ProfileConfirmationScreen() {
  const { markProfileConfirmed } = useAuth();

  const handleConfirm = async () => {
    await markProfileConfirmed();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm your profile</Text>
      <Text style={styles.subtitle}>
        Please review your details. We recommend using your real name for the moving service.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          autoCapitalize="words"
          placeholderTextColor="#687076"
        />
        <TextInput
          style={[styles.input, styles.readOnly]}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#687076"
          editable={false}
        />
        <TextInput
          style={[styles.input, styles.readOnly]}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor="#687076"
          editable={false}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleConfirm}>
          <Text style={styles.primaryButtonText}>Confirm & Continue</Text>
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
    paddingTop: 80,
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
  readOnly: {
    backgroundColor: '#F8F9FA',
    color: '#687076',
  },
  primaryButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
