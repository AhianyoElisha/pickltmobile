import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CardHeading,
  DetailRow,
  ReviewCard,
  SmallCheckedIcon,
} from '@/components/ui/booking/move-summary-cards';
import { Colors, FontFamily } from '@/constants/theme';

// ── Helpers ───────────────────────────────────────────────────────────────────

function parsePhotos(json: string): string[] {
  try { return JSON.parse(json || '[]'); } catch { return []; }
}

function parseInventory(json: string): Array<{ label: string }> {
  try {
    const counts: Record<string, number> = JSON.parse(json || '{}');
    return Object.entries(counts)
      .filter(([, n]) => n > 0)
      .map(([key, n]) => {
        const item = key.includes(':') ? key.split(':').slice(1).join(':') : key;
        return { label: `${n} x ${item}` };
      });
  } catch {
    return [];
  }
}

const SERVICE_LABELS: Record<string, string> = {
  disassembly:          'Furniture Disassembly',
  assembly:             'Furniture Assembly',
  appliance_disconnect: 'Appliance Disconnect',
  appliance_connect:    'Appliance Connect',
};

function parseServices(json: string): string[] {
  try {
    const map: Record<string, boolean> = JSON.parse(json || '{}');
    return Object.entries(map)
      .filter(([, v]) => v)
      .map(([id]) => SERVICE_LABELS[id] ?? id);
  } catch {
    return [];
  }
}

function formatPayment(method: string): string {
  if (!method || method === 'cash') return 'Cash';
  const parts = method.replace('card_', '').split('_');
  if (parts.length >= 2) return `${parts[0]} ••••${parts[1]}`;
  return method;
}

function or(val: string | undefined, fallback = 'Not specified') {
  return val && val.trim() ? val : fallback;
}

// ── Local icons ───────────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M4 10h12M11 5l5 5-5 5"
        stroke={Colors.textPrimary}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ShareIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 3v10M6 7l4-4 4 4"
        stroke={Colors.textPrimary}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 13v3a1 1 0 001 1h10a1 1 0 001-1v-3"
        stroke={Colors.textPrimary}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BackArrowIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15 10H5M10 5l-5 5 5 5"
        stroke={Colors.textPrimary}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function MapPinIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 1.5C5.79086 1.5 4 3.29086 4 5.5C4 8.5 8 14.5 8 14.5C8 14.5 12 8.5 12 5.5C12 3.29086 10.2091 1.5 8 1.5Z"
        fill={Colors.textSecondary}
      />
      <Circle cx={8} cy={5.5} r={1.5} fill="white" />
    </Svg>
  );
}

function LocationPinIcon() {
  // Exact path from Figma asset imgVector (node I77:3541) — viewBox 0 0 12.375 15.7498
  // Compound path: outer pin body + inner circle hole, rendered with evenodd to create the hole
  return (
    <Svg width={14} height={18} viewBox="0 0 12.375 15.7498" fill="none">
      <Path
        fillRule="evenodd"
        d="M6.1875 0C4.54704 0.00186098 2.97431 0.654354 1.81433 1.81433C0.654354 2.97431 0.00186098 4.54704 0 6.1875C0 11.482 5.625 15.4807 5.86477 15.648C5.95934 15.7143 6.07202 15.7498 6.1875 15.7498C6.30298 15.7498 6.41566 15.7143 6.51023 15.648C6.75 15.4807 12.375 11.482 12.375 6.1875C12.3731 4.54704 11.7206 2.97431 10.5607 1.81433C9.40069 0.654354 7.82796 0.00186098 6.1875 0ZM6.1875 3.9375C6.63251 3.9375 7.06752 4.06946 7.43753 4.31669C7.80754 4.56393 8.09593 4.91533 8.26623 5.32646C8.43653 5.7376 8.48108 6.19 8.39427 6.62645C8.30745 7.06291 8.09316 7.46382 7.77849 7.77849C7.46382 8.09316 7.06291 8.30745 6.62645 8.39427C6.19 8.48108 5.7376 8.43653 5.32646 8.26623C4.91533 8.09593 4.56393 7.80754 4.31669 7.43753C4.06946 7.06752 3.9375 6.63251 3.9375 6.1875C3.9375 5.59076 4.17455 5.01847 4.59651 4.59651C5.01847 4.17455 5.59076 3.9375 6.1875 3.9375Z"
        fill="#1D64EC"
      />
    </Svg>
  );
}

