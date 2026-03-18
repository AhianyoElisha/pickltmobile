import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontFamily } from '@/constants/theme';

export default function ScheduledResultsScreen() {
  const params = useLocalSearchParams<{
    fromName: string;
    toName: string;
    moveType: string;
    date: string;
    timeSlot: string;
  }>();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Scheduled Move Results</Text>
        <Text style={styles.detail}>From: {params.fromName}</Text>
        <Text style={styles.detail}>To: {params.toName}</Text>
        <Text style={styles.detail}>Type: {params.moveType}</Text>
        <Text style={styles.detail}>Date: {params.date}</Text>
        <Text style={styles.detail}>Time: {params.timeSlot}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: 24, gap: 12 },
  heading: {
    fontFamily: FontFamily.semibold,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  detail: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
