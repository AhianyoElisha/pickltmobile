import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeftIcon,
  GpsTargetIcon,
  MinusCircleIcon,
  PickupPinIcon,
  PlusCircleIcon,
  PlusIcon,
  RouteDirectionIcon,
} from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

function MinusBtn({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <MinusCircleIcon size={32} />
    </TouchableOpacity>
  );
}

function PlusBtn({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <PlusCircleIcon size={32} />
    </TouchableOpacity>
  );
}

const ROOM_CATEGORIES = ['Living Room', 'Bedroom', 'Kitchen', 'Office'] as const;
type RoomCategory = (typeof ROOM_CATEGORIES)[number];

const ROOM_ITEMS: Record<RoomCategory, string[]> = {
  'Living Room': ['Sofa (2-seater)', 'Sofa (3-seater)', 'Coffee table', 'TV', 'TV Stand', 'Bookshelf', 'Armchair'],
  'Bedroom': ['Bed (single)', 'Bed (double)', 'Wardrobe', 'Bedside table', 'Desk', 'Chair', 'Mirror'],
  'Kitchen': ['Refrigerator', 'Washing machine', 'Dishwasher', 'Microwave', 'Dining table', 'Dining chairs (×4)'],
  'Office': ['Desk', 'Office chair', 'Bookshelf', 'Filing cabinet', 'Monitor stand', 'Printer'],
};

const SPECIAL_ITEMS = [
  'Piano', 'Safe', 'Treadmill', 'Aquarium', 'Glass cabinet', 'Artwork / Fragile Items',
];

function CounterRow({
  label, count, onDecrement, onIncrement,
}: { label: string; count: number; onDecrement: () => void; onIncrement: () => void }) {
  return (
    <View style={counter.row}>
      <Text style={counter.label}>{label}</Text>
      <View style={counter.controls}>
        <MinusBtn onPress={onDecrement} />
        <Text style={counter.count}>{count}</Text>
        <PlusBtn onPress={onIncrement} />
      </View>
    </View>
  );
}

const counter = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 32 },
  label: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 19.6, color: Colors.textPrimary, flex: 1 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  count: { fontFamily: FontFamily.semibold, fontSize: 14, lineHeight: 19.6, color: Colors.textPrimary, textAlign: 'center', width: 24 },
});

export default function PickupInformationScreen() {
  const params = useLocalSearchParams<{
    fromName: string; fromAddress: string;
    toName: string; toAddress: string;
    moveType: string; moveTypeId: string;
  }>();

  const [selectedCategory, setSelectedCategory] = useState<RoomCategory>('Living Room');
  const [counts, setCounts] = useState<Record<string, number>>({});

  function getCount(key: string) { return counts[key] ?? 0; }
  function adjust(key: string, delta: number) {
    setCounts((prev) => ({ ...prev, [key]: Math.max(0, (prev[key] ?? 0) + delta) }));
  }
  function itemKey(category: string, item: string) { return `${category}:${item}`; }

  const currentItems = ROOM_ITEMS[selectedCategory];

  function handleNext() {
    router.push({
      pathname: '/instant/add-move-photos',
      params: {
        fromName: params.fromName, fromAddress: params.fromAddress,
        toName: params.toName, toAddress: params.toAddress,
        moveType: params.moveType, moveTypeId: params.moveTypeId,
      },
    });
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pick Up Information</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mapCard}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map Preview</Text>
            <TouchableOpacity style={styles.gpsBtn} activeOpacity={0.8}>
              <GpsTargetIcon size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.locationPanel}>
            <View style={styles.locationIcons}>
              <PickupPinIcon size={24} color={Colors.textSecondary} />
              <RouteDirectionIcon size={24} color={Colors.textSecondary} />
            </View>
            <View style={styles.locationTexts}>
              <Text style={styles.locationText} numberOfLines={1}>{params.fromName || 'Pick up location'}</Text>
              <View style={styles.locationDivider} />
              <Text style={styles.locationText} numberOfLines={1}>{params.toName || 'Drop off location'}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Edit Pick Up And Drop off Points from the map</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {ROOM_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCategory === cat && styles.chipActive]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.8}>
              <Text style={[styles.chipLabel, selectedCategory === cat && styles.chipLabelActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.itemList}>
          {currentItems.map((item) => {
            const key = itemKey(selectedCategory, item);
            return (
              <CounterRow key={key} label={item} count={getCount(key)}
                onDecrement={() => adjust(key, -1)} onIncrement={() => adjust(key, 1)} />
            );
          })}
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionHeading}>Special Items</Text>
          <Text style={styles.sectionSubtitle}>These items require special handling and may affect pricing.</Text>
          <View style={[styles.itemList, styles.itemListBorder]}>
            {SPECIAL_ITEMS.map((item) => {
              const key = itemKey('special', item);
              return (
                <CounterRow key={key} label={item} count={getCount(key)}
                  onDecrement={() => adjust(key, -1)} onIncrement={() => adjust(key, 1)} />
              );
            })}
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionHeading}>Custom Items</Text>
          <Text style={styles.sectionSubtitle}>No custom items added yet. Click the button below to add items not listed.</Text>
          <TouchableOpacity style={styles.addCustomBtn} activeOpacity={0.8}>
            <PlusIcon size={16} color={Colors.textPrimary} />
            <Text style={styles.addCustomText}>Add Custom Items</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} activeOpacity={0.85} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 48, height: 48, borderRadius: 9999, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.bold, fontSize: 18, lineHeight: 25.2, color: Colors.textPrimary, textAlign: 'center', flex: 1 },
  headerSpacer: { width: 48 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  mapCard: { borderRadius: 16, overflow: 'hidden', borderWidth: 0.5, borderColor: Colors.textSecondary },
  mapPlaceholder: { height: 200, backgroundColor: '#E8EDF2', alignItems: 'center', justifyContent: 'center' },
  mapPlaceholderText: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.textSecondary },
  gpsBtn: { position: 'absolute', right: 12, bottom: 12, width: 48, height: 48, borderRadius: 9999, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
  locationPanel: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 14, backgroundColor: Colors.white },
  locationIcons: { alignItems: 'center', justifyContent: 'space-between', height: 62 },
  locationTexts: { flex: 1, gap: 16 },
  locationText: { fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 22.4, color: Colors.textSecondary },
  locationDivider: { height: 0.5, backgroundColor: Colors.textSecondary, width: '100%' },
  sectionTitle: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6, color: Colors.textPrimary },
  categoryRow: { flexDirection: 'row', gap: 10, paddingRight: 4 },
  chip: { height: 44, paddingHorizontal: 24, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' },
  chipActive: { backgroundColor: Colors.primary },
  chipLabel: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6, color: Colors.white },
  chipLabelActive: { color: Colors.white },
  itemList: { gap: 8 },
  itemListBorder: { borderBottomWidth: 0.5, borderBottomColor: Colors.textSecondary, paddingBottom: 12 },
  sectionBlock: { gap: 4 },
  sectionHeading: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4, color: Colors.textPrimary },
  sectionSubtitle: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6, color: Colors.textSecondary, marginBottom: 4 },
  addCustomBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, borderWidth: 1.5, borderColor: Colors.textPrimary, borderRadius: 100, paddingVertical: 14, paddingHorizontal: 24, alignSelf: 'flex-start' },
  addCustomText: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4, color: Colors.textPrimary },
  footer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, backgroundColor: Colors.white },
  nextBtn: { height: 56, backgroundColor: Colors.primary, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  nextText: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4, color: Colors.white },
});
