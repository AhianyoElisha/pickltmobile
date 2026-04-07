import { StyleSheet, Text, View } from 'react-native';

import { InfoBanner } from '@/components/ui/booking/info-banner';
import { PhotoUploadBox } from '@/components/ui/booking/photo-upload-box';
import { MapCard } from '@/components/ui/map-card';
import { FontFamily } from '@/constants/theme';
import { useWizard } from '@/context/wizard-context';
import type { InstantFormData } from '@/constants/wizard-types';

export function InstantStepAddPhotos() {
  const { state, setField } = useWizard<InstantFormData>();
  const fd = state.formData;

  return (
    <View style={s.container}>
      <MapCard hideLocationPanel />

      <Text style={s.pageHeading}>Add Move Photos</Text>

      <InfoBanner text="Photos help movers prepare the right equipment and give you an accurate quote. Add clear photos of your items." />

      <Text style={s.sectionLabel}>Main Photo</Text>
      <PhotoUploadBox
        title="Tap to add main photo"
        photos={fd.mainPhotos}
        onPhotosChange={(uris) => setField('mainPhotos', uris)}
      />

      <Text style={s.sectionLabel}>Additional Photos</Text>
      <PhotoUploadBox
        title="Add more photos"
        photos={fd.extraPhotos}
        onPhotosChange={(uris) => setField('extraPhotos', uris)}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 12 },
  pageHeading: {
    fontFamily: FontFamily.medium,
    fontSize: 20,
    lineHeight: 28,
    color: '#0D121C',
    textAlign: 'center',
  },
  sectionLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: '#0D121C',
  },
});
