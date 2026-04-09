import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { PlusIcon } from '@/components/ui/pickup-icons';
import { TextInputField } from '@/components/ui/booking/text-input-field';
import { useCards, type SavedCard } from '@/context/cards-context';
import { useWizard } from '@/context/wizard-context';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

import type { ScheduledFormData } from '@/constants/wizard-types';

type CardId = string;

function last4(number: string) {
  return number.replace(/\D/g, '').slice(-4);
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Local SVG icons ───────────────────────────────────────────────────────────

function CardIcon({ color = '#CED2E6', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17 3.5H3C1.9 3.5 1 4.4 1 5.5V14.5C1 15.6 1.9 16.5 3 16.5H17C18.1 16.5 19 15.6 19 14.5V5.5C19 4.4 18.1 3.5 17 3.5Z"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M1 8H19" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M4.5 12H7" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function CashIcon({ color = '#0D121C', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.5 4.5H3.5C2.4 4.5 1.5 5.4 1.5 6.5V13.5C1.5 14.6 2.4 15.5 3.5 15.5H16.5C17.6 15.5 18.5 14.6 18.5 13.5V6.5C18.5 5.4 17.6 4.5 16.5 4.5Z"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Circle cx={10} cy={10} r={2.5} stroke={color} strokeWidth={1.5} />
      <Path d="M4 7.5H4.01"   stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M16 12.5H16.01" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function ChevronDownIcon({ color = '#CED2E6', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M4 7L9 12L14 7"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Checkbox ──────────────────────────────────────────────────────────────────

function Checkbox({ checked }: { checked: boolean }) {
  const { colors } = useAppTheme();
  return (
    <View style={[cbS.box, checked ? cbS.boxChecked : [cbS.boxUnchecked, { borderColor: colors.textSecondary, backgroundColor: colors.surface }]]}>
      {checked && (
        <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
          <Path
            d="M2 6.5L4.5 9L10 3"
            stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
  );
}

const cbS = StyleSheet.create({
  box:          { width: 20, height: 20, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  boxChecked:   { backgroundColor: Colors.primary },
  boxUnchecked: { borderWidth: 1.2 },
});

// ── CardPickerSheet ───────────────────────────────────────────────────────────

interface CardPickerSheetProps {
  visible: boolean;
  cards: SavedCard[];
  selectedCardId: CardId | null;
  onSelect: (id: CardId) => void;
  onAddNew: () => void;
  onClose: () => void;
}

function CardPickerSheet({ visible, cards, selectedCardId, onSelect, onAddNew, onClose }: CardPickerSheetProps) {
  const { colors } = useAppTheme();
  const slideAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  function openAnim() {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, bounciness: 4, speed: 14, useNativeDriver: true }),
    ]).start();
  }

  function closeAnim(onDone?: () => void) {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 500, duration: 220, useNativeDriver: true }),
    ]).start(() => { onDone?.(); });
  }

  useEffect(() => {
    if (visible) { openAnim(); }
    else { slideAnim.setValue(500); fadeAnim.setValue(0); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function handleSelect(id: CardId) { closeAnim(() => onSelect(id)); }
  function handleClose() { closeAnim(onClose); }
  function handleAddNew() { closeAnim(onAddNew); }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={sheet.container}>
        <Animated.View style={[StyleSheet.absoluteFillObject, sheet.backdrop, { opacity: fadeAnim }]} />
        <TouchableOpacity style={StyleSheet.absoluteFillObject} activeOpacity={1} onPress={handleClose} />
        <Animated.View style={[sheet.sheet, { transform: [{ translateY: slideAnim }], backgroundColor: colors.surfaceElevated }]}>
          <View style={sheet.handle} />
          <Text style={[sheet.title, { color: colors.textPrimary }]}>Select Card</Text>
          {cards.map((card) => {
            const isSelected = selectedCardId === card.id;
            return (
              <TouchableOpacity
                key={card.id}
                style={[sheet.cardRow, isSelected && sheet.cardRowSelected]}
                onPress={() => handleSelect(card.id)}
                activeOpacity={0.8}>
                <View style={sheet.cardLeft}>
                  <View style={sheet.cardIconWrap}>
                    <CardIcon size={20} color={isSelected ? Colors.primary : Colors.textSecondary} />
                  </View>
                  <View style={sheet.cardText}>
                    <Text style={[sheet.cardBrand, { color: colors.textPrimary }]}>{capitalize(card.brand)}</Text>
                    <Text style={[sheet.cardMasked, { color: colors.textSecondary }]}>{'•••• ' + last4(card.number)}</Text>
                  </View>
                </View>
                <View style={[sheet.radio, isSelected && sheet.radioSelected]}>
                  {isSelected && <View style={sheet.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={[sheet.addBtn, { borderColor: colors.textPrimary }]} onPress={handleAddNew} activeOpacity={0.8}>
            <PlusIcon size={16} color={colors.textPrimary} />
            <Text style={[sheet.addBtnText, { color: colors.textPrimary }]}>Add new card</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const sheet = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  backdrop:  { backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingBottom: 40,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.15)',
    alignSelf: 'center', marginTop: 12, marginBottom: 20,
  },
  title: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4, marginBottom: 16 },
  cardRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', padding: 14, marginBottom: 10,
  },
  cardRowSelected: { borderColor: Colors.primary, backgroundColor: 'rgba(29,100,236,0.05)' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  cardIconWrap: {
    width: 40, height: 40, borderRadius: 9999, backgroundColor: '#F0F4FF',
    alignItems: 'center', justifyContent: 'center',
  },
  cardText: { gap: 2 },
  cardBrand: { fontFamily: FontFamily.medium, fontSize: 15, lineHeight: 21 },
  cardMasked: { fontFamily: FontFamily.regular, fontSize: 13, lineHeight: 18.2, letterSpacing: 1 },
  radio: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: Colors.textSecondary,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: Colors.primary },
  radioInner: { width: 11, height: 11, borderRadius: 6, backgroundColor: Colors.primary },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    marginTop: 4, borderWidth: 1.5, borderRadius: 40,
    paddingVertical: 14, paddingHorizontal: 24,
  },
  addBtnText: { fontFamily: FontFamily.semibold, fontSize: 15, lineHeight: 21 },
});

// ── Payment type ──────────────────────────────────────────────────────────────

type PaymentType = 'card' | 'cash';

// ── Step Component ────────────────────────────────────────────────────────────

export function StepPaymentInfo() {
  const { state, setField } = useWizard<ScheduledFormData>();
  const { cards } = useCards();
  const { colors } = useAppTheme();
  const fd = state.formData;

  const [cardSheetVisible, setCardSheetVisible] = useState(false);

  const selectedCard = cards.find((c) => c.id === fd.selectedCardId) ?? null;

  function openCardSheet() {
    setField('selectedPayment', 'card' as PaymentType);
    setCardSheetVisible(true);
  }

  function handleCardSelect(id: CardId) {
    setField('selectedCardId', id);
    setCardSheetVisible(false);
  }

  function handleAddNew() {
    setCardSheetVisible(false);
    router.push('/profile/add-card' as never);
  }

  const cardRowActive = fd.selectedPayment === 'card' && selectedCard !== null;
  const cashSelected  = fd.selectedPayment === 'cash';

  return (
    <View style={s.container}>
      {/* ── Card picker sheet ───────────────────────────────────────────── */}
      <CardPickerSheet
        visible={cardSheetVisible}
        cards={cards}
        selectedCardId={fd.selectedCardId as any}
        onSelect={handleCardSelect}
        onAddNew={handleAddNew}
        onClose={() => setCardSheetVisible(false)}
      />

      {/* ── Access notes ────────────────────────────────────────────────── */}
      <TextInputField
        label="Access notes (optional)"
        hint="Any special instructions or requests"
        value={fd.finalAccessNotes}
        onChangeText={(v) => setField('finalAccessNotes', v)}
        placeholder="e.g., Please call 30 minutes before arrival, fragile items in bedroom..."
        multiline
        numberOfLines={3}
      />

      {/* ── Select Payment ──────────────────────────────────────────────── */}
      <View style={s.paymentSection}>
        <Text style={[s.paymentTitle, { color: colors.textPrimary }]}>Select Payment</Text>

        <TouchableOpacity
          style={[s.paymentRow, cardRowActive ? s.paymentRowSelected : s.paymentRowCard]}
          onPress={openCardSheet}
          activeOpacity={0.85}>
          <View style={s.paymentRowLeft}>
            <CardIcon size={20} color={cardRowActive ? Colors.white : '#CED2E6'} />
            <Text style={[s.paymentRowText, cardRowActive ? s.paymentRowTextSelected : s.paymentRowTextCard]}>
              {selectedCard ? '•••• ' + last4(selectedCard.number) : 'Payment Method'}
            </Text>
          </View>
          <ChevronDownIcon size={18} color={cardRowActive ? Colors.white : '#CED2E6'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.paymentRow, cashSelected ? s.paymentRowSelected : [s.paymentRowCash, { backgroundColor: colors.surface, borderColor: colors.textSecondary }]]}
          onPress={() => { setField('selectedPayment', 'cash' as PaymentType); setField('selectedCardId', null); }}
          activeOpacity={0.85}>
          <View style={s.paymentRowLeft}>
            <CashIcon size={20} color={cashSelected ? Colors.white : colors.textPrimary} />
            <Text style={[s.paymentRowText, cashSelected ? s.paymentRowTextSelected : { color: colors.textPrimary }]}>
              Pay Cash
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ── Business move checkbox ──────────────────────────────────────── */}
      <TouchableOpacity
        style={s.checkboxRow}
        onPress={() => setField('isBusinessMove', !fd.isBusinessMove)}
        activeOpacity={0.8}>
        <Checkbox checked={fd.isBusinessMove} />
        <Text style={[s.checkboxLabel, { color: colors.textPrimary }]}>
          This is a business move (I need an invoice with VAT)
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 20 },

  paymentSection: { gap: 12 },
  paymentTitle: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4 },

  paymentRow: {
    height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 12, borderRadius: 12,
  },
  paymentRowCard:     { backgroundColor: '#697586' },
  paymentRowCash:     { borderWidth: 1 },
  paymentRowSelected: { backgroundColor: Colors.primary },

  paymentRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  paymentRowText:         { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 21.7 },
  paymentRowTextCard:     { color: '#CED2E6' },
  paymentRowTextCash:     { color: Colors.textPrimary },
  paymentRowTextSelected: { color: Colors.white },

  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkboxLabel: {
    flex: 1, fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 25.6,
  },
});
