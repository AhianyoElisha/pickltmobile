import { StyleSheet, Text, View } from 'react-native';

// Moves / History — placeholder until Figma design is implemented
export default function MovesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moves</Text>
      <Text style={styles.subtitle}>Your move history will appear here.</Text>
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
  },
});
