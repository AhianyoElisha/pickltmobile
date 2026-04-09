import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { InfoBanner } from '@/components/ui/booking/info-banner';
import { PhotoUploadBox } from '@/components/ui/booking/photo-upload-box';
import { useWizard } from '@/context/wizard-context';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

import type { ScheduledFormData } from '@/constants/wizard-types';

// ── Additional services data ──────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'disassembly',
    title: 'Furniture disassembly',
    description: 'We disassemble beds, tables before loading',
    defaultChecked: true,
  },
  {
    id: 'assembly',
    title: 'Furniture assembly',
    description: 'We assemble furniture at new location',
    defaultChecked: false,
  },
  {
    id: 'appliance_disconnect',
    title: 'Appliance disconnect',
    description: 'Disconnect washing machine, dishwasher etc',
    defaultChecked: false,
  },
  {
    id: 'appliance_connect',
    title: 'Appliance connect',
    description: 'Reconnect appliances at new location',
    defaultChecked: false,
  },
] as const;

export { SERVICES as ADDITIONAL_SERVICES };

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
  box:          { width: 20, height: 20, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  boxChecked:   { backgroundColor: Colors.primary },
  boxUnchecked: { borderWidth: 1.2 },
});

// ── ServiceCheckboxRow ────────────────────────────────────────────────────────

function ServiceCheckboxRow({
  title, description, checked, onToggle,
}: {
  title: string; description: string; checked: boolean; onToggle: () => void;
}) {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity style={sc.row} onPress={onToggle} activeOpacity={0.8}>
      <Checkbox checked={checked} />
      <View style={sc.textCol}>
        <Text style={[sc.title, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[sc.description, { color: colors.textSecondary }]}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const sc = StyleSheet.create({
  row:         { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  textCol:     { flex: 1, gap: 2 },
  title:       { fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 25.6 },
  description: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 19.6 },
});

// ── Step Component ────────────────────────────────────────────────────────────

export function StepAdditionalServices() {
  const { colors } = useAppTheme();
  const { state, setField } = useWizard<ScheduledFormData>();
  const fd = state.formData;

  function toggleService(id: string) {
    setField('checkedServices', { ...fd.checkedServices, [id]: !fd.checkedServices[id] });
  }

  return (
    <View style={s.container}>
      {/* ── Photos section ─────────────────────────────────────────────── */}
      <Text style={[s.pageHeading, { color: colors.textPrimary }]}>Add Inventory Photos</Text>

      <InfoBanner text="Upload photos of the items you want to move. This helps the mover come prepared with the right equipment and gives them a clear idea of the job." />

      <View style={s.photoSection}>
        <Text style={[s.sectionLabel, { color: colors.textPrimary }]}>Main Photo</Text>
        <PhotoUploadBox title="Tap to add main photo" photos={fd.mainPhotos} onPhotosChange={(v) => setField('mainPhotos', v)} />
      </View>

      <View style={s.photoSection}>
        <Text style={[s.sectionLabel, { color: colors.textPrimary }]}>Add Photos</Text>
        <PhotoUploadBox title="Add more photos" photos={fd.extraPhotos} onPhotosChange={(v) => setField('extraPhotos', v)} />
      </View>

      {/* ── Additional Services section ────────────────────────────────── */}
      <View style={s.servicesSection}>
        <Text style={[s.servicesTitle, { color: colors.textPrimary }]}>Additional Services</Text>
        <Text style={[s.servicesSubtitle, { color: colors.textSecondary }]}>These are standard offerings from German movers.</Text>

        <View style={s.servicesList}>
          {SERVICES.map((service) => (
            <ServiceCheckboxRow
              key={service.id}
              title={service.title}
              description={service.description}
              checked={fd.checkedServices[service.id] ?? false}
              onToggle={() => toggleService(service.id)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 16 },
  pageHeading: {
    fontFamily: FontFamily.semibold, fontSize: 20, lineHeight: 28,
    textAlign: 'center',
  },
  photoSection: { gap: 8 },
  sectionLabel: {
    fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6,
  },
  servicesSection: { gap: 12 },
  servicesTitle: {
    fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4,
  },
  servicesSubtitle: {
    fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 21.7,
    marginTop: -4,
  },
  servicesList: { gap: 25 },
});
