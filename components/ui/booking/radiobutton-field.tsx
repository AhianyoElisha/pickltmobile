import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

// ── Icons ─────────────────────────────────────────────────────────────────────
function CheckedCircle() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={10} fill={Colors.primary} />
      <Path
        d="M6 10L8.5 12.5L14 7.5"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function UncheckedCircle({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={9} stroke={color} strokeWidth={1} />
    </Svg>
  );
}

// ── Generic RadioButtonField ──────────────────────────────────────────────────
interface RadioButtonFieldProps {
  label?: string;
  hint?: string;
  /** Two string options, e.g. ['Yes', 'No']. First = true, second = false. */
  options?: [string, string];
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export function RadioButtonField({
  label = 'Elevator available?',
  hint,
  options = ['Yes', 'No'],
  value,
  onChange,
}: RadioButtonFieldProps) {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
      <View style={styles.rows}>
        <TouchableOpacity
          style={[styles.row, { borderColor: colors.divider }, value === true && styles.rowActive]}
          onPress={() => onChange(true)}
          activeOpacity={0.8}>
          <Text style={[styles.rowText, { color: colors.textPrimary }]}>{options[0]}</Text>
          {value === true ? <CheckedCircle /> : <UncheckedCircle color={colors.divider} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.row, { borderColor: colors.divider }, value === false && styles.rowActive]}
          onPress={() => onChange(false)}
          activeOpacity={0.8}>
          <Text style={[styles.rowText, { color: colors.textPrimary }]}>{options[1]}</Text>
          {value === false ? <CheckedCircle /> : <UncheckedCircle color={colors.divider} />}
        </TouchableOpacity>
      </View>
      {hint ? <Text style={[styles.hint, { color: colors.textSecondary }]}>{hint}</Text> : null}
    </View>
  );
}

// ── Legacy alias (keeps existing elevator-field usage working) ────────────────
export const ElevatorField = RadioButtonField;

const styles = StyleSheet.create({
  container: { gap: 12 },

  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 24.8,
  },

  rows: { gap: 12 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },

  rowActive: { borderColor: Colors.primary },

  rowText: {
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
