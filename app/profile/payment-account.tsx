import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { ApplePayIcon, GooglePayIcon, PayPalIcon } from '@/components/ui/payment-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

type Method = {
  key: string;
  label: string;
  Icon: () => React.ReactElement;
};

const METHODS: Method[] = [
  { key: 'apple', label: 'Apple Pay', Icon: () => <ApplePayIcon /> },
  { key: 'google', label: 'Google Pay', Icon: () => <GooglePayIcon /> },
  { key: 'paypal', label: 'PayPal', Icon: () => <PayPalIcon /> },
];

export default function PaymentAccountScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => router.back()}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Payment Account</Text>
        <View style={s.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {METHODS.map((m) => (
          <View key={m.key} style={[s.row, { borderColor: colors.borderDark }]}>
            <View style={s.rowLeft}>
              <m.Icon />
              <Text style={[s.rowLabel, { color: colors.textPrimary }]}>{m.label}</Text>
            </View>
            <Text style={[s.connected, { color: colors.textPrimary }]}>Connected</Text>
          </View>
        ))}
      </ScrollView>

      <View style={[s.footer, { paddingBottom: insets.bottom + 8, backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={s.cta}
          activeOpacity={0.9}
          onPress={() => router.push('/profile/add-card' as never)}>
          <Text style={s.ctaText}>Add New Card</Text>
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
    height: 72,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rowLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
  },
  connected: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16.8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  cta: {
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: Colors.white,
  },
});
