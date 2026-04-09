import { router } from 'expo-router';
import { useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface Section {
  title: string;
  body: string;
}

const SECTIONS: Section[] = [
  {
    title: '1. Information Collection',
    body: 'We collect essential information to enhance your experience. This includes details you provide directly, such as account data, as well as information gathered through usage analytics and cookies.',
  },
  {
    title: '2. Information Usage',
    body: 'The information collected is used to improve our services, provide personalized recommendations, and ensure a seamless experience. We do not share your data without your explicit consent.',
  },
  {
    title: '3. Information Setting',
    body: 'You have full control over your data. Manage your privacy preferences, update personal details, and customize your settings to match your needs.',
  },
  {
    title: '4. Security Measures',
    body: "We prioritize your data's safety with advanced security protocols, encryption methods, and regular audits to protect against unauthorized access or breaches.",
  },
];

const MIN_THUMB = 40;

export default function PrivacyPolicyScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [viewportH, setViewportH] = useState(0);
  const [contentH, setContentH] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setOffsetY(e.nativeEvent.contentOffset.y);
  }

  function handleLayout(e: LayoutChangeEvent) {
    setViewportH(e.nativeEvent.layout.height);
  }

  function handleContentSizeChange(_w: number, h: number) {
    setContentH(h);
  }

  const scrollable = contentH > viewportH && viewportH > 0;
  const ratio = scrollable ? viewportH / contentH : 1;
  const thumbH = Math.max(MIN_THUMB, viewportH * ratio);
  const maxTop = Math.max(0, viewportH - thumbH);
  const progress = scrollable ? offsetY / (contentH - viewportH) : 0;
  const thumbTop = Math.max(0, Math.min(maxTop, progress * maxTop));

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => router.back()}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Privacy & Policy</Text>
        <View style={s.headerSpacer} />
      </View>

      <View style={[s.body, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={[s.effectiveDate, { color: colors.textPrimary }]}>Effective Date: December 20, 2024</Text>

        <View style={s.scrollRow}>
          <View style={s.detailsCol}>
            <ScrollView
              style={s.scroll}
              contentContainerStyle={s.scrollContent}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              onLayout={handleLayout}
              onContentSizeChange={handleContentSizeChange}>
              {SECTIONS.map((section) => (
                <View key={section.title} style={s.section}>
                  <Text style={[s.sectionTitle, { color: colors.textPrimary }]}>{section.title}</Text>
                  <Text style={[s.sectionBody, { color: colors.textSecondary }]}>{section.body}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={[s.track, { height: viewportH }]}>
            {viewportH > 0 && (
              <View
                style={[
                  s.thumb,
                  {
                    height: thumbH,
                    top: thumbTop,
                  },
                ]}
              />
            )}
          </View>
        </View>
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
  body: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 24,
  },
  effectiveDate: {
    fontFamily: FontFamily.medium,
    fontSize: 18,
    lineHeight: 25.2,
  },
  scrollRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsCol: {
    width: 300,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 24,
    gap: 16,
  },
  section: { gap: 8 },
  sectionTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
  },
  sectionBody: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
  },
  track: {
    width: 4,
    backgroundColor: '#697586',
    borderRadius: 9999,
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    left: 0,
    width: 4,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
});
