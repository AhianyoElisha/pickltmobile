import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  secureTextEntry?: boolean;
}

export function FormField({ label, secureTextEntry, ...rest }: FormFieldProps) {
  const { colors } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          { borderColor: colors.borderDark, backgroundColor: colors.surface },
          isFocused && styles.inputRowFocused,
        ]}>
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={hidden}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden((h) => !h)} hitSlop={8}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 8,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 16,
  },
  inputRowFocused: {
    borderColor: Colors.primary,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    padding: 0,
  },
});
