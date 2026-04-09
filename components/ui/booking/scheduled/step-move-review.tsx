import { useState } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { MapCard } from '@/components/ui/map-card';
import {
  CardHeading,
  DetailRow,
  ReviewCard,
  SmallCheckedIcon,
} from '@/components/ui/booking/move-summary-cards';
import { useWizard } from '@/context/wizard-context';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

import type { ScheduledFormData } from '@/constants/wizard-types';

// ── Additional services labels ────────────────────────────────────────────────

const SERVICE_LABELS: Record<string, string> = {
  disassembly:         'Furniture Disassembly',
  assembly:            'Furniture Assembly',
  appliance_disconnect: 'Appliance Disconnect',
  appliance_connect:   'Appliance Connect',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseInventory(counts: Record<string, number>): string[] {
  return Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([key, n]) => {
      const item = key.includes(':') ? key.split(':').slice(1).join(':') : key;
      return `${item} × ${n}`;
    });
}

function parseServices(map: Record<string, boolean>): string[] {
  return Object.entries(map)
    .filter(([, v]) => v)
    .map(([id]) => SERVICE_LABELS[id] ?? id);
}

function formatPayment(method: string, selectedCardId: string | null): string {
  if (method === 'cash' || !selectedCardId) return 'Cash';
  const parts = selectedCardId.replace('card_', '').split('_');
  return parts.length >= 2 ? `${parts[0]} ••••${parts[1]}` : method;
}

function or(val: string | undefined | null, fallback = 'Not specified') {
  return val && val.trim() ? val : fallback;
}

// ── Checkbox ──────────────────────────────────────────────────────────────────

