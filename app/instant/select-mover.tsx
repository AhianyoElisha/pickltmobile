import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeftIcon,
  GpsTargetIcon,
  ShoppingBagIcon,
  StarIcon,
  UsersIcon,
  VehicleIcon,
} from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

// ── Types ──────────────────────────────────────────────────────────────────────
interface MoverOption {
  id: string;
  name: string;
  rating: number;
  movers: number;
  moves: number;
  vehicle: string;
  distance: string;
  truckType: string;
  weight: string;
  price: string;
  recommended?: boolean;
  variant: 'dark' | 'light';
}

// ── Mock mover data ────────────────────────────────────────────────────────────
const MOVERS: MoverOption[] = [
  {
    id: '1', name: 'William Jane', rating: 4.7, movers: 2, moves: 9,
    vehicle: 'Sprinter', distance: '~5 min away', truckType: 'Medium Truck',
    weight: '500kg max', price: '$48', recommended: true, variant: 'dark',
  },
  {
    id: '2', name: 'William Jane', rating: 4.7, movers: 2, moves: 9,
    vehicle: 'Sprinter', distance: '~5 min away', truckType: 'Medium Truck',
    weight: '500kg max', price: '$48', variant: 'light',
  },
  {
    id: '3', name: 'William Jane', rating: 4.7, movers: 2, moves: 9,
    vehicle: 'Sprinter', distance: '~5 min away', truckType: 'Medium Truck',
    weight: '500kg max', price: '$48', variant: 'light',
  },
];

// ── Ticket notch (half-circle at card edge to create punch-hole effect) ────────
function Notch({ top, side }: { top: number; side: 'left' | 'right' }) {
  return (
    <View
      style={[
        notchStyle.base,
        side === 'left' ? { left: -12 } : { right: -12 },
        { top },
      ]}
    />
  );
}
const notchStyle = StyleSheet.create({
  base: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
});

// ── Dashed separator line ──────────────────────────────────────────────────────
function DashedSeparator({ color = 'rgba(255,255,255,0.45)' }: { color?: string }) {
  return (
    <View style={{ height: 1, borderBottomWidth: 1, borderStyle: 'dashed', borderColor: color, marginVertical: 8 }} />
  );
}

// ── Mover card ─────────────────────────────────────────────────────────────────
function MoverCard({
  mover,
  selected,
  onSelect,
}: {
  mover: MoverOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const isDark = mover.variant === 'dark';
  const bg = isDark ? '#102A56' : '#D1E0FF';
  const textPrimary = isDark ? Colors.white : Colors.textPrimary;
  const textSecondary = isDark ? '#858585' : Colors.textSecondary;
  const iconColor = isDark ? Colors.white : Colors.textSecondary;

  return (
    <TouchableOpacity
      style={[card.container, { backgroundColor: bg }, selected && card.selected]}
      onPress={onSelect}
      activeOpacity={0.9}>

      {/* Ticket punch-hole notches at separator positions */}
      <Notch top={51} side="left" />
      <Notch top={51} side="right" />
      <Notch top={152} side="left" />
      <Notch top={152} side="right" />

      {/* ── Header: avatar + name + optional recommended badge ── */}
      <View style={card.headerRow}>
        <View style={card.avatar} />
        <Text style={[card.name, { color: textPrimary }]}>{mover.name}</Text>
        {mover.recommended && (
          <View style={card.recommendedBadge}>
            <Text style={card.recommendedText}>Recommended</Text>
          </View>
        )}
      </View>

      <DashedSeparator />

      {/* ── Rating + movers row ── */}
      <View style={card.statsRow}>
        <View style={card.statChunk}>
          <StarIcon size={16} />
          <Text style={[card.statText, { color: textPrimary }]}>{mover.rating} Rating</Text>
        </View>
        <View style={card.statChunk}>
          <UsersIcon size={18} color={iconColor} />
          <Text style={[card.statText, { color: textPrimary }]}>{mover.movers} movers</Text>
        </View>
      </View>

      {/* ── Moves/vehicle + distance/truck type ── */}
      <View style={card.detailsRow}>
        <View>
          <Text style={[card.detailPrimary, { color: textPrimary }]}>{mover.moves} moves</Text>
          <View style={card.vehicleRow}>
            <VehicleIcon size={15} color={textSecondary} />
            <Text style={[card.detailSecondary, { color: textSecondary }]}>{mover.vehicle}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[card.detailPrimary, { color: textPrimary }]}>{mover.distance}</Text>
          <View style={card.truckBadge}>
            <Text style={card.truckBadgeText}>{mover.truckType}</Text>
          </View>
        </View>
      </View>

      <DashedSeparator />

      {/* ── Weight + price ── */}
      <View style={card.footerRow}>
        <View style={card.statChunk}>
          <ShoppingBagIcon size={20} color={iconColor} />
          <Text style={[card.statText, { color: textPrimary }]}>{mover.weight}</Text>
        </View>
        <Text style={[card.price, { color: textPrimary }]}>{mover.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const card = StyleSheet.create({
  container: {
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 22,
    width: '100%',
    // overflow must be visible for notches to appear at edges
    overflow: 'visible',
  },
  selected: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  // Avatar placeholder circle
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 4,
  },
  name: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
    flex: 1,
  },
  recommendedBadge: {
    backgroundColor: '#AAF0C4',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  recommendedText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 18.6,
    color: '#099250',
  },
  // Rating + movers
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 4,
  },
  statChunk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  // Moves + vehicle | distance + truck type
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  detailPrimary: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    marginBottom: 4,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailSecondary: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16.8,
  },
  truckBadge: {
    backgroundColor: '#86CB3C',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-end',
  },
  truckBadgeText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 18.6,
    color: '#095C37',
  },
  // Weight + price
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: 'right',
  },
});

