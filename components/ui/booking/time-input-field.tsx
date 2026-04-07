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
  return (
    <TouchableOpacity style={picker.stepBtn} onPress={onPress} activeOpacity={0.7}>
      <Text style={picker.stepBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const picker = StyleSheet.create({
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
});

// ── Main Component ────────────────────────────────────────────────────────────

export function TimeInputField({ label, value, onChange }: TimeInputFieldProps) {
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
        <Text style={s.label}>{label}</Text>
        <TouchableOpacity style={s.field} onPress={openSheet} activeOpacity={0.8}>
          <CalendarBlankIcon size={18} color={Colors.textSecondary} />
          <Text style={[s.valueText, !hasValue && s.placeholder]}>
            {formatTime(value)}
          </Text>
          <CaretDownIcon size={16} color={Colors.textSecondary} />
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
          <Animated.View style={[sheet.sheet, { transform: [{ translateY: slideAnim }] }]}>
            <View style={sheet.handle} />
            <Text style={sheet.title}>Preferred Arrival Time</Text>

            {/* ── Picker controls ─────────────────────────────────────────── */}
            <View style={sheet.pickerRow}>

              {/* Hour column */}
              <View style={sheet.col}>
                <Text style={sheet.colLabel}>Hour</Text>
                <View style={sheet.spinnerRow}>
                  <StepBtn label="−" onPress={() => adjustHour(-1)} />
                  <Text style={sheet.digitText}>{pad(draftHour)}</Text>
                  <StepBtn label="+" onPress={() => adjustHour(1)} />
                </View>
              </View>

              <Text style={sheet.colon}>:</Text>

              {/* Minute column */}
              <View style={sheet.col}>
                <Text style={sheet.colLabel}>Min</Text>
                <View style={sheet.spinnerRow}>
                  <StepBtn label="−" onPress={() => adjustMinute(-5)} />
                  <Text style={sheet.digitText}>{pad(draftMinute)}</Text>
                  <StepBtn label="+" onPress={() => adjustMinute(5)} />
                </View>
              </View>

              {/* AM / PM toggle */}
              <View style={sheet.col}>
                <Text style={sheet.colLabel}>Period</Text>
                <View style={sheet.periodToggle}>
                  <TouchableOpacity
                    style={[sheet.periodBtn, draftPeriod === 'AM' && sheet.periodBtnActive]}
                    onPress={() => setDraftPeriod('AM')}
                    activeOpacity={0.8}>
                    <Text style={[sheet.periodText, draftPeriod === 'AM' && sheet.periodTextActive]}>
                      AM
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[sheet.periodBtn, draftPeriod === 'PM' && sheet.periodBtnActive]}
                    onPress={() => setDraftPeriod('PM')}
                    activeOpacity={0.8}>
                    <Text style={[sheet.periodText, draftPeriod === 'PM' && sheet.periodTextActive]}>
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
    color: Colors.textPrimary,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#CDD5DF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  valueText: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.textPrimary,
  },
  placeholder: {
    color: Colors.textSecondary,
  },
});

const sheet = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  backdrop:  { backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    backgroundColor: Colors.white,
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
    color: Colors.textPrimary,
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
    color: Colors.textSecondary,
  },
  spinnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  colon: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.textPrimary,
    paddingBottom: 4,
  },
  digitText: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    color: Colors.textPrimary,
    textAlign: 'center',
    minWidth: 36,
  },
  periodToggle: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CDD5DF',
    overflow: 'hidden',
  },
  periodBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  periodBtnActive: {
    backgroundColor: Colors.primary,
  },
  periodText: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
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
