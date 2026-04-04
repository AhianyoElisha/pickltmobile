import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';

import { Colors, FontFamily } from '@/constants/theme';

// ── Chevron icon ──────────────────────────────────────────────────────────────
function ChevronDown() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4 6L8 10L12 6"
        stroke={Colors.textSecondary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
interface DropdownFieldProps {
  label: string;
  hint?: string;
  value: string | null;
  placeholder: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

export function DropdownField({
  label,
  hint,
  value,
  placeholder,
  options,
  onChange,
}: DropdownFieldProps) {
  const [sheetVisible, setSheetVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (sheetVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim,  { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, bounciness: 4, speed: 14, useNativeDriver: true }),
      ]).start();
    } else {
      slideAnim.setValue(500);
      fadeAnim.setValue(0);
    }
  }, [sheetVisible]);

  function openSheet() {
    setSheetVisible(true);
  }

  function closeSheet(onDone?: () => void) {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 500, duration: 220, useNativeDriver: true }),
    ]).start(() => {
      setSheetVisible(false);
      onDone?.();
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.inputBox} onPress={openSheet} activeOpacity={0.8}>
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <ChevronDown />
      </TouchableOpacity>

      {hint ? <Text style={styles.hint}>{hint}</Text> : null}

      <Modal
        visible={sheetVisible}
        transparent
        animationType="none"
        onRequestClose={() => closeSheet()}>
        <View style={sh.container}>
          <Animated.View style={[StyleSheet.absoluteFillObject, sh.backdrop, { opacity: fadeAnim }]} />
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={() => closeSheet()}
          />
          <Animated.View style={[sh.sheet, { transform: [{ translateY: slideAnim }] }]}>
            <View style={sh.handle} />
            <Text style={sh.title}>{label}</Text>
            {options.map((opt) => {
              const active = value === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[sh.option, active && sh.optionActive]}
                  onPress={() => closeSheet(() => onChange(opt))}
                  activeOpacity={0.8}>
                  <Text style={[sh.optionText, active && sh.optionTextActive]}>{opt}</Text>
                  {active && <View style={sh.dot} />}
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },

  label: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 24.8,
    color: Colors.textPrimary,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#CDD5DF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },

  inputText: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 25.6,
    color: Colors.textPrimary,
  },

  placeholder: { color: Colors.textSecondary },

  hint: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 18.6,
    color: Colors.textSecondary,
  },
});

const sh = StyleSheet.create({
  container:  { flex: 1, justifyContent: 'flex-end' },
  backdrop:   { backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignSelf: 'center', marginTop: 12, marginBottom: 16,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.textPrimary,
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
  optionActive:     { borderColor: Colors.primary, backgroundColor: 'rgba(29,100,236,0.05)' },
  optionText:       { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6, color: Colors.textPrimary },
  optionTextActive: { color: Colors.primary, fontFamily: FontFamily.semibold },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
});
