import { StyleSheet, Text, View } from 'react-native';

import { InventorySelector } from '@/components/ui/booking/inventory-selector';
import { useWizard } from '@/context/wizard-context';
import { FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

import type { ScheduledFormData } from '@/constants/wizard-types';

export function StepInventory() {
  const { state, setField } = useWizard<ScheduledFormData>();
  const { colors } = useAppTheme();
  const fd = state.formData;

  return (
    <View style={s.container}>
      <Text style={[s.subtitle, { color: colors.textSecondary, borderBottomColor: colors.divider }]}>
        Select the items you need to move. This helps us estimate the right truck size and crew.
      </Text>

      <InventorySelector
        counts={fd.inventoryCounts}
        onCountsChange={(v) => setField('inventoryCounts', v)}
        selectedCategory={fd.inventoryCategory}
        onCategoryChange={(v) => setField('inventoryCategory', v)}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 12 },
  subtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    borderBottomWidth: 0.5,
    paddingBottom: 12,
  },
});
