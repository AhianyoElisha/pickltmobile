import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Toggle } from '@/components/ui/notifications/toggle';
import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { FontFamily } from '@/constants/theme';
import { type ThemePreference, useAppTheme } from '@/context/theme-context';

const ROWS: { key: ThemePreference; label: string; subtitle: string }[] = [
  { key: 'light', label: 'Light Mode', subtitle: 'Classic light appearance' },
  { key: 'dark', label: 'Dark Mode', subtitle: 'Easier on the eyes at night' },
  { key: 'system', label: 'System Default', subtitle: 'Follows your device settings' },
];

export default function AppearanceScreen() {
  const { theme, setTheme, colors } = useAppTheme();

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => router.back()}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Appearance</Text>
        <View style={s.headerSpacer} />
      </View>

      <View style={s.scroll}>
        {ROWS.map((row) => (
          <View key={row.key} style={[s.row, { borderColor: colors.borderDark }]}>
            <View style={s.rowText}>
              <Text style={[s.rowLabel, { color: colors.textPrimary }]}>{row.label}</Text>
              <Text style={[s.rowSub, { color: colors.textSecondary }]}>{row.subtitle}</Text>
            </View>
            <Toggle value={theme === row.key} onChange={() => setTheme(row.key)} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 24,
    gap: 24,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: '#1D64EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    textAlign: 'center',
  },
  headerSpacer: { width: 48, height: 48 },
  scroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  row: {
    minHeight: 64,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    flex: 1,
    marginRight: 12,
  },
  rowLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
  },
  rowSub: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 18.2,
    marginTop: 2,
  },
});
