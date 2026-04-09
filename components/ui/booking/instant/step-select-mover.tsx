import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  GpsTargetIcon,
  ShoppingBagIcon,
  StarIcon,
  UsersIcon,
  VehicleIcon,
} from '@/components/ui/pickup-icons';
import { useWizard } from '@/context/wizard-context';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

import type { InstantFormData } from '@/constants/wizard-types';

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

// ── Ticket notch ───────────────────────────────────────────────────────────────
function Notch({ top, side }: { top: number; side: 'left' | 'right' }) {
  const { colors } = useAppTheme();
  return (
    <View
      style={[
        notchStyle.base,
        side === 'left' ? { left: -12 } : { right: -12 },
        { top, backgroundColor: colors.background },
      ]}
    />
  );
}
const notchStyle = StyleSheet.create({
  base: {
    position: 'absolute', width: 24, height: 24, borderRadius: 12,
  },
});

// ── Dashed separator ───────────────────────────────────────────────────────────
function DashedSeparator({ color = 'rgba(255,255,255,0.45)' }: { color?: string }) {
  return (
    <View style={{ height: 1, borderBottomWidth: 1, borderStyle: 'dashed', borderColor: color, marginVertical: 8 }} />
  );
}

// ── Mover card ─────────────────────────────────────────────────────────────────
function MoverCard({ mover, selected, onSelect }: { mover: MoverOption; selected: boolean; onSelect: () => void }) {
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
      <Notch top={51} side="left" />
      <Notch top={51} side="right" />
      <Notch top={152} side="left" />
      <Notch top={152} side="right" />

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
  container: { borderRadius: 18, paddingHorizontal: 20, paddingVertical: 22, width: '100%', overflow: 'visible' },
  selected: { borderWidth: 2, borderColor: Colors.primary },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingBottom: 4 },
  name: { fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 22.4, flex: 1 },
  recommendedBadge: { backgroundColor: '#AAF0C4', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4 },
  recommendedText: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 18.6, color: '#099250' },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 4 },
  statChunk: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  detailPrimary: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6, marginBottom: 4 },
  vehicleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailSecondary: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 16.8 },
  truckBadge: { backgroundColor: '#86CB3C', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-end' },
  truckBadgeText: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 18.6, color: '#095C37' },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6, textAlign: 'right' },
});

// ── Step Component ─────────────────────────────────────────────────────────────

export function InstantStepSelectMover() {
  const { colors } = useAppTheme();
  const { state, setField } = useWizard<InstantFormData>();
  const fd = state.formData;

  return (
    <View style={s.container}>
      {/* ── Map placeholder ── */}
      <View style={[s.mapCard, { borderColor: colors.textSecondary }]}>
        <View style={[s.mapPlaceholder, { backgroundColor: colors.surface }]}>
          <Text style={[s.mapPlaceholderText, { color: colors.textSecondary }]}>Map Preview</Text>
          <TouchableOpacity style={[s.gpsBtn, { backgroundColor: colors.surface }]} activeOpacity={0.8}>
            <GpsTargetIcon size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Mover cards ── */}
      {MOVERS.map((mover) => (
        <MoverCard
          key={mover.id}
          mover={mover}
          selected={fd.selectedMoverId === mover.id}
          onSelect={() => setField('selectedMoverId', mover.id)}
        />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 16 },
  mapCard: { borderRadius: 16, overflow: 'hidden', borderWidth: 0.5 },
  mapPlaceholder: { height: 201, alignItems: 'center', justifyContent: 'center' },
  mapPlaceholderText: { fontFamily: FontFamily.regular, fontSize: 14 },
  gpsBtn: {
    position: 'absolute', right: 12, bottom: 12, width: 48, height: 48, borderRadius: 9999,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3,
  },
});
