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
import { MoveTypeIcon } from '@/components/ui/home-icons';
import { MOVE_TYPES } from './data';
import { fieldStyles } from './field-styles';
import { MoveTypeOption } from './types';

interface MoveTypeFieldProps {
  value: MoveTypeOption | null;
  onChange: (moveType: MoveTypeOption) => void;
}

export function MoveTypeField({ value, onChange }: MoveTypeFieldProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function openSheet() {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 4,
        speed: 14,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function closeSheet(onDone?: () => void) {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      onDone?.();
    });
  }

  function handleSelect(option: MoveTypeOption) {
    closeSheet(() => onChange(option));
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
          <MoveTypeIcon color={Colors.white} size={24} />
        </View>
        <View style={fieldStyles.textWrap}>
          <Text style={fieldStyles.label}>Move Type</Text>
          <Text style={value ? fieldStyles.value : fieldStyles.placeholder}>
            {value ? value.title : 'Select move type'}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={() => closeSheet()}>
        <View style={sheet.container}>
          {/* Fading backdrop */}
          <Animated.View
            style={[StyleSheet.absoluteFillObject, sheet.backdrop, { opacity: fadeAnim }]}
          />
          {/* Tap-to-dismiss */}
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={() => closeSheet()}
          />
          {/* Sliding sheet */}
          <Animated.View
            style={[sheet.sheet, { transform: [{ translateY: slideAnim }] }]}>
            <View style={sheet.handle} />
            <Text style={sheet.title}>Select Move Type</Text>

            {MOVE_TYPES.map((option) => {
              const isSelected = value?.id === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[sheet.option, isSelected && sheet.optionSelected]}
                  onPress={() => handleSelect(option)}
                  activeOpacity={0.8}>
                  <View style={sheet.optionTop}>
                    <Text style={[sheet.optionTitle, isSelected && sheet.optionTitleSelected]}>
                      {option.title}
                    </Text>
                    {isSelected && <View style={sheet.checkDot} />}
                  </View>
                  <Text style={sheet.optionDesc}>{option.description}</Text>
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
    backgroundColor: Colors.white,
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
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  option: {
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
  optionTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  optionTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    lineHeight: 21,
    color: Colors.textPrimary,
  },
  optionTitleSelected: {
    color: Colors.primary,
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  optionDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 18.2,
    color: Colors.textSecondary,
  },
});
