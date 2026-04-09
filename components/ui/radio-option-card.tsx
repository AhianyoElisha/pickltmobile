import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface RadioOptionCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  maskedValue: string;
  selected: boolean;
  onPress: () => void;
}

export function RadioOptionCard({
  iconName,
  title,
  maskedValue,
  selected,
  onPress,
}: RadioOptionCardProps) {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: colors.borderDark }]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.iconAndText}>
        <View style={styles.iconWrap}>
          <Ionicons name={iconName} size={20} color={Colors.white} />
        </View>
        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
          <Text style={[styles.maskedValue, { color: colors.textSecondary }]}>{maskedValue}</Text>
        </View>
      </View>
      {/* Radio button */}
      <View style={[styles.radio, { borderColor: colors.borderDark }, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: 'rgba(99,129,205,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  maskedValue: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});
