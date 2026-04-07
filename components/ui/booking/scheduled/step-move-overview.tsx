import { StyleSheet, Text, View } from 'react-native';

import { MapCard } from '@/components/ui/map-card';
import { SelectDateField } from '@/components/ui/booking/select-date-field';
import { DropdownField } from '@/components/ui/booking/dropdown-field';
import { ElevatorField } from '@/components/ui/booking/radiobutton-field';
import { BUILDING_TYPES, FLOOR_LEVELS, PARKING_OPTIONS } from '@/components/ui/booking/data';
import { useWizard } from '@/context/wizard-context';
import { FontFamily } from '@/constants/theme';

import type { ScheduledFormData } from '@/constants/wizard-types';

export function StepMoveOverview() {
  const { state, setField } = useWizard<ScheduledFormData>();
  const fd = state.formData;

  return (
    <View style={s.container}>
      <MapCard fromName={fd.fromName} toName={fd.toName} />

      <Text style={s.mapSubtitle}>Choose Pick Up And Drop off Points</Text>

      <View style={s.form}>
        <SelectDateField
          value={fd.moveDate}
          onChange={(v) => setField('moveDate', v)}
        />

        <DropdownField
          label="Building type"
          hint="Select the type of building or space to move"
          value={fd.buildingType}
          placeholder="Select a type"
          options={BUILDING_TYPES}
          onChange={(v) => setField('buildingType', v)}
        />

        <DropdownField
          label="Floor level"
          hint="Which floor is the pickup address on?"
          value={fd.floorLevel}
          placeholder="Select floor"
          options={FLOOR_LEVELS}
          onChange={(v) => setField('floorLevel', v)}
        />

        <ElevatorField
          value={fd.hasElevator}
          onChange={(v) => setField('hasElevator', v)}
        />

        <DropdownField
          label="Parking Situation"
          hint="Availability of parking near the building for the moving truck"
          value={fd.parkingOption}
          placeholder="Select parking situation"
          options={PARKING_OPTIONS}
          onChange={(v) => setField('parkingOption', v)}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 16 },
  mapSubtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'center',
  },
  form: { gap: 20 },
});
