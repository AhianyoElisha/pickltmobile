import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { TimeInputField, ArrivalTime } from '@/components/ui/booking/time-input-field';
import { useWizard } from '@/context/wizard-context';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

import type { ScheduledFormData } from '@/constants/wizard-types';

// ── Checkbox ──────────────────────────────────────────────────────────────────

function Checkbox({ checked }: { checked: boolean }) {
  const { colors } = useAppTheme();
  return (
    <View style={[cb.box, checked ? cb.boxChecked : [cb.boxUnchecked, { borderColor: colors.textSecondary, backgroundColor: colors.surface }]]}>
      {checked && (
        <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
          <Path
            d="M2 6.5L4.5 9L10 3"
            stroke="#fff"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
  );
}

const cb = StyleSheet.create({
  box: {
    width: 20, height: 20, borderRadius: 4,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  boxChecked:   { backgroundColor: Colors.primary },
  boxUnchecked: { borderWidth: 1.2 },
});

// ── CheckboxRow ───────────────────────────────────────────────────────────────

function CheckboxRow({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity style={cr.row} onPress={onToggle} activeOpacity={0.8}>
      <Checkbox checked={checked} />
      <Text style={[cr.label, { color: colors.textPrimary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const cr = StyleSheet.create({
  row:   { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 5 },
  label: { fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 25.6, flex: 1 },
});

// ── Date formatter ────────────────────────────────────────────────────────────

function formatFullDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

// ── Step Component ────────────────────────────────────────────────────────────

export function StepMoveTiming() {
  const { colors } = useAppTheme();
  const { state, setField } = useWizard<ScheduledFormData>();
  const fd = state.formData;
  const formattedDate = formatFullDate(fd.moveDate ?? '');

  return (
    <View style={s.container}>
      {/* Move date — read-only display */}
      <View style={s.fieldGroup}>
        <Text style={[s.fieldLabel, { color: colors.textPrimary }]}>Move date</Text>
        <View style={[s.dateDisplay, { backgroundColor: colors.surface }]}>
          <Text style={[s.dateText, { color: colors.textSecondary }]}>{formattedDate || 'No date selected'}</Text>
        </View>
      </View>

      {/* Preferred Arrival Time */}
      <TimeInputField
        label="Preferred Arrival Time"
        value={fd.arrivalTime}
        onChange={(v: ArrivalTime | null) => setField('arrivalTime', v)}
      />

      {/* Optional Preferences */}
      <View style={s.optionalSection}>
        <Text style={[s.optionalTitle, { color: colors.textPrimary }]}>Optional Preferences</Text>
        <Text style={[s.optionalSubtitle, { color: colors.textSecondary }]}>Select any additional timing preferences.</Text>

        <View style={s.checkboxList}>
          <CheckboxRow
            label="Prefer the earliest possible arrival"
            checked={fd.preferEarliestArr}
            onToggle={() => setField('preferEarliestArr', !fd.preferEarliestArr)}
          />
          <CheckboxRow
            label="Avoid evening delivery"
            checked={fd.avoidEveningDel}
            onToggle={() => setField('avoidEveningDel', !fd.avoidEveningDel)}
          />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 20 },

  fieldGroup: { gap: 8 },
  fieldLabel: {
    fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 22.4,
  },
  dateDisplay: {
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 15,
  },
  dateText: {
    fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 22.4,
  },

  optionalSection: { gap: 4 },
  optionalTitle: {
    fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4,
  },
  optionalSubtitle: {
    fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 21.7, marginBottom: 8,
  },
  checkboxList: { gap: 12 },
});
