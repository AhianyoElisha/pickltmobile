import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';
import { formatDate, getUpcomingDates } from './data';
import { fieldStyles } from './field-styles';

interface DateFieldProps {
  value: string | null;   // ISO 'YYYY-MM-DD'
  onChange: (date: string) => void;
}

const DATES = getUpcomingDates(14);

function CalendarIcon({ size = 24 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.65, lineHeight: size }}>📅</Text>
    </View>
  );
}

export function DateField({ value, onChange }: DateFieldProps) {
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
          <CalendarIcon size={22} />
        </View>
        <View style={fieldStyles.textWrap}>
          <Text style={fieldStyles.label}>Move Date</Text>
          <Text style={value ? fieldStyles.value : fieldStyles.placeholder}>
            {value ? formatDate(value) : 'Select date'}
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
            <Text style={[sheet.title, { color: colors.textPrimary }]}>Select Move Date</Text>

            <FlatList
              data={DATES}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = value === item;
                return (
                  <TouchableOpacity
                    style={[sheet.option, isSelected && sheet.optionSelected]}
                    onPress={() => closeSheet(() => onChange(item))}
                    activeOpacity={0.8}>
                    <Text style={[sheet.optionText, { color: colors.textPrimary }, isSelected && sheet.optionTextSelected]}>
                      {formatDate(item)}
                    </Text>
                    {isSelected && <View style={sheet.checkDot} />}
                  </TouchableOpacity>
                );
              }}
                ItemSeparatorComponent={() => <View style={[sheet.separator, { backgroundColor: colors.divider }]} />}
            />
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
    maxHeight: '65%',
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
    marginBottom: 12,
  },
  option: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionSelected: {},
  optionText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontFamily: FontFamily.semibold,
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  separator: {
    height: 1,
  },
});
