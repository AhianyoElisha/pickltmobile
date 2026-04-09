import { StyleSheet, Text, View } from 'react-native';

import { CardPattern, MastercardLogo, VisaLogo } from '@/components/ui/payment-icons';
import { FontFamily } from '@/constants/theme';
import type { CardBrand } from '@/context/cards-context';

interface CreditCardVisualProps {
  bg: string;
  balance: string;
  number: string;
  expiry: string;
  brand: CardBrand;
}

export function CreditCardVisual({ bg, balance, number, expiry, brand }: CreditCardVisualProps) {
  return (
    <View style={[s.card, { backgroundColor: bg }]}>
      <View style={StyleSheet.absoluteFill}>
        <CardPattern />
      </View>
      <View style={s.cardTop}>
        <View style={{ gap: 4 }}>
          <Text style={s.cardLabel}>Current Balance</Text>
          <Text style={s.cardBalance}>{balance}</Text>
        </View>
        {brand === 'mastercard' ? <MastercardLogo /> : <VisaLogo />}
      </View>
      <View style={s.cardBottom}>
        <Text style={s.cardNumber}>{number}</Text>
        <Text style={s.cardNumber}>{expiry}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    height: 186,
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
  cardBalance: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    lineHeight: 36,
    color: '#FFFFFF',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
});
