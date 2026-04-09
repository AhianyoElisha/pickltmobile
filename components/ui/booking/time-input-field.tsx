import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CalendarBlankIcon, CaretDownIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ArrivalTime {
  hour: number;    // 1–12
  minute: number;  // 0–59
  period: 'AM' | 'PM';
}

interface TimeInputFieldProps {
  label: string;
  value: ArrivalTime | null;
  onChange: (time: ArrivalTime) => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function pad(n: number) { return String(n).padStart(2, '0'); }

function formatTime(t: ArrivalTime | null) {
  if (!t) return 'HH : MM : --';
  return `${pad(t.hour)} : ${pad(t.minute)} : ${t.period}`;
}

// ── Plus / Minus stepper buttons ──────────────────────────────────────────────

function StepBtn({ label, onPress }: { label: string; onPress: () => void }) {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity style={[picker.stepBtn, { backgroundColor: colors.surface }]} onPress={onPress} activeOpacity={0.7}>
      <Text style={[picker.stepBtnText, { color: colors.textPrimary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const picker = StyleSheet.create({
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 20,
  },
});

// ── Main Component ────────────────────────────────────────────────────────────

export function TimeInputField({ label, value, onChange }: TimeInputFieldProps) {
  const { colors } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);

  // Picker draft state (editing inside modal before confirming)
  const [draftHour,   setDraftHour]   = useState(9);
  const [draftMinute, setDraftMinute] = useState(0);
  const [draftPeriod, setDraftPeriod] = useState<'AM' | 'PM'>('AM');

  const slideAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  function openSheet() {
    // Seed draft from current value (or defaults)
    if (value) {
      setDraftHour(value.hour);
      setDraftMinute(value.minute);
      setDraftPeriod(value.period);
    } else {
      setDraftHour(9);
      setDraftMinute(0);
      setDraftPeriod('AM');
    }
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, bounciness: 4, speed: 14, useNativeDriver: true }),
    ]).start();
  }

  function closeSheet(onDone?: () => void) {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 500, duration: 220, useNativeDriver: true }),
    ]).start(() => {
      setModalVisible(false);
      onDone?.();
    });
  }

  useEffect(() => {
    if (!modalVisible) {
      slideAnim.setValue(500);
      fadeAnim.setValue(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);

  function confirm() {
    closeSheet(() => onChange({ hour: draftHour, minute: draftMinute, period: draftPeriod }));
  }

  function adjustHour(delta: number) {
    setDraftHour((h) => {
      const next = h + delta;
      if (next > 12) return 1;
      if (next < 1)  return 12;
      return next;
    });
  }

  function adjustMinute(delta: number) {
    setDraftMinute((m) => {
      const next = m + delta;
      if (next > 59) return 0;
      if (next < 0)  return 59;
      return next;
    });
  }

  const hasValue = value !== null;

  return (
    <>
      {/* ── Field row ──────────────────────────────────────────────────────── */}
      <View style={s.wrapper}>
        <Text style={[s.label, { color: colors.textPrimary }]}>{label}</Text>
        <TouchableOpacity style={[s.field, { borderColor: colors.borderDark, backgroundColor: colors.surface }]} onPress={openSheet} activeOpacity={0.8}>
          <CalendarBlankIcon size={18} color={colors.textSecondary} />
          <Text style={[s.valueText, { color: hasValue ? colors.textPrimary : colors.textSecondary }]}>
            {formatTime(value)}
          </Text>
          <CaretDownIcon size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* ── Bottom sheet modal ─────────────────────────────────────────────── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={() => closeSheet()}>
        <View style={sheet.container}>
          <Animated.View
            style={[StyleSheet.absoluteFillObject, sheet.backdrop, { opacity: fadeAnim }]}
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={() => closeSheet()}
          />
          <Animated.View style={[sheet.sheet, { transform: [{ translateY: slideAnim }], backgroundColor: colors.surfaceElevated }]}>
            <View style={sheet.handle} />
            <Text style={[sheet.title, { color: colors.textPrimary }]}>Preferred Arrival Time</Text>

            {/* ── Picker controls ─────────────────────────────────────────── */}
            <View style={sheet.pickerRow}>

              {/* Hour column */}
              <View style={sheet.col}>
                <Text style={[sheet.colLabel, { color: colors.textSecondary }]}>Hour</Text>
                <View style={sheet.spinnerRow}>
                  <StepBtn label="−" onPress={() => adjustHour(-1)} />
                  <Text style={[sheet.digitText, { color: colors.textPrimary }]}>{pad(draftHour)}</Text>
                  <StepBtn label="+" onPress={() => adjustHour(1)} />
                </View>
              </View>

              <Text style={[sheet.colon, { color: colors.textPrimary }]}>:</Text>

              {/* Minute column */}
              <View style={sheet.col}>
                <Text style={[sheet.colLabel, { color: colors.textSecondary }]}>Min</Text>
                <View style={sheet.spinnerRow}>
                  <StepBtn label="−" onPress={() => adjustMinute(-5)} />
                  <Text style={[sheet.digitText, { color: colors.textPrimary }]}>{pad(draftMinute)}</Text>
                  <StepBtn label="+" onPress={() => adjustMinute(5)} />
                </View>
              </View>

              {/* AM / PM toggle */}
              <View style={sheet.col}>
                <Text style={[sheet.colLabel, { color: colors.textSecondary }]}>Period</Text>
                <View style={[sheet.periodToggle, { borderColor: colors.borderDark }]}>
                  <TouchableOpacity
                    style={[sheet.periodBtn, { backgroundColor: colors.surface }, draftPeriod === 'AM' && sheet.periodBtnActive]}
                    onPress={() => setDraftPeriod('AM')}
                    activeOpacity={0.8}>
                    <Text style={[sheet.periodText, { color: colors.textSecondary }, draftPeriod === 'AM' && sheet.periodTextActive]}>
                      AM
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[sheet.periodBtn, { backgroundColor: colors.surface }, draftPeriod === 'PM' && sheet.periodBtnActive]}
                    onPress={() => setDraftPeriod('PM')}
                    activeOpacity={0.8}>
                    <Text style={[sheet.periodText, { color: colors.textSecondary }, draftPeriod === 'PM' && sheet.periodTextActive]}>
                      PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* ── Confirm button ──────────────────────────────────────────── */}
            <TouchableOpacity style={sheet.confirmBtn} onPress={confirm} activeOpacity={0.85}>
              <Text style={sheet.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  wrapper: { gap: 8 },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  valueText: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 22.4,
  },
});

const sheet = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  backdrop:  { backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    textAlign: 'center',
    marginBottom: 28,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 32,
  },
  col: { alignItems: 'center', gap: 6 },
  colLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  spinnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  colon: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    paddingBottom: 4,
  },
  digitText: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'center',
    minWidth: 36,
  },
  periodToggle: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  periodBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  periodBtnActive: {
    backgroundColor: Colors.primary,
  },
  periodText: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    lineHeight: 18,
  },
  periodTextActive: {
    color: Colors.white,
  },
  confirmBtn: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
  },
});
