import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Move Details — placeholder until Figma design is implemented
export default function MoveDetailsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Move Details</Text>

      <View style={styles.card}>
        <DetailRow label="Status" value="Pending" />
        <DetailRow label="Category" value="Instant" />
        <DetailRow label="Type" value="Regular" />
        <DetailRow label="Pickup" value="123 Main St, Brussels" />
        <DetailRow label="Drop-off" value="456 Oak Ave, Antwerp" />
        <DetailRow label="Date" value="—" />
      </View>
    </ScrollView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  backText: {
    fontSize: 15,
    color: '#0a7ea4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rowLabel: {
    fontSize: 14,
    color: '#687076',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#11181C',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
});