function Checkbox({ checked }: { checked: boolean }) {
  const { colors } = useAppTheme();
  return (
    <View style={[chk.box, checked ? chk.boxChecked : [chk.boxUnchecked, { borderColor: colors.textSecondary, backgroundColor: colors.surface }]]}>
      {checked && (
        <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
          <Path
            d="M2 6.5L4.5 9L10 3"
            stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
  );
}

const chk = StyleSheet.create({
  box: { width: 20, height: 20, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 3 },
  boxChecked:   { backgroundColor: Colors.primary },
  boxUnchecked: { borderWidth: 1.2 },
});

// ── Photo placeholder ─────────────────────────────────────────────────────────

function PhotoPlaceholder({ height, borderRadius = 8, large = false }: { height: number; borderRadius?: number; large?: boolean }) {
  const { colors } = useAppTheme();
  return (
    <View style={[s.photoBg, { height, borderRadius, backgroundColor: colors.surfaceElevated }]}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          stroke="#9E9E9E" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
        />
      </Svg>
      {large && <Text style={[s.noImageText, { color: colors.textSecondary }]}>No Image Preview</Text>}
    </View>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface StepMoveReviewProps {
  onConsentChange: (canProceed: boolean) => void;
}

// ── Step Component ────────────────────────────────────────────────────────────

export function StepMoveReview({ onConsentChange }: StepMoveReviewProps) {
  const { state } = useWizard<ScheduledFormData>();
  const fd = state.formData;
  const { colors } = useAppTheme();

  const [agreeTerms,   setAgreeTerms]   = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  function toggleTerms() {
    const next = !agreeTerms;
    setAgreeTerms(next);
    onConsentChange(next && agreePrivacy);
  }

  function togglePrivacy() {
    const next = !agreePrivacy;
    setAgreePrivacy(next);
    onConsentChange(agreeTerms && next);
  }

  // ── Derived data ────────────────────────────────────────────────────────
  const inventoryItems   = parseInventory(fd.inventoryCounts);
  const selectedServices = parseServices(fd.checkedServices);
  const paymentLabel     = formatPayment(fd.selectedPayment, fd.selectedCardId);
  const allPhotos        = [...fd.mainPhotos, ...fd.extraPhotos];

  return (
    <View style={s.container}>
      {/* ── Photo strip ─────────────────────────────────────────────────── */}
      <View style={s.photoSection}>
        {allPhotos[0] ? (
          <Image source={{ uri: allPhotos[0] }} style={s.mainPhoto} resizeMode="cover" />
        ) : (
          <PhotoPlaceholder height={200} borderRadius={12} large />
        )}
        <View style={s.photoRow}>
          {[0, 1, 2, 3].map((i) => {
            const uri     = allPhotos[i + 1];
            const extras  = allPhotos.length - 5;
            const showBadge = i === 3 && extras > 0;
            return uri ? (
              <View key={i} style={s.thumb}>
                <Image source={{ uri }} style={s.thumbImg} resizeMode="cover" />
                <View style={s.photoOverlay} />
                {showBadge && (
                  <View style={s.photoLabelWrap}>
                    <Text style={s.photoLabel}>+{extras}</Text>
                  </View>
                )}
              </View>
            ) : (
              <PhotoPlaceholder key={i} height={61} borderRadius={8} />
            );
          })}
        </View>
      </View>

      {/* ── Map section ─────────────────────────────────────────────────── */}
      <Text style={[s.mapLabel, { color: colors.textPrimary }]}>Pick Up And Drop off Points</Text>
      <MapCard fromName={fd.fromName} toName={fd.toName} hideLocationPanel />

      {/* ── Card A: Pick Up Address ────────────────────────────────────── */}
      <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.borderDark }]}>
        <CardHeading title="Pick Up Address" />
        <View style={s.cardRows}>
          <DetailRow label="Address"  value={or(fd.streetAddress)} />
          <DetailRow label="Unit"     value={or(fd.apartment)} />
          <DetailRow label="Floor"    value={or(fd.floorLevel)} dashed />
          <DetailRow label="Elevator" value={fd.hasElevator === true ? 'Yes' : fd.hasElevator === false ? 'No' : 'Not specified'} />
          <DetailRow label="Parking"  value={or(fd.parkingOption)} border={false} />
        </View>
      </View>

      {/* ── Card B: Drop off Address ───────────────────────────────────── */}
      <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.borderDark }]}>
        <CardHeading title="Drop off Address" />
        <View style={s.cardRows}>
          <DetailRow label="Address"  value={or(fd.dropStreetAddress)} />
          <DetailRow label="Unit"     value={or(fd.dropApartment)} />
          <DetailRow label="Floor"    value={or(fd.dropFloorLevel)} dashed />
          <DetailRow label="Elevator" value={fd.dropHasElevator === true ? 'Yes' : fd.dropHasElevator === false ? 'No' : 'Not specified'} />
          <DetailRow label="Parking"  value={or(fd.dropParkingOption)} border={false} />
        </View>
      </View>

      {/* ── Card C: Move Details ───────────────────────────────────────── */}
      <View style={[s.card, s.cardPadH15, { backgroundColor: colors.surface, borderColor: colors.borderDark }]}>
        <CardHeading title="Move Details" subtitle="Your selected services and preferences" />
        <View style={s.cardRows}>
          <DetailRow
            label="Inventory"
            value={
              inventoryItems.length > 0 ? (
                <View style={s.bulletList}>
                  {inventoryItems.map((item) => (
                    <Text key={item} style={[s.rowValue, s.bulletItem]}>{'• ' + item}</Text>
                  ))}
                </View>
              ) : (
                'Not specified'
              )
            }
          />
          <DetailRow label="Packing service" value="Not specified" />
          <DetailRow
            label="Arrival window"
            value={or(
              fd.arrivalTime
                ? `${String(fd.arrivalTime.hour).padStart(2, '0')}:${String(fd.arrivalTime.minute).padStart(2, '0')} ${fd.arrivalTime.period}`
                : null,
            )}
            dashed
          />
          <DetailRow label="Crew size" value="Not specified" />
          <DetailRow label="Vehicle"   value="Not specified" border={false} />
        </View>
      </View>

      {/* ── Card D: Additional services ────────────────────────────────── */}
      <View style={[s.card, s.cardPadH15, { backgroundColor: colors.surface, borderColor: colors.borderDark }]}>
        <CardHeading title="Additional services" subtitle="Extra services you've selected" />
        <View style={s.servicesList}>
          {selectedServices.length > 0 ? (
            selectedServices.map((svc) => (
              <View key={svc} style={[s.row, s.rowSolidNoBorder]}>
                <SmallCheckedIcon />
                <Text style={[s.rowLabel, { flex: 1, marginLeft: 5 }]}>{svc}</Text>
              </View>
            ))
          ) : (
            <View style={[s.row, s.rowSolidNoBorder]}>
              <Text style={s.rowLabel}>None selected</Text>
            </View>
          )}
        </View>
      </View>

      {/* ── Card E: Pricing ────────────────────────────────────────────── */}
      <View style={[s.card, s.cardPadH15, { backgroundColor: colors.surface, borderColor: colors.borderDark }]}>
        <View style={s.pricingHeader}>
          <View>
            <Text style={[s.estimatedLabel, { color: colors.textSecondary }]}>Estimated Total</Text>
            <Text style={s.estimatedAmount}>€115</Text>
          </View>
          <Text style={[s.pricingNote, { color: colors.textSecondary }]}>Final price confirmed after review</Text>
        </View>
        <View style={s.cardRows}>
          <DetailRow label="Base rate (Light, 0.0 km)" value="€0.00" />
          <DetailRow label="Floor surcharge" value="€15.00" dashed />
          <DetailRow
            label="Additional services"
            value={`€${selectedServices.length > 0 ? (selectedServices.length * 50).toFixed(2) : '0.00'}`}
          />
          <View style={[s.row, s.rowSolidNoBorder]}>
            <Text style={[s.rowLabel, s.totalLabel]}>Total</Text>
            <Text style={s.rowValue}>
              €{(15 + selectedServices.length * 50).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* ── Card F: Payment method ─────────────────────────────────────── */}
      <View style={[s.card, s.cardPadH15, { backgroundColor: colors.surface, borderColor: colors.borderDark }]}>
        <View style={s.cardRows}>
          <View style={[s.row, s.rowSolidNoBorder]}>
            <Text style={[s.rowLabel, s.paymentMethodLabel]}>Payment method</Text>
            <Text style={[s.rowValue, { color: colors.textPrimary }]}>{paymentLabel}</Text>
          </View>
        </View>
      </View>

      {/* ── Consent checkboxes ─────────────────────────────────────────── */}
      <View style={s.consentSection}>
        <TouchableOpacity style={s.consentRow} onPress={toggleTerms} activeOpacity={0.8}>
          <Checkbox checked={agreeTerms} />
          <Text style={[s.consentText, { color: colors.textSecondary }]}>
            {'I confirm the details and agree to the '}
            <Text
              style={s.consentLink}
              onPress={() => Linking.openURL('https://pick-lt.vercel.app/terms')}>
              terms & conditions
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.consentRow} onPress={togglePrivacy} activeOpacity={0.8}>
          <Checkbox checked={agreePrivacy} />
          <Text style={[s.consentText, { color: colors.textSecondary }]}>
            {'I acknowledge the '}
            <Text
              style={s.consentLink}
              onPress={() => Linking.openURL('https://pick-lt.vercel.app/privacy')}>
              privacy policy
            </Text>
            {' (GDPR)'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  container: { gap: 15 },

  // Photo strip
  photoSection: { gap: 8 },
  mainPhoto:    { width: '100%', height: 200, borderRadius: 12 },
  photoRow:     { flexDirection: 'row', gap: 8 },
  thumb:        { flex: 1, height: 61, borderRadius: 8, overflow: 'hidden' },
  thumbImg:     { width: '100%', height: '100%' },
  photoBg: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  noImageText: { fontFamily: FontFamily.regular, fontSize: 12 },
  photoOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  photoLabelWrap: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  photoLabel: { fontFamily: FontFamily.semibold, fontSize: 18, color: Colors.white },

  // Map label
  mapLabel: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 20 },

  // Cards
  card: {
    borderWidth: 0.5,
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6, gap: 12,
  },
  cardPadH15: { paddingHorizontal: 15 },
  cardRows:   { gap: 0 },

  // Detail rows
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowSolidNoBorder: { paddingBottom: 12, paddingTop: 4 },
  rowLabel: {
    fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 20, color: Colors.textSecondary, flex: 1,
  },
  rowValue: {
    fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 24,
    textAlign: 'right', flexShrink: 1,
  },
  bulletList:  { alignItems: 'flex-end', gap: 2 },
  bulletItem:  { textAlign: 'right' },
  servicesList: { gap: 0 },

  // Pricing card
  pricingHeader: { gap: 4 },
  estimatedLabel: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 26 },
  estimatedAmount: { fontFamily: FontFamily.bold, fontSize: 18, lineHeight: 26, color: Colors.primary },
  pricingNote: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 26 },
  totalLabel: { fontFamily: FontFamily.bold, color: Colors.textPrimary },
  paymentMethodLabel: { fontFamily: FontFamily.bold },

  // Consent
  consentSection: { gap: 16 },
  consentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  consentText: { fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 25.6, flex: 1 },
  consentLink: { color: Colors.primary, textDecorationLine: 'underline' },
});
