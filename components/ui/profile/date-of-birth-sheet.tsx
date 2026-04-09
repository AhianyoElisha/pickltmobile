import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CalendarGrid } from '@/components/ui/booking/calendar-grid';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface Props {
  visible: boolean;
  value: string | null;
  onConfirm: (iso: string) => void;
  onClose: () => void;
}

export function DateOfBirthSheet({ visible, value, onConfirm, onClose }: Props) {
  const [temp, setTemp] = useState<string | null>(value);
  const slideAnim = useRef(new Animated.Value(700)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { colors } = useAppTheme();

  useEffect(() => {
    if (visible) {
      setTemp(value);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, bounciness: 4, speed: 14, useNativeDriver: true }),
      ]).start();
    } else {
      slideAnim.setValue(700);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  function close(after?: () => void) {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 700, duration: 220, useNativeDriver: true }),
    ]).start(() => {
      onClose();
      after?.();
    });
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={() => close()}>
      <View style={s.container}>
        <Animated.View style={[StyleSheet.absoluteFillObject, s.backdrop, { opacity: fadeAnim }]} />
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={() => close()}
        />
        <Animated.View style={[s.sheet, { transform: [{ translateY: slideAnim }], backgroundColor: colors.surfaceElevated }]}>
          <View style={s.handle} />
          <Text style={[s.title, { color: colors.textPrimary }]}>Select Date of Birth</Text>
          <CalendarGrid selected={temp} onSelect={setTemp} allowPastDates />
          <TouchableOpacity
            style={[s.confirm, !temp && s.confirmDisabled]}
            disabled={!temp}
            activeOpacity={0.9}
            onPress={() => temp && close(() => onConfirm(temp))}>
            <Text style={s.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    marginBottom: 16,
  },
  confirm: {
    marginTop: 20,
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmDisabled: { opacity: 0.5 },
  confirmText: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: Colors.white,
  },
});
