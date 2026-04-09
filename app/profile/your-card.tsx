import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { CheckCircleIcon } from '@/components/ui/payment-icons';
import { CreditCardVisual } from '@/components/ui/payment/credit-card-visual';
import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useCards } from '@/context/cards-context';
import { useAppTheme } from '@/context/theme-context';

export default function YourCardScreen() {
  const insets = useSafeAreaInsets();
  const { cards, defaultId, setDefault } = useCards();
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => router.back()}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Your Card</Text>
        <View style={s.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {cards.map((card) => {
          const isDefault = defaultId === card.id;
          return (
            <View key={card.id} style={s.cardBlock}>
              <CreditCardVisual
                bg={card.bg}
                balance={card.balance}
                number={card.number}
                expiry={card.expiry}
                brand={card.brand}
              />
              <TouchableOpacity
                style={s.defaultRow}
                activeOpacity={0.7}
                onPress={() => setDefault(card.id)}>
                <CheckCircleIcon filled={isDefault} />
                <Text style={[s.defaultText, { color: colors.textSecondary }]}>Use as default payment method</Text>
              </TouchableOpacity>
            </View>
          );
        })}
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
  scroll: { paddingHorizontal: 20, paddingBottom: 32, gap: 24 },
  cardBlock: { gap: 14 },
  defaultRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  defaultText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
  },
  footer: { paddingHorizontal: 20, paddingTop: 16 },
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
