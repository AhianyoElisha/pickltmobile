import { useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';

interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
}

export function OtpInput({ value, onChange, length = 4 }: OtpInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const digits = value.split('');
  const activeIndex = digits.length < length ? digits.length : length - 1;

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Backspace' && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleChange = (text: string) => {
    // Only keep digits, respect max length
    const cleaned = text.replace(/\D/g, '').slice(0, length);
    onChange(cleaned);
  };

  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={1}
      onPress={() => inputRef.current?.focus()}>
      {Array.from({ length }).map((_, i) => {
        const char = digits[i] ?? '';
        const isFilled = i < digits.length;
        const isActive = focused && i === activeIndex && digits.length < length;
        const isLastFilled = focused && i === digits.length - 1 && digits.length > 0;

        return (
          <View
            key={i}
            style={[
              styles.cell,
              isFilled && !isLastFilled && styles.cellFilled,
              isLastFilled && styles.cellActive,
              isActive && styles.cellCursor,
            ]}>
            <Text
              style={[
                styles.cellText,
                isLastFilled && styles.cellTextActive,
                isActive && styles.cellTextCursor,
              ]}>
              {isActive ? '|' : char}
            </Text>
          </View>
        );
      })}

      {/* Hidden real TextInput */}
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={handleChange}
        onKeyPress={handleKeyPress}
        keyboardType="number-pad"
        maxLength={length}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        caretHidden
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  cell: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFilled: {
    borderColor: Colors.borderDark,
    backgroundColor: Colors.white,
  },
  cellActive: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  cellCursor: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  cellText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  cellTextActive: {
    color: Colors.white,
  },
  cellTextCursor: {
    color: Colors.primary,
    fontSize: 20,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
