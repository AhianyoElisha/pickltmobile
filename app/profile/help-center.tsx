import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circle, Path, Svg } from 'react-native-svg';

import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

function SearchIcon({ size = 20, color = '#697586' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="9" cy="9" r="7" stroke={color} strokeWidth={1.5} />
      <Path d="M14.5 14.5L17.5 17.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function FilterIcon({ size = 18, color = '#0D121C' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M3 5H11" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M3 13H8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx="13" cy="5" r="1.5" stroke={color} strokeWidth={1.5} />
      <Circle cx="10" cy="13" r="1.5" stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

function ChevronIcon({
  direction,
  size = 18,
  color = '#697586',
}: {
  direction: 'right' | 'up';
  size?: number;
  color?: string;
}) {
  const d = direction === 'right' ? 'M6.75 4.5L11.25 9L6.75 13.5' : 'M4.5 11.25L9 6.75L13.5 11.25';
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d={d} stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface Faq {
  question: string;
  answer: string;
}

const FAQS: Faq[] = [
  {
    question: 'How do I reset my password?',
    answer:
      'Tap "Forgot Password" on the login screen and follow the instructions to reset your password via email.',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach our support team via the "Contact Us" option available in the app.',
  },
  {
    question: 'How can I update my information?',
    answer: 'Open Profile → Edit Profile to update your personal details at any time.',
  },
  {
    question: 'How do I report an issue?',
    answer: 'Use the "Help & Support" section in your profile to report any issues you encounter.',
  },
  {
    question: 'How do I manage notifications?',
    answer: 'Open Profile → Notifications to control which alerts you receive.',
  },
];

export default function HelpCenterScreen() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<number | null>(1);
  const { colors } = useAppTheme();

  const filtered = query.trim()
    ? FAQS.filter((f) => f.question.toLowerCase().includes(query.toLowerCase()))
    : FAQS;

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => router.back()}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Help Center</Text>
        <View style={s.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={[s.searchBox, { borderColor: colors.borderDark }]}>
          <SearchIcon color={colors.textSecondary} />
          <TextInput
            style={[s.searchInput, { color: colors.textPrimary }]}
            value={query}
            onChangeText={setQuery}
            placeholder="Search location.."
            placeholderTextColor={colors.placeholder}
          />
          <View style={[s.searchDivider, { backgroundColor: colors.placeholder }]} />
          <FilterIcon color={colors.textPrimary} />
        </View>

        <View style={s.faqList}>
          {filtered.map((faq) => {
            const idx = FAQS.indexOf(faq);
            const isOpen = expanded === idx;
            return (
              <TouchableOpacity
                key={faq.question}
                style={[s.faqItem, { borderColor: colors.borderDark }, isOpen && s.faqItemOpen]}
                activeOpacity={0.7}
                onPress={() => setExpanded(isOpen ? null : idx)}>
                <View style={s.faqHeader}>
                  <Text style={[s.faqQuestion, { color: colors.textPrimary }]}>{faq.question}</Text>
                  <ChevronIcon direction={isOpen ? 'up' : 'right'} color={colors.textSecondary} />
                </View>
                {isOpen && <Text style={[s.faqAnswer, { color: colors.textSecondary }]}>{faq.answer}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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
  searchBox: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    padding: 0,
  },
  searchDivider: {
    width: 1,
    height: 18,
    marginHorizontal: 4,
  },
  faqList: {
    gap: 16,
  },
  faqItem: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  faqItemOpen: {
    paddingVertical: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
  },
  faqAnswer: {
    marginTop: 12,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
  },
});
