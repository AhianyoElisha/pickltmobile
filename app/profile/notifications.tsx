import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Toggle } from '@/components/ui/notifications/toggle';
import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

type NotificationKey =
  | 'notifications'
  | 'sound'
  | 'vibrate'
  | 'specialOffers'
  | 'payments'
  | 'cashback'
  | 'appUpdates';

const ROWS: { key: NotificationKey; label: string }[] = [
  { key: 'notifications', label: 'Notifications' },
  { key: 'sound', label: 'Sound' },
  { key: 'vibrate', label: 'Vibrate' },
  { key: 'specialOffers', label: 'Special Offers' },
  { key: 'payments', label: 'Payments' },
  { key: 'cashback', label: 'Cashback' },
  { key: 'appUpdates', label: 'App Updates' },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [settings, setSettings] = useState<Record<NotificationKey, boolean>>({
    notifications: true,
    sound: false,
    vibrate: false,
    specialOffers: true,
    payments: false,
    cashback: false,
    appUpdates: true,
  });

  function toggle(key: NotificationKey) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleSave() {
    // TODO: persist via API once backend is wired up
    router.back();
  }

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => router.back()}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Notifications</Text>
        <View style={s.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}>
        {ROWS.map((row) => (
          <View key={row.key} style={[s.row, { borderColor: colors.borderDark }]}>
            <Text style={[s.rowLabel, { color: colors.textPrimary }]}>{row.label}</Text>
            <Toggle value={settings[row.key]} onChange={() => toggle(row.key)} />
          </View>
        ))}
      </ScrollView>

      <View style={[s.footer, { paddingBottom: insets.bottom + 8, backgroundColor: colors.background, borderTopColor: colors.divider }]}>
        <TouchableOpacity style={s.saveBtn} activeOpacity={0.9} onPress={handleSave}>
          <Text style={s.saveText}>Save</Text>
        </TouchableOpacity>
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
    backgroundColor: Colors.primary,
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
    paddingBottom: 32,
    gap: 16,
  },
  row: {
    height: 64,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  saveBtn: {
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: Colors.white,
  },
});
