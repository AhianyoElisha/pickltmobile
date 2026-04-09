import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MoveCard } from '@/components/ui/move-card';
import { FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

const CATEGORIES = ['All', 'Pending', 'Completed', 'Cancelled', 'Kitchen'] as const;
type Category = (typeof CATEGORIES)[number];

const MOCK_MOVES = [
  { id: '1', city: 'Kumasi', title: 'Premium Move', price: '$120.00', route: 'Kumasi → Adum', address: 'Kumasi, Ashanti Region' },
  { id: '2', city: 'Kumasi', title: 'Premium Move', price: '$120.00', route: 'Kumasi → Adum', address: 'Kumasi, Ashanti Region' },
  { id: '3', city: 'Kumasi', title: 'Premium Move', price: '$120.00', route: 'Kumasi → Adum', address: 'Kumasi, Ashanti Region' },
  { id: '4', city: 'Kumasi', title: 'Premium Move', price: '$120.00', route: 'Kumasi → Adum', address: 'Kumasi, Ashanti Region' },
];

function CategoryChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity
      style={[s.chip, active ? s.chipActive : [s.chipInactive, { borderColor: colors.borderDark }]]}
      activeOpacity={0.85}
      onPress={onPress}>
      <Text style={[s.chipText, active ? s.chipTextActive : { color: colors.textSecondary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function MovesScreen() {
  const [category, setCategory] = useState<Category>('All');
  const { colors } = useAppTheme();

  // TODO: filter by status once mock data has a status field
  const visible = MOCK_MOVES;

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={s.header}>
        <Text style={[s.headerTitle, { color: colors.textPrimary }]}>All Moves</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.chipsScroll}
        contentContainerStyle={s.chipsRow}>
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={category === cat}
            onPress={() => setCategory(cat)}
          />
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={s.cardList}
        showsVerticalScrollIndicator={false}>
        {visible.map((move) => (
          <MoveCard
            key={move.id}
            city={move.city}
            title={move.title}
            price={move.price}
            route={move.route}
            address={move.address}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    textAlign: 'center',
  },
  chipsScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  chipsRow: {
    paddingHorizontal: 20,
    gap: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  chip: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: '#1D64EC',
  },
  chipInactive: {
    borderWidth: 1,
  },
  chipText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  cardList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
  },
});