function MapPinMarkerIcon() {
  // Reconstructed from Figma imgLocation (node 77:3547) — viewBox 0 0 36 36.9053
  // Structure: blue circle head (r=12.5 @ center 18,12.5) + blue spike triangle + white inner circle with ring
  // (Shadow blur ellipses omitted — react-native-svg has no filter support)
  return (
    <Svg width={32} height={35} viewBox="0 0 36 36.9053" fill="none">
      <Ellipse cx={17.5852} cy={29.8507} rx={9.35084} ry={1.33583} fill="#56BDAC" opacity={0.35} />
      <Ellipse cx={18} cy={31.4053} rx={16} ry={3.5} fill="#19CA71" opacity={0.1} />
      <Circle cx={17.585} cy={12.5} r={12.5} fill="#1D64EC" />
      <Path d="M17.585 30.5556L21.1934 22.2222H13.9765L17.585 30.5556Z" fill="#1D64EC" />
      <Circle cx={17.667} cy={12.3848} r={8.5196} fill="white" stroke="#1D1D1D" strokeWidth={1.03972} />
    </Svg>
  );
}

function ImagePlaceholder({ style }: { style?: object }) {
  return (
    <View style={[s.imgPlaceholder, style]}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          stroke="#9E9E9E"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function MoveDetailsScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    fromName: string; fromAddress: string;
    toName: string;   toAddress: string;
    moveType: string; moveDate: string;
    floorLevel: string; hasElevator: string; parkingOption: string;
    streetAddress: string; apartment: string;
    dropStreetAddress: string; dropApartment: string;
    dropFloorLevel: string; dropHasElevator: string; dropParkingOption: string;
    inventory: string;
    arrivalTime: string;
    additionalServices: string;
    mainPhotos: string;
    extraPhotos: string;
    paymentMethod: string;
  }>();

  // Derived data
  const allPhotos      = [...parsePhotos(params.mainPhotos ?? ''), ...parsePhotos(params.extraPhotos ?? '')];
  const inventoryItems = parseInventory(params.inventory ?? '');
  const services       = parseServices(params.additionalServices ?? '');
  const paymentLabel   = formatPayment(params.paymentMethod ?? 'cash');
  const heroUri        = allPhotos[0] ?? null;
  const galleryPhotos  = allPhotos.slice(1);

  // City names (use fromName / toName, fall back to first word of address)
  const fromCity = params.fromName || (params.fromAddress ?? '').split(',')[0] || 'Origin';
  const toCity   = params.toName   || (params.toAddress   ?? '').split(',')[0] || 'Destination';

  return (
    <View style={s.root}>
      {/* ── Hero image ────────────────────────────────────────────────────── */}
      <View style={s.hero}>
        {heroUri ? (
          <Image source={{ uri: heroUri }} style={s.heroImg} resizeMode="cover" />
        ) : (
          <ImagePlaceholder style={s.heroImg} />
        )}
        {/* Dark overlay */}
        <View style={s.heroOverlay} />

        {/* Header overlaid on image */}
        <View style={[s.headerRow, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity style={s.circleBtn} onPress={() => router.back()} activeOpacity={0.8}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Detail</Text>
          <TouchableOpacity style={s.circleBtn} activeOpacity={0.8}>
            <ShareIcon />
          </TouchableOpacity>
        </View>

        {/* Photo dots indicator */}
        <View style={s.dotsRow}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[s.dot, i === 0 && s.dotActive]} />
          ))}
        </View>

        {/* Bookmark / save button */}
        <TouchableOpacity style={s.saveBtn} activeOpacity={0.8}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"
              stroke={Colors.textPrimary}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* ── Scrollable content ────────────────────────────────────────────── */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ── Status badges + route ──────────────────────────────────────── */}
        <View style={s.routeSection}>
          {/* Badges */}
          <View style={s.badgeRow}>
            <View style={[s.badge, s.badgeBlue]}>
              <Text style={[s.badgeText, s.badgeTextBlue]}>
                {params.moveType || 'Light Move'}
              </Text>
            </View>
            <View style={[s.badge, s.badgeGreen]}>
              <Text style={[s.badgeText, s.badgeTextGreen]}>Completed</Text>
            </View>
          </View>

          {/* From → To */}
          <View style={s.routeRow}>
            <Text style={s.routeCity}>{fromCity}</Text>
            <ArrowRightIcon />
            <Text style={s.routeCity}>{toCity}</Text>
          </View>

          {/* Location subtitle */}
          <View style={s.locationSubRow}>
            <MapPinIcon />
            <Text style={s.locationSubText}>
              {params.fromAddress || 'Origin address'}
            </Text>
          </View>
        </View>

        {/* ── Gallery ───────────────────────────────────────────────────────── */}
        <View style={s.gallerySection}>
          <View style={s.galleryHeader}>
            <Text style={s.galleryTitle}>Gallery</Text>
            <Text style={s.gallerySeeAll}>See all</Text>
          </View>
          <View style={s.galleryRow}>
            {[0, 1, 2].map((i) => {
              const uri     = galleryPhotos[i];
              const isLast  = i === 2;
              const extras  = galleryPhotos.length - 3;
              return (
                <View key={i} style={s.galleryThumb}>
                  {uri ? (
                    <Image source={{ uri }} style={s.galleryThumbImg} resizeMode="cover" />
                  ) : (
                    <ImagePlaceholder style={s.galleryThumbImg} />
                  )}
                  <View style={s.galleryOverlay} />
                  {isLast && extras > 0 && (
                    <View style={s.galleryLabelWrap}>
                      <Text style={s.galleryLabel}>+{String(extras).padStart(2, '0')}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* ── Summary cards ─────────────────────────────────────────────────── */}

        {/* Pick Up Address */}
        <ReviewCard>
          <CardHeading title="Pick Up Address" />
          <View style={s.cardRows}>
            <DetailRow label="Address"  value={or(params.streetAddress)} />
            <DetailRow label="Unit"     value={or(params.apartment)} />
            <DetailRow label="Floor"    value={or(params.floorLevel)} dashed />
            <DetailRow label="Elevator" value={params.hasElevator === 'yes' ? 'Yes' : params.hasElevator === 'no' ? 'No' : 'Not specified'} />
            <DetailRow label="Parking"  value={or(params.parkingOption)} border={false} />
          </View>
        </ReviewCard>

        {/* Drop off Address */}
        <ReviewCard>
          <CardHeading title="Drop off Address" />
          <View style={s.cardRows}>
            <DetailRow label="Address"  value={or(params.dropStreetAddress)} />
            <DetailRow label="Unit"     value={or(params.dropApartment)} />
            <DetailRow label="Floor"    value={or(params.dropFloorLevel)} dashed />
            <DetailRow label="Elevator" value={params.dropHasElevator === 'yes' ? 'Yes' : params.dropHasElevator === 'no' ? 'No' : 'Not specified'} />
            <DetailRow label="Parking"  value={or(params.dropParkingOption)} border={false} />
          </View>
        </ReviewCard>

        {/* Move Items (2-column tag layout, not in a card) */}
        {inventoryItems.length > 0 && (
          <View style={s.moveItemsSection}>
            <Text style={s.moveItemsTitle}>Move Items</Text>
            <View style={s.moveItemsGrid}>
              <View style={s.moveItemsCol}>
                {inventoryItems.filter((_, i) => i % 2 === 0).map((item) => (
                  <Text key={item.label} style={s.moveItemTag}>{item.label}</Text>
                ))}
              </View>
              <View style={s.moveItemsCol}>
                {inventoryItems.filter((_, i) => i % 2 === 1).map((item) => (
                  <Text key={item.label} style={s.moveItemTag}>{item.label}</Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Move Details */}
        <ReviewCard padH15>
          <CardHeading
            title="Move Details"
            subtitle="Your selected services and preferences"
          />
          <View style={s.cardRows}>
            <DetailRow label="Packing service" value="Not specified" />
            <DetailRow label="Arrival window"  value={or(params.arrivalTime)} dashed />
            <DetailRow label="Crew size"       value="Not specified" />
            <DetailRow label="Vehicle"         value="Not specified" border={false} />
          </View>
        </ReviewCard>

        {/* Additional Services */}
        <ReviewCard padH15>
          <CardHeading title="Additional services" subtitle="Extra services you've selected" />
          <View style={s.servicesList}>
            {services.length > 0 ? services.map((svc) => (
              <View key={svc} style={s.serviceRowNoBorder}>
                <SmallCheckedIcon />
                <Text style={s.serviceLabel}>{svc}</Text>
              </View>
            )) : (
              <Text style={s.serviceLabel}>None selected</Text>
            )}
          </View>
        </ReviewCard>

        {/* Pricing */}
        <ReviewCard padH15>
          <View style={s.pricingHeader}>
            <View>
              <Text style={s.estimatedLabel}>Estimated Total</Text>
              <Text style={s.estimatedAmount}>€115</Text>
            </View>
            <Text style={s.pricingNote}>Final price confirmed after review</Text>
          </View>
          <View style={s.cardRows}>
            <DetailRow label="Base rate (Light, 0.0 km)" value="€0.00" />
            <DetailRow label="Floor surcharge"           value="€15.00" dashed />
            <DetailRow
              label="Additional services"
              value={`€${services.length > 0 ? (services.length * 50).toFixed(2) : '0.00'}`}
            />
            <View style={s.totalRow}>
              <Text style={s.totalLabel}>Total</Text>
              <Text style={s.totalValue}>€{(15 + services.length * 50).toFixed(2)}</Text>
            </View>
          </View>
        </ReviewCard>

        {/* Payment Method */}
        <ReviewCard padH15>
          <View style={s.paymentRow}>
            <Text style={s.paymentLabel}>Payment method</Text>
            <Text style={s.paymentValue}>{paymentLabel}</Text>
          </View>
        </ReviewCard>

        {/* ── Location section ─────────────────────────────────────────────── */}
        <View style={s.locationSection}>
          <Text style={s.locationTitle}>Location</Text>
          <View style={s.locationAddressRow}>
            <LocationPinIcon />
            <Text style={s.locationAddress}>{params.streetAddress || '—'}</Text>
          </View>
          {/* Map */}
          <View style={s.mapContainer}>
            <ImagePlaceholder style={s.mapImg} />
            {/* Gradient overlay layer 1: flat */}
            <View style={s.mapOverlayFlat} />
            {/* Gradient overlay layer 2: bottom fade */}
            <View style={s.mapOverlayBottom} />
            {/* Blue pin marker on map */}
            <View style={s.mapPinMarker}>
              <MapPinMarkerIcon />
            </View>
            {/* "Location" dark callout — exact Figma pos left:93 top:15 */}
            <View style={s.locationCalloutWrap}>
              <View style={s.locationDarkBubble}>
                <Text style={s.locationDarkText}>Location</Text>
              </View>
              {/* Exact Figma Polygon6 — downward triangle, fill #0D121C */}
              <Svg width={8.889} height={7.407} viewBox="0 0 7.698 5.55556">
                <Path d="M0 0L7.698 0L3.849 5.55556Z" fill="#0D121C" />
              </Svg>
            </View>
            {/* "you're here" callout — exact Figma pos left:251 top:66 */}
            <View style={s.youAreHereWrap}>
              <View style={s.youAreHereBubble}>
                <Text style={s.youAreHereText}>you're here</Text>
              </View>
              {/* Exact Figma Polygon5 — downward triangle, fill white */}
              <Svg width={8.889} height={7.407} viewBox="0 0 7.698 5.55556">
                <Path d="M0 0L7.698 0L3.849 5.55556Z" fill="white" />
              </Svg>
              <View style={{ height: 9 }} />
              {/* Exact Figma imgIconLocation — gray ring + white center, viewBox 0 0 25 27 */}
              <Svg width={7} height={7} viewBox="0 0 25 27">
                <Circle cx={12.5} cy={8.5} r={6} fill="none" stroke="#919295" strokeWidth={5} />
                <Circle cx={12.5} cy={8.5} r={3.5} fill="white" />
              </Svg>
            </View>
            {/* Distance text */}
            <Text style={s.distanceText}>5,6KM from your location</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Fixed footer ─────────────────────────────────────────────────── */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity
          style={s.trackBtn}
          activeOpacity={0.85}
          onPress={() => router.push('/track-move')}>
          <Text style={s.trackBtnText}>Track My Move</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#F9FAFB' },

  // Hero
  hero: {
    height: 360,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#D0D0D0',
  },
  heroImg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  imgPlaceholder: {
    backgroundColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Header overlaid on hero
  headerRow: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleBtn: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },

  // Dots
  dotsRow: {
    position: 'absolute',
    bottom: 44,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: 'rgba(13,13,13,0.6)',
  },
  dotActive: { backgroundColor: Colors.white },

  // Save button
  saveBtn: {
    position: 'absolute',
    bottom: 12,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Scroll
  scroll:        { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 18, gap: 18 },

  // Route + badges
  routeSection: { gap: 14 },
  badgeRow:     { flexDirection: 'row', gap: 10 },
  badge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeBlue:     { borderColor: Colors.primary },
  badgeGreen:    { borderColor: '#4CA30D' },
  badgeText:     { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6 },
  badgeTextBlue: { color: Colors.primary },
  badgeTextGreen:{ color: '#4CA30D' },

  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeCity: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.textPrimary,
  },
  locationSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationSubText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.textSecondary,
  },

  // Gallery
  gallerySection: { gap: 10 },
  galleryHeader:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  galleryTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.textPrimary,
  },
  gallerySeeAll: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.primary,
  },
  galleryRow:      { flexDirection: 'row', gap: 8 },
  galleryThumb:    { flex: 1, height: 105, borderRadius: 12, overflow: 'hidden' },
  galleryThumbImg: { width: '100%', height: '100%' },
  galleryOverlay:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  galleryLabelWrap:{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  galleryLabel:    { fontFamily: FontFamily.bold, fontSize: 16, color: Colors.white },

  // Cards
  cardRows: { gap: 0 },

  // Move items (2-col grid, no card)
  moveItemsSection: { gap: 12 },
  moveItemsTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.textPrimary,
  },
  moveItemsGrid:   { flexDirection: 'row', justifyContent: 'space-between' },
  moveItemsCol:    { gap: 16, flex: 1 },
  moveItemTag: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.textPrimary,
  },

  // Services list
  servicesList: { gap: 15 },
  serviceRow:   { flexDirection: 'row', alignItems: 'center', gap: 5, borderBottomWidth: 1, borderBottomColor: '#E3E8EF', paddingBottom: 8 },
  serviceRowNoBorder:   { flexDirection: 'row', alignItems: 'center', gap: 5, paddingBottom: 8 },
  serviceLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.textSecondary,
    flex: 1,
  },

  // Pricing
  pricingHeader:   { gap: 4 },
  estimatedLabel:  { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 26, color: Colors.textSecondary },
  estimatedAmount: { fontFamily: FontFamily.bold,   fontSize: 18, lineHeight: 26, color: Colors.primary },
  pricingNote:     { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 26, color: Colors.textSecondary },
  totalRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  totalLabel:{ fontFamily: FontFamily.bold, fontSize: 16, lineHeight: 20, color: Colors.textPrimary },
  totalValue:{ fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 24, color: '#171717' },

  // Payment
  paymentRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  paymentLabel:{ fontFamily: FontFamily.bold, fontSize: 16, lineHeight: 20, color: Colors.textSecondary },
  paymentValue:{ fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 24, color: '#171717' },

  // Location section
  locationSection: { gap: 12 },
  locationTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.textPrimary,
  },
  locationAddressRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locationAddress: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.textPrimary,
  },
  mapContainer:    { height: 152, borderRadius: 16, overflow: 'hidden', backgroundColor: '#D0D0D0' },
  mapImg:          { width: '100%', height: '100%' },
  mapOverlayFlat:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  mapOverlayBottom:{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%', backgroundColor: 'rgba(0,0,0,0.45)' },
  mapPinMarker:    { position: 'absolute', left: 102, top: 38 },

  // "Location" dark callout — exact Figma: left:93 top:15
  locationCalloutWrap: { position: 'absolute', left: 93, top: 15, alignItems: 'center' },
  locationDarkBubble:  { backgroundColor: '#0D121C', borderRadius: 4, borderWidth: 0.741, borderColor: '#0D121C', paddingHorizontal: 6, paddingVertical: 2, overflow: 'hidden' },
  locationDarkText:    { fontFamily: FontFamily.medium, fontSize: 8, color: Colors.white, textAlign: 'center' },

  // "you're here" callout — exact Figma: left:251 top:66
  youAreHereWrap:   { position: 'absolute', left: 251, top: 66, alignItems: 'center' },
  youAreHereBubble: { backgroundColor: Colors.white, borderRadius: 4, borderWidth: 0.741, borderColor: Colors.white, paddingHorizontal: 6, paddingVertical: 2, overflow: 'hidden' },
  youAreHereText:   { fontFamily: FontFamily.regular, fontSize: 8, color: Colors.textPrimary, textAlign: 'center' },

  distanceText: { position: 'absolute', left: 12, top: 118, fontFamily: FontFamily.medium, fontSize: 14, color: Colors.white },

  // Footer
  footer: {
    backgroundColor: Colors.white,
    paddingTop: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  trackBtn: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackBtnText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
  },
});
