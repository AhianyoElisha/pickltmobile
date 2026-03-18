import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';

type ButtonVariant =
  | 'primary'      // filled blue — default CTA
  | 'outline'      // dark border, dark text (e.g. Google sign-in)
  | 'outline-primary'; // blue border, white text (e.g. onboarding Skip)

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  label: string;
  variant?: ButtonVariant;
  leftIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  variant = 'primary',
  leftIcon,
  loading = false,
  fullWidth = true,
  disabled,
  ...rest
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isOutlinePrimary = variant === 'outline-primary';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.base,
        fullWidth && styles.fullWidth,
        isPrimary && styles.primaryContainer,
        isOutlinePrimary && styles.outlinePrimaryContainer,
        !isPrimary && !isOutlinePrimary && styles.outlineContainer,
        (disabled || loading) && styles.disabled,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? Colors.white : Colors.primary} />
      ) : (
        <View style={styles.inner}>
          {leftIcon && <View style={styles.iconWrap}>{leftIcon}</View>}
          <Text
            style={[
              styles.label,
              isPrimary && styles.primaryLabel,
              isOutlinePrimary && styles.primaryLabel,
              !isPrimary && !isOutlinePrimary && styles.outlineLabel,
            ]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  primaryContainer: {
    backgroundColor: Colors.primary,
  },
  outlineContainer: {
    borderWidth: 1,
    borderColor: Colors.borderDark,
    backgroundColor: 'transparent',
  },
  outlinePrimaryContainer: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: FontFamily.semibold,
    lineHeight: 25.2,
    textAlign: 'center',
  },
  primaryLabel: {
    color: Colors.white,
  },
  outlineLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.textPrimary,
  },
});
