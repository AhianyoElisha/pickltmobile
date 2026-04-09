import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InstantBookingForm } from '@/components/ui/booking/instant-form';
import { ScheduledBookingForm } from '@/components/ui/booking/scheduled-form';
import { MoveCard } from '@/components/ui/move-card';
import {
  BellIcon,
  ChevronDownIcon,
  LocationPinIcon,
} from '@/components/ui/home-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const avatarPlaceholder = require('@/assets/images/avatar-placeholder.png') as number;

// ── Booking toggle ────────────────────────────────────────────────────────────
type BookingMode = 'instant' | 'scheduled';

function BookingToggle({
  value,
  onChange,
}: {
  value: BookingMode;
  onChange: (v: BookingMode) => void;
}) {
  return (
    <View style={toggle.container}>
      <TouchableOpacity
        style={[toggle.tab, value === 'instant' && toggle.tabActive]}
        onPress={() => onChange('instant')}
        activeOpacity={0.8}>
        <Text style={[toggle.label, value === 'instant' && toggle.labelActive]}>
          Instant
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[toggle.tab, value === 'scheduled' && toggle.tabActive]}
        onPress={() => onChange('scheduled')}
        activeOpacity={0.8}>
        <Text style={[toggle.label, value === 'scheduled' && toggle.labelActive]}>
          Scheduled
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const toggle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 3,
    height: 46,
  },
  tab: {
    flex: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: Colors.white,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 18.2,
    color: Colors.white,
  },
  labelActive: {
    color: Colors.textPrimary,
  },
});

// ── Category filter chip ──────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Pending', 'Completed', 'Cancelled'] as const;
type Category = (typeof CATEGORIES)[number];

function CategoryChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[chip.base, active ? chip.active : chip.inactive]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={[chip.label, active ? chip.labelActive : chip.labelInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const chip = StyleSheet.create({
  base: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: { backgroundColor: Colors.primary },
  inactive: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.textSecondary },
  label: { fontSize: 14, lineHeight: 19.6, textAlign: 'center' },
  labelActive: { fontFamily: FontFamily.semibold, color: Colors.white },
  labelInactive: { fontFamily: FontFamily.medium, color: Colors.textSecondary },
});

// ── Mock move data ────────────────────────────────────────────────────────────
const MOCK_MOVES = [
  {
    id: '1',
    city: 'Kumasi',
    title: 'Light Move',
    price: '$120.00',
    route: 'Kumasi → Adum',
    address: 'Kumasi, Ashanti Region',
  },
  {
    id: '2',
    city: 'Kumasi',
    title: 'Premium Move',
    price: '$120.00',
    route: 'Kumasi → Adum',
    address: 'Kumasi, Ashanti Region',
  },
];

// ── Home Screen ───────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [bookingMode, setBookingMode] = useState<BookingMode>('instant');
  const [category, setCategory] = useState<Category>('All');
  const { colors, isDark } = useAppTheme();

  return (
    // SafeAreaView bg matches dark card so the status bar area is dark
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar style="light" />

      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ─────────────────────────────────────────────────────────────────
            Dark outer card: 355px wide (marginH:10), 296px tall, rounded 26
            ───────────────────────────────────────────────────────────────── */}
        <View style={styles.darkSection}>
          {/* Header row — 335px wide, 52px tall, inside 10px padding */}
          <View style={styles.headerRow}>
            {/* Avatar */}
            <View style={styles.avatarWrap}>
              <Image
                source={avatarPlaceholder}
                style={styles.avatar}
                contentFit="cover"
              />
              <View style={styles.avatarOverlay} />
            </View>

            {/* Location */}
            <View style={styles.locationBlock}>
              <Text style={styles.locationLabel}>Your Location</Text>
              <View style={styles.locationValueRow}>
                <View style={styles.locationIconText}>
                  <LocationPinIcon size={18} />
                  <Text style={styles.locationValue}>California</Text>
                </View>
                <ChevronDownIcon size={20} />
              </View>
            </View>

            {/* Bell */}
            <TouchableOpacity style={styles.bellBtn} activeOpacity={0.8}>
              <BellIcon size={22} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────────────
            Blue form card: 327px wide (marginH:24), 371px tall
            marginTop:-201 → visual top at 295-201=95px from dark card top
            ───────────────────────────────────────────────────────────────── */}
        <View style={styles.formCard}>
          {/* Toggle — paddingTop 13 from formCard */}
          <BookingToggle value={bookingMode} onChange={setBookingMode} />

          {bookingMode === 'instant' ? (
            <InstantBookingForm
              onSearch={(data) => {
                router.push({
                  pathname: '/instant' as any,
                  params: {
                    fromName: data.from.name,
                    fromAddress: data.from.address,
                    toName: data.to.name,
                    toAddress: data.to.address,
                    moveType: data.moveType.title,
                    moveTypeId: data.moveType.id,
                  },
                });
              }}
            />
          ) : (
            <ScheduledBookingForm
              onSearch={(data) => {
                router.push({
                  pathname: '/scheduled' as any,
                  params: {
                    fromName: data.from.name,
                    fromAddress: data.from.address,
                    toName: data.to.name,
                    toAddress: data.to.address,
                    moveType: data.moveType.title,
                    moveTypeId: data.moveType.id,
                  },
                });
              }}
            />
          )}
        </View>

        {/* ─────────────────────────────────────────────────────────────────
            Content: 56px gap below form section, then categories + cards
            ───────────────────────────────────────────────────────────────── */}
        <View style={styles.contentSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}>
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                active={category === cat}
                onPress={() => setCategory(cat)}
              />
            ))}
          </ScrollView>

          <View style={styles.cardList}>
            {MOCK_MOVES.map((move) => (
              <MoveCard
                key={move.id}
                city={move.city}
                title={move.title}
                price={move.price}
                route={move.route}
                address={move.address}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // SafeAreaView bg = dark card colour → status bar area looks dark, blends with rounded card top
  safeArea: {
    flex: 1,
    
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // ── Dark outer card ──────────────────────────────────────────────────────────
  // Figma: 355px wide (10px margin each side on 375 screen), 296px tall, borderRadius 26
  darkSection: {
    height: 296,
    marginHorizontal: 10,
    borderRadius: 26,
    backgroundColor: '#0D121C',
    paddingTop: 10,
    marginTop: 15,
    paddingHorizontal: 10,
  },

  // Header row: 335px wide (355-10-10), 52px tall
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  avatar: {
    width: 52,
    height: 52,
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  locationBlock: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
  },
  locationLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.white,
    textAlign: 'center',
  },
  locationValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  locationIconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  // Figma: SF Pro Display Bold, 16px
  locationValue: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
  },
  bellBtn: {
    width: 52,
    height: 52,
    borderRadius: 9999,
    backgroundColor: '#19212C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Blue form card ───────────────────────────────────────────────────────────
  // Figma: 327px wide (14px left within 355px outer card → 10+14=24 from screen edge)
  // marginTop -201: places visual top at 296-201=95px from dark card top
  // Height = paddingTop(13) + toggle(46) + gap(22) + from(54) + gap(15) + to(54) +
  //          gap(15) + moveType(54) + gap(28) + search(46) + paddingBottom(24) = 371px
  formCard: {
    marginHorizontal: 24,
    marginTop: -201,
    backgroundColor: Colors.primary,
    borderRadius: 26,
    paddingTop: 13,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  // From + To: 22px gap after toggle, 15px between fields
  fromToWrap: {
    marginTop: 22,
    gap: 15,
    position: 'relative',
  },

  // Swap: right-aligned, vertically centred between From+To
  // From(54) + gap(15) + To(54) = 123px. Centre = 61.5px. swapTop = 61.5-20 = 41.5 ≈ 42
  swapBtn: {
    position: 'absolute',
    right: 0,
    top: 42,
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Move Type: 15px below To field
  moveTypeWrap: {
    marginTop: 15,
  },

  // Search: 28px below Move Type
  searchBtn: {
    marginTop: 28,
    height: 46,
    backgroundColor: Colors.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 18.2,
    color: Colors.textPrimary,
  },

  // ── Content section ──────────────────────────────────────────────────────────
  // 56px gap after the form section (dark(296) + formCard(marginTop:-201+height:371) = 466px flow)
  contentSection: {
    marginTop: 56,
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 4,
  },
  cardList: {
    gap: 16,
  },
});
