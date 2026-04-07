import { View } from 'react-native';

import { TextInputField } from '@/components/ui/booking/text-input-field';
import { RadioButtonField } from '@/components/ui/booking/radiobutton-field';
import { DropdownField } from '@/components/ui/booking/dropdown-field';
import { FLOOR_LEVELS, PARKING_OPTIONS } from '@/components/ui/booking/data';
import { useWizard } from '@/context/wizard-context';

import type { ScheduledFormData } from '@/constants/wizard-types';

export function StepDropoffInfo() {
  const { state, setField } = useWizard<ScheduledFormData>();
  const fd = state.formData;

  return (
    <View style={{ gap: 0 }}>
      <TextInputField
        label="Street Address*"
        hint="Enter the full drop off street address"
        value={fd.dropStreetAddress}
        onChangeText={(v) => setField('dropStreetAddress', v)}
        placeholder="e.g., 12 Hauptstraße, Berlin"
        autoCapitalize="words"
      />

      <TextInputField
        label="Apartment / Unit (optional)"
        hint="Floor, apartment number, or unit name"
        value={fd.dropApartment}
        onChangeText={(v) => setField('dropApartment', v)}
        placeholder="e.g., 3rd floor, Apt 12"
      />

      <TextInputField
        label="Access notes (optional)"
        hint="Any details that will help our team access the location"
        value={fd.dropAccessNotes}
        onChangeText={(v) => setField('dropAccessNotes', v)}
        placeholder="e.g., narrow corridor, steep stairs, construction at entrance"
        multiline
        numberOfLines={3}
      />

      <DropdownField
        label="Floor level"
        hint="Which floor is the drop off address on?"
        value={fd.dropFloorLevel}
        placeholder="Select floor"
        options={FLOOR_LEVELS}
        onChange={(v) => setField('dropFloorLevel', v)}
      />

      <RadioButtonField
        label="Elevator available?"
        value={fd.dropHasElevator}
        onChange={(v) => setField('dropHasElevator', v)}
      />

      <DropdownField
        label="Parking Situation"
        hint="Availability of parking near the building for the moving truck"
        value={fd.dropParkingOption}
        placeholder="Select parking situation"
        options={PARKING_OPTIONS}
        onChange={(v) => setField('dropParkingOption', v)}
      />
    </View>
  );
}
