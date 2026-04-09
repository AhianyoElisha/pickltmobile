import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

export default function ScheduledResultsScreen() {
  const { colors } = useAppTheme();
  const params = useLocalSearchParams<{
    fromName: string;
    toName: string;
    moveType: string;
    date: string;
    timeSlot: string;
  }>();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>Scheduled Move Results</Text>
        <Text style={[styles.detail, { color: colors.textSecondary }]}>From: {params.fromName}</Text>
        <Text style={[styles.detail, { color: colors.textSecondary }]}>To: {params.toName}</Text>
        <Text style={[styles.detail, { color: colors.textSecondary }]}>Type: {params.moveType}</Text>
        <Text style={[styles.detail, { color: colors.textSecondary }]}>Date: {params.date}</Text>
        <Text style={[styles.detail, { color: colors.textSecondary }]}>Time: {params.timeSlot}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: 24, gap: 12 },
  heading: {
    fontFamily: FontFamily.semibold,
    fontSize: 20,
    marginBottom: 8,
  },
  detail: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
});
