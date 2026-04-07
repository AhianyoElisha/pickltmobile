import { View } from 'react-native';

import { TextInputField } from '@/components/ui/booking/text-input-field';
import { RadioButtonField } from '@/components/ui/booking/radiobutton-field';
import { useWizard } from '@/context/wizard-context';

import type { ScheduledFormData } from '@/constants/wizard-types';

export function StepPickupInfo() {
  const { state, setField } = useWizard<ScheduledFormData>();
  const fd = state.formData;

  return (
    <View style={{ gap: 0 }}>
      <TextInputField
        label="Street Address*"
        hint="Enter the full pickup street address"
        value={fd.streetAddress}
        onChangeText={(v) => setField('streetAddress', v)}
        placeholder="e.g., 12 Hauptstraße, Berlin"
        autoCapitalize="words"
      />

      <TextInputField
        label="Apartment / Unit (optional)"
        hint="Floor, apartment number, or unit name"
        value={fd.apartment}
        onChangeText={(v) => setField('apartment', v)}
        placeholder="e.g., 3rd floor, Apt 12"
      />

      <TextInputField
        label="Access notes (optional)"
        hint="Any details that will help our team access the location"
        value={fd.accessNotes}
        onChangeText={(v) => setField('accessNotes', v)}
        placeholder="e.g., narrow corridor, steep stairs, construction at entrance"
        multiline
        numberOfLines={3}
      />

      <RadioButtonField
        label="Loading zone required? (German Haltverbot permit)"
        hint="Which floor is the pickup address on?"
        value={fd.loadingZone}
        onChange={(v) => setField('loadingZone', v)}
        options={['Yes', 'No']}
      />
    </View>
  );
}
