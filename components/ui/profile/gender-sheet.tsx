import { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface Props {
  visible: boolean;
  value: string | null;
  options: readonly string[];
  onSelect: (value: string) => void;
  onClose: () => void;
  title?: string;
}

export function GenderSheet({
  visible,
  value,
  options,
  onSelect,
  onClose,
  title = 'Select Gender',
}: Props) {
  const slideAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { colors } = useAppTheme();

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, bounciness: 4, speed: 14, useNativeDriver: true }),
      ]).start();
    } else {
      slideAnim.setValue(500);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  function close(after?: () => void) {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 500, duration: 220, useNativeDriver: true }),
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
          <Text style={[s.title, { color: colors.textPrimary }]}>{title}</Text>
          {options.map((opt) => {
            const active = value === opt;
            return (
              <TouchableOpacity
                key={opt}
                style={[s.option, { borderColor: colors.borderDark }, active && s.optionActive]}
                activeOpacity={0.8}
                onPress={() => close(() => onSelect(opt))}>
                <Text style={[s.optionText, { color: colors.textPrimary }, active && s.optionTextActive]}>{opt}</Text>
                {active && <View style={s.dot} />}
              </TouchableOpacity>
            );
          })}
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionActive: { borderColor: Colors.primary, backgroundColor: 'rgba(29,100,236,0.05)' },
  optionText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  optionTextActive: { color: Colors.primary, fontFamily: FontFamily.semibold },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
});
