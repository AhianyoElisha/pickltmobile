import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';

import { Toggle } from '@/components/ui/notifications/toggle';
import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

function ChevronRightIcon({ size = 18, color = '#697586' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M6.75 4.5L11.25 9L6.75 13.5"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

type ToggleKey = 'rememberPassword' | 'faceId' | 'biometricId';

export default function SecurityScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [settings, setSettings] = useState<Record<ToggleKey, boolean>>({
    rememberPassword: true,
    faceId: true,
    biometricId: false,
  });

  function toggle(key: ToggleKey) {
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
        <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Security</Text>
        <View style={s.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={[s.row, { borderColor: colors.borderDark }]}>
          <Text style={[s.rowLabel, { color: colors.textPrimary }]}>Remember Password</Text>
          <Toggle value={settings.rememberPassword} onChange={() => toggle('rememberPassword')} />
        </View>
        <View style={[s.row, { borderColor: colors.borderDark }]}>
          <Text style={[s.rowLabel, { color: colors.textPrimary }]}>Face ID</Text>
          <Toggle value={settings.faceId} onChange={() => toggle('faceId')} />
        </View>
        <View style={[s.row, { borderColor: colors.borderDark }]}>
          <Text style={[s.rowLabel, { color: colors.textPrimary }]}>Biometric ID</Text>
          <Toggle value={settings.biometricId} onChange={() => toggle('biometricId')} />
        </View>
        <TouchableOpacity style={[s.row, { borderColor: colors.borderDark }]} activeOpacity={0.7} onPress={() => {}}>
          <Text style={[s.rowLabel, { color: colors.textPrimary }]}>Google Authenticator</Text>
          <ChevronRightIcon color={colors.textSecondary} />
        </TouchableOpacity>
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
