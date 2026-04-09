import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  MinusCircleIcon,
  PlusCircleIcon,
  PlusIcon,
} from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

// ── Data ────────────────────────────────────────────────────────────────────

const ROOM_CATEGORIES = ['Living Room', 'Bedroom', 'Kitchen', 'Office'] as const;
type RoomCategory = (typeof ROOM_CATEGORIES)[number];

const ROOM_ITEMS: Record<RoomCategory, string[]> = {
  'Living Room': ['Sofa (2-seater)', 'Sofa (3-seater)', 'Coffee table', 'TV', 'TV Stand', 'Bookshelf', 'Armchair'],
  'Bedroom':     ['Bed (single)', 'Bed (double)', 'Wardrobe', 'Bedside table', 'Desk', 'Chair', 'Mirror'],
  'Kitchen':     ['Refrigerator', 'Washing machine', 'Dishwasher', 'Microwave', 'Dining table', 'Dining chairs (×4)'],
  'Office':      ['Desk', 'Office chair', 'Bookshelf', 'Filing cabinet', 'Monitor stand', 'Printer'],
};

const SPECIAL_ITEMS = [
  'Piano', 'Safe', 'Treadmill', 'Aquarium', 'Glass cabinet', 'Artwork / Fragile Items',
];

// ── Sub-components ───────────────────────────────────────────────────────────

function CounterRow({
  label, count, onDecrement, onIncrement,
}: { label: string; count: number; onDecrement: () => void; onIncrement: () => void }) {
  const { colors } = useAppTheme();
  return (
    <View style={counter.row}>
      <Text style={[counter.label, { color: colors.textPrimary }]}>{label}</Text>
      <View style={counter.controls}>
        <TouchableOpacity onPress={onDecrement} activeOpacity={0.8}>
          <MinusCircleIcon size={32} />
        </TouchableOpacity>
        <Text style={[counter.count, { color: colors.textPrimary }]}>{count}</Text>
        <TouchableOpacity onPress={onIncrement} activeOpacity={0.8}>
          <PlusCircleIcon size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const counter = StyleSheet.create({
  row:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 32 },
  label:    { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 19.6, flex: 1 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  count:    { fontFamily: FontFamily.semibold, fontSize: 14, lineHeight: 19.6, textAlign: 'center', width: 24 },
});

// ── Helper ───────────────────────────────────────────────────────────────────

function itemKey(category: string, item: string) { return `${category}:${item}`; }

// ── Main export ───────────────────────────────────────────────────────────────

export interface InventorySelectorProps {
  counts: Record<string, number>;
  onCountsChange: (counts: Record<string, number>) => void;
  /** Which room category tab is selected. Defaults to 'Living Room'. */
  selectedCategory?: RoomCategory;
  onCategoryChange?: (category: RoomCategory) => void;
}

export function InventorySelector({
  counts,
  onCountsChange,
  selectedCategory = 'Living Room',
  onCategoryChange,
}: InventorySelectorProps) {
  const { colors } = useAppTheme();
  function getCount(key: string) { return counts[key] ?? 0; }
  function adjust(key: string, delta: number) {
    onCountsChange({ ...counts, [key]: Math.max(0, (counts[key] ?? 0) + delta) });
  }

  const currentItems = ROOM_ITEMS[selectedCategory];

  return (
    <>
      {/* ── Category chips ─────────────────────────────────────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.categoryRow}>
        {ROOM_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[s.chip, { backgroundColor: colors.borderDark }, selectedCategory === cat && s.chipActive]}
            onPress={() => onCategoryChange?.(cat)}
            activeOpacity={0.8}>
            <Text style={[s.chipLabel, { color: colors.textPrimary }, selectedCategory === cat && s.chipLabelActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Room items ─────────────────────────────────────────────────── */}
      <View style={[s.itemList, s.itemListBorder, { borderBottomColor: colors.divider }]}>
        {currentItems.map((item) => {
          const key = itemKey(selectedCategory, item);
          return (
            <CounterRow
              key={key}
              label={item}
              count={getCount(key)}
              onDecrement={() => adjust(key, -1)}
              onIncrement={() => adjust(key, 1)}
            />
          );
        })}
      </View>

      {/* ── Special Items ───────────────────────────────────────────────── */}
      <View style={s.sectionBlock}>
        <Text style={[s.sectionHeading, { color: colors.textPrimary }]}>Special Items</Text>
        <Text style={[s.sectionSubtitle, { color: colors.textSecondary }]}>
          These items require special handling and may affect pricing.
        </Text>
        <View style={[s.itemList, s.itemListBorder, { borderBottomColor: colors.divider }]}>
          {SPECIAL_ITEMS.map((item) => {
            const key = itemKey('special', item);
            return (
              <CounterRow
                key={key}
                label={item}
                count={getCount(key)}
                onDecrement={() => adjust(key, -1)}
                onIncrement={() => adjust(key, 1)}
              />
            );
          })}
        </View>
      </View>

      {/* ── Custom Items ────────────────────────────────────────────────── */}
      <View style={s.sectionBlock}>
        <Text style={[s.sectionHeading, { color: colors.textPrimary }]}>Custom Items</Text>
        <Text style={[s.sectionSubtitle, { color: colors.textSecondary }]}>
          No custom items added yet. Click the button below to add items not listed.
        </Text>
        <TouchableOpacity style={[s.addCustomBtn, { borderColor: colors.textPrimary }]} activeOpacity={0.8}>
          <PlusIcon size={16} color={colors.textPrimary} />
          <Text style={[s.addCustomText, { color: colors.textPrimary }]}>Add Custom Items</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  categoryRow:    { flexDirection: 'row', gap: 10, paddingRight: 4 },
  chip:           { height: 44, paddingHorizontal: 24, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  chipActive:     { backgroundColor: Colors.primary },
  chipLabel:      { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6 },
  chipLabelActive: { color: Colors.white },

  itemList:       { gap: 8 },
  itemListBorder: { borderBottomWidth: 0.5, paddingBottom: 12 },

  sectionBlock:    { gap: 4 },
  sectionHeading:  { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4 },
  sectionSubtitle: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6, marginBottom: 4 },

  addCustomBtn:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, borderWidth: 1.5, borderRadius: 100, paddingVertical: 14, paddingHorizontal: 24, alignSelf: 'flex-start' },
  addCustomText: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4 },
});