// ── Main screen ────────────────────────────────────────────────────────────────
export default function SelectMoverScreen() {
  const params = useLocalSearchParams<{
    fromName: string; fromAddress: string;
    toName: string; toAddress: string;
    moveType: string; moveTypeId: string;
  }>();

  const [selectedMoverId, setSelectedMoverId] = useState<string>(MOVERS[0].id);

  const navigation = useNavigation();
  const slideX = useSharedValue(0);
  const slideStyle = useAnimatedStyle(() => ({ transform: [{ translateX: slideX.value }] }));
  const goBack = () => router.back();
  const handleBack = () => {
    navigation.setOptions({ animation: 'none' });
    slideX.value = withTiming(Dimensions.get('window').width, {
      duration: 280,
      easing: Easing.in(Easing.cubic),
    }, () => {
      'worklet';
      runOnJS(goBack)();
    });
  };

  function handleNext() {
    router.push({
      pathname: '/instant/track-move',
      params: { ...params, moverId: selectedMoverId },
    });
  }

  return (
    <Animated.View style={[styles.safe, slideStyle]}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.8}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Mover</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── Map placeholder ── */}
        <View style={styles.mapCard}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map Preview</Text>
            <TouchableOpacity style={styles.gpsBtn} activeOpacity={0.8}>
              <GpsTargetIcon size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Mover cards ── */}
        {MOVERS.map((mover) => (
          <MoverCard
            key={mover.id}
            mover={mover}
            selected={selectedMoverId === mover.id}
            onSelect={() => setSelectedMoverId(mover.id)}
          />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ── Fixed Next button ── */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} activeOpacity={0.85} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 48, height: 48, borderRadius: 9999, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.bold, fontSize: 18, lineHeight: 25.2, color: Colors.textPrimary, textAlign: 'center', flex: 1 },
  headerSpacer: { width: 48 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16, gap: 16 },
  mapCard: { borderRadius: 16, overflow: 'hidden', borderWidth: 0.5, borderColor: Colors.textSecondary },
  mapPlaceholder: { height: 201, backgroundColor: '#E8EDF2', alignItems: 'center', justifyContent: 'center' },
  mapPlaceholderText: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.textSecondary },
  gpsBtn: { position: 'absolute', right: 12, bottom: 12, width: 48, height: 48, borderRadius: 9999, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
  footer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, backgroundColor: Colors.white },
  nextBtn: { height: 56, backgroundColor: Colors.primary, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  nextText: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4, color: Colors.white },
});
