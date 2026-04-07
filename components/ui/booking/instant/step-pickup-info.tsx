import { StyleSheet, Text, View } from 'react-native';

import { InventorySelector } from '@/components/ui/booking/inventory-selector';
import { MapCard } from '@/components/ui/map-card';
import { useWizard } from '@/context/wizard-context';
import { FontFamily } from '@/constants/theme';

import type { InstantFormData } from '@/app/instant/index';

export function InstantStepPickupInfo() {
  const { state, setField } = useWizard<InstantFormData>();
  const fd = state.formData;

  return (
    <View style={s.container}>
      <MapCard fromName={fd.fromName} toName={fd.toName} />

      <Text style={s.sectionTitle}>Edit Pick Up And Drop off Points from the map</Text>

      <InventorySelector
        counts={fd.counts}
        onCountsChange={(v) => setField('counts', v)}
        selectedCategory={fd.selectedCategory}
        onCategoryChange={(v) => setField('selectedCategory', v)}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 12 },
  sectionTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: '#0D121C',
  },
});
