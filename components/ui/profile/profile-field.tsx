import { ReactNode } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface ProfileFieldProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onPress?: () => void;
  displayValue?: string;
  leftAdornment?: ReactNode;
  rightIcon?: ReactNode;
}

export function ProfileField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  onPress,
  displayValue,
  leftAdornment,
  rightIcon,
}: ProfileFieldProps) {
  const { colors } = useAppTheme();
  const tappable = !!onPress;
  const shownText = displayValue ?? value ?? '';
  const isPlaceholder = !shownText;

  return (
    <View style={s.container}>
      <Text style={[s.label, { color: colors.textPrimary }]}>{label}</Text>
      {tappable ? (
        <TouchableOpacity style={[s.field, { borderColor: colors.borderDark }]} activeOpacity={0.7} onPress={onPress}>
          {leftAdornment}
          <Text style={[s.text, { color: colors.textPrimary }, isPlaceholder && { color: colors.textSecondary }]} numberOfLines={1}>
            {shownText || placeholder || ''}
          </Text>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={[s.field, { borderColor: colors.borderDark }]}>
          {leftAdornment}
          <TextInput
            style={[s.text, { color: colors.textPrimary }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
          {rightIcon}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 8 },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  field: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    padding: 0,
  },
});
