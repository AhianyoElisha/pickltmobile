import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { CreditCardVisual } from '@/components/ui/payment/credit-card-visual';
import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';
import type { CardBrand } from '@/context/cards-context';

function detectBrand(number: string): CardBrand {
  const digits = number.replace(/\D/g, '');
  if (digits.startsWith('4')) return 'visa';
  return 'mastercard';
}

function formatCardNumber(input: string) {
  const digits = input.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input: string) {
  const digits = input.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function AddCardScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const brand = useMemo(() => detectBrand(number), [number]);
  const previewNumber = number || '•••• •••• •••• ••••';
  const previewExpiry = expiry || 'MM/YY';
  const previewBg = brand === 'visa' ? '#16B364' : '#0D121C';

  const digitsOnly = number.replace(/\s/g, '');
  const isValid =
    holder.trim().length >= 2 &&
    digitsOnly.length === 16 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    cvv.length >= 3;

  function handleContinue() {
    if (!isValid) return;
    router.push({
      pathname: '/profile/verify-card' as never,
      params: {
        holder,
        number,
        expiry,
        brand,
        bg: previewBg,
      } as never,
    });
  }

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={s.header}>
          <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => router.back()}>
            <ArrowLeftIcon size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Add New Card</Text>
          <View style={s.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <CreditCardVisual
            bg={previewBg}
            balance="$0,00"
            number={previewNumber}
            expiry={previewExpiry}
            brand={brand}
          />

          <View style={s.form}>
            <Field
              label="Card Holder Name"
              value={holder}
              onChangeText={setHolder}
              placeholder="e.g., Jenny Wilson"
              autoCapitalize="words"
            />
            <Field
              label="Card Number"
              value={number}
              onChangeText={(v) => setNumber(formatCardNumber(v))}
              placeholder="1234 5678 9012 3456"
              keyboardType="number-pad"
            />
            <View style={s.row}>
              <View style={{ flex: 1 }}>
                <Field
                  label="Expiry Date"
                  value={expiry}
                  onChangeText={(v) => setExpiry(formatExpiry(v))}
                  placeholder="MM/YY"
                  keyboardType="number-pad"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Field
                  label="CVV"
                  value={cvv}
                  onChangeText={(v) => setCvv(v.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  keyboardType="number-pad"
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[s.footer, { paddingBottom: insets.bottom + 8, backgroundColor: colors.background }]}>
          <TouchableOpacity
            style={[s.cta, !isValid && s.ctaDisabled]}
            activeOpacity={0.9}
            disabled={!isValid}
            onPress={handleContinue}>
            <Text style={s.ctaText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize = 'none',
  secureTextEntry,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
}) {
  const { colors } = useAppTheme();
  return (
    <View style={s.field}>
      <Text style={[s.fieldLabel, { color: colors.textPrimary }]}>{label}</Text>
      <TextInput
        style={[s.input, { borderColor: colors.borderDark, color: colors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
    </View>
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
  scroll: { paddingHorizontal: 20, paddingBottom: 32, gap: 24 },
  form: { gap: 16 },
  row: { flexDirection: 'row', gap: 12 },
  field: { gap: 8 },
  fieldLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: FontFamily.medium,
    fontSize: 16,
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
