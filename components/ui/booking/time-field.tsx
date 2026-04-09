import { useEffect, useRef, useState } from 'react';
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
import { TIME_SLOTS } from './data';
import { fieldStyles } from './field-styles';
import { TimeSlot } from './types';

interface TimeFieldProps {
  value: TimeSlot | null;
  onChange: (slot: TimeSlot) => void;
}

function ClockIcon({ size = 24 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.65, lineHeight: size }}>🕐</Text>
    </View>
  );
}

export function TimeField({ value, onChange }: TimeFieldProps) {
  const { colors } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function openSheet() {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, bounciness: 4, speed: 14, useNativeDriver: true }),
    ]).start();
  }

  function closeSheet(onDone?: () => void) {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 400, duration: 220, useNativeDriver: true }),
    ]).start(() => {
      setModalVisible(false);
      onDone?.();
    });
  }

  useEffect(() => {
    if (!modalVisible) {
      slideAnim.setValue(400);
      fadeAnim.setValue(0);
    }
  }, [modalVisible]);

  return (
    <>
      <TouchableOpacity style={fieldStyles.row} onPress={openSheet} activeOpacity={0.8}>
        <View style={fieldStyles.iconWrap}>
          <ClockIcon size={22} />
        </View>
        <View style={fieldStyles.textWrap}>
          <Text style={fieldStyles.label}>Preferred Time</Text>
          <Text style={value ? fieldStyles.value : fieldStyles.placeholder}>
            {value ? `${value.label} (${value.range})` : 'Select time slot'}
          </Text>
        </View>
      </TouchableOpacity>

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
          <Animated.View
              style={[sheet.sheet, { transform: [{ translateY: slideAnim }], backgroundColor: colors.surfaceElevated }]}>
              <View style={sheet.handle} />
              <Text style={[sheet.title, { color: colors.textPrimary }]}>Preferred Time</Text>
            {TIME_SLOTS.map((slot) => {
              const isSelected = value?.id === slot.id;
              return (
                  <TouchableOpacity
                  key={slot.id}
                  style={[sheet.option, isSelected && sheet.optionSelected, !isSelected && { borderColor: colors.divider }]}
                  onPress={() => closeSheet(() => onChange(slot))}
                  activeOpacity={0.8}>
                  <View style={sheet.optionContent}>
                    <Text style={[sheet.optionLabel, { color: colors.textPrimary }, isSelected && sheet.optionLabelSelected]}>
                      {slot.label}
                    </Text>
                    <Text style={[sheet.optionRange, { color: colors.textSecondary }]}>{slot.range}</Text>
                  </View>
                  {isSelected && <View style={sheet.checkDot} />}
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const sheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 14,
    marginBottom: 10,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(29,100,236,0.05)',
  },
  optionContent: {
    gap: 2,
  },
  optionLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    lineHeight: 21,
  },
  optionLabelSelected: {
    color: Colors.primary,
  },
  optionRange: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 18.2,
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});
