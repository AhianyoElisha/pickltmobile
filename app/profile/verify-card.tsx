import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useCards, type CardBrand } from '@/context/cards-context';
import { useAppTheme } from '@/context/theme-context';

const CODE_LENGTH = 4;
const RESEND_SECONDS = 48;

export default function VerifyCardScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    holder?: string;
    number?: string;
    expiry?: string;
    brand?: string;
    bg?: string;
  }>();
  const { addCard } = useCards();
  const { colors } = useAppTheme();

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  function handleChange(index: number, value: string) {
    const v = value.replace(/\D/g, '').slice(0, 1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);
    if (v && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(index: number, key: string) {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  const code = digits.join('');
  const isComplete = code.length === CODE_LENGTH;

  function handleContinue() {
    if (!isComplete) return;
    // Mock verify, then persist the card and pop back to the entry screen
    const last4 = (params.number ?? '').replace(/\D/g, '').slice(-4);
    addCard({
      bg: params.bg ?? '#0D121C',
      balance: '$0,00',
      number: params.number ?? `•••• •••• •••• ${last4}`,
      expiry: params.expiry ?? 'MM/YY',
      brand: ((params.brand as CardBrand) ?? 'mastercard') as CardBrand,
      holder: params.holder ?? '',
    });
    // Pop both verify-card and add-card off the stack
    router.dismissAll?.();
    router.back();
  }

  function formatTime(s: number) {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  }

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={s.container}>
        <View style={s.header}>
          <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => router.back()}>
            <ArrowLeftIcon size={20} color="#fff" />
          </TouchableOpacity>
          <View style={s.headerText}>
            <Text style={[s.title, { color: colors.textPrimary }]}>Verify Code</Text>
            <Text style={[s.subtitle, { color: colors.textSecondary }]}>
              Please enter the code we just sent to your number{'\n'}
              <Text style={[s.subtitleStrong, { color: colors.textPrimary }]}>(907) 555-0101</Text>
            </Text>
          </View>
        </View>

        <View style={s.codeBlock}>
          <View style={s.codeRow}>
            {digits.map((d, i) => {
              const focused = !d && digits.findIndex((x) => !x) === i;
              return (
                <View
                  key={i}
                  style={[
                    s.codeBox,
                    { backgroundColor: colors.background },
                    d ? [s.codeBoxFilled, { borderColor: colors.borderDark }] : focused ? s.codeBoxFocused : s.codeBoxEmpty,
                  ]}>
                  <TextInput
                    ref={(r) => {
                      inputRefs.current[i] = r;
                    }}
                    style={[s.codeInput, { color: colors.textPrimary }]}
                    value={d}
                    onChangeText={(v) => handleChange(i, v)}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectionColor={Colors.primary}
                  />
                </View>
              );
            })}
          </View>

          <Text style={s.resend}>
            <Text style={[s.resendMuted, { color: colors.textSecondary }]}>Resend code in </Text>
            <Text style={s.resendActive}>{formatTime(seconds)}</Text>
          </Text>
        </View>
      </View>

      <View style={[s.footer, { paddingBottom: insets.bottom + 8, backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[s.cta, !isComplete && s.ctaDisabled]}
          activeOpacity={0.9}
          disabled={!isComplete}
          onPress={handleContinue}>
          <Text style={s.ctaText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 8, gap: 24 },
  header: { gap: 12 },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { gap: 6 },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 21.7,
  },
  subtitleStrong: {},
  codeBlock: { gap: 20 },
  codeRow: { flexDirection: 'row', gap: 16 },
  codeBox: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeBoxEmpty: { borderColor: Colors.primary },
  codeBoxFilled: {},
  codeBoxFocused: { borderColor: '#19212C' },
  codeInput: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    fontFamily: FontFamily.medium,
    fontSize: 18,
  },
  resend: { textAlign: 'center' },
  resendMuted: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  resendActive: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.primary,
  },
  footer: { paddingHorizontal: 20, paddingTop: 16 },
  cta: {
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDisabled: { opacity: 0.5 },
  ctaText: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: Colors.white,
  },
});
