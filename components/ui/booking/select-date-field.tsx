import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { CalendarGrid, formatDisplay } from '@/components/ui/booking/calendar-grid';
import { CalendarIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

function ChevronIcon({ open, color }: { open: boolean; color: string }) {
  return (
    <Svg
      width={16} height={16} viewBox="0 0 16 16" fill="none"
      style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
      <Path d="M4 6L8 10L12 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface SelectDateFieldProps {
  value: string | null;
  onChange: (date: string) => void;
  label?: string;
  hint?: string;
}

export function SelectDateField({
  value,
  onChange,
  label = 'Select Date',
  hint = 'When would you like to move?',
}: SelectDateFieldProps) {
  const [open, setOpen] = useState(false);
  const { colors } = useAppTheme();

  function handleSelect(iso: string) {
    onChange(iso);
    setOpen(false);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>

      <TouchableOpacity style={[styles.inputBox, { borderColor: colors.borderDark }]} onPress={() => setOpen((v) => !v)} activeOpacity={0.8}>
        <CalendarIcon size={18} color={colors.textSecondary} />
        <Text style={[styles.inputText, { color: colors.textPrimary }, !value && { color: colors.textSecondary }]}>
          {value ? formatDisplay(value) : 'dd/mm/yyyy'}
        </Text>
        <ChevronIcon open={open} color={colors.textSecondary} />
      </TouchableOpacity>

      {open && <CalendarGrid selected={value} onSelect={handleSelect} />}

      <Text style={[styles.hint, { color: colors.textSecondary }]}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 24.8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  inputText: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 25.6,
  },
  hint: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 18.6,
  },
});
