import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { LanguageRow } from '@/components/ui/language/language-row';
import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

const SUGGESTED = ['English (US)', 'English (UK)'] as const;
const OTHERS = ['Mandarin', 'Hindi', 'Spanish', 'Arabic', 'Bengali', 'German'] as const;

export default function LanguageScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [selected, setSelected] = useState<string>('English (US)');

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
        <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Language</Text>
        <View style={s.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={s.section}>
          <Text style={[s.sectionTitle, { color: colors.textPrimary }]}>Suggested</Text>
          <View style={s.rows}>
            {SUGGESTED.map((lang) => (
              <LanguageRow
                key={lang}
                label={lang}
                selected={selected === lang}
                onPress={() => setSelected(lang)}
              />
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={[s.sectionTitle, { color: colors.textPrimary }]}>Others</Text>
          <View style={s.rows}>
            {OTHERS.map((lang) => (
              <LanguageRow
                key={lang}
                label={lang}
                selected={selected === lang}
                onPress={() => setSelected(lang)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[s.footer, { paddingBottom: insets.bottom + 8, backgroundColor: colors.background, borderTopColor: colors.divider }]}>
        <TouchableOpacity style={s.saveBtn} activeOpacity={0.9} onPress={handleSave}>
          <Text style={s.saveText}>Save Changes</Text>
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
    gap: 24,
  },
  section: { gap: 14 },
  sectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
  },
  rows: { gap: 16 },
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
