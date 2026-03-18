import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/context/auth-context';

// Profile / Settings — placeholder until Figma design is implemented
export default function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Your profile and settings will appear here.</Text>

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#687076',
    textAlign: 'center',
    marginBottom: 40,
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  signOutText: {
    fontSize: 15,
    color: '#11181C',
    fontWeight: '500',
  },
});
