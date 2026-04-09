import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { CheckboxCheckedIcon, CheckboxUncheckedIcon } from '@/components/ui/language-icons';
import { FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface LanguageRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function LanguageRow({ label, selected, onPress }: LanguageRowProps) {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity style={[s.row, { borderColor: colors.borderDark }]} activeOpacity={0.7} onPress={onPress}>
      <Text style={[s.label, { color: colors.textPrimary }]}>{label}</Text>
      {selected ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  row: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 22.4,
  },
});
