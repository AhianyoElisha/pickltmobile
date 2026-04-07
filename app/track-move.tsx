import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RouteInfoCard from '@/components/RouteInfoCard';
import ServiceCard, { MoveStatus } from '@/components/ServiceCard';
import { Colors, FontFamily } from '@/constants/theme';

// ── Map overlay decorative assets ────────────────────────────────────────────
const MAP_IMG    = 'https://www.figma.com/api/mcp/asset/7cd54e0b-d3fe-433c-997e-af6a84b2abe1';
const ROUTE_LINE = 'https://www.figma.com/api/mcp/asset/0f91616f-ee45-40be-8894-28eaedec71a0';
const PIN_RED    = 'https://www.figma.com/api/mcp/asset/ed34e124-9274-4324-aaf5-35498af45619';
const PIN_GREEN  = 'https://www.figma.com/api/mcp/asset/c8f31e82-dd0f-4d2c-8c68-b65a7f18d80f';
const TRUCK_IMG  = 'https://www.figma.com/api/mcp/asset/f8c88763-b873-45e9-b2b9-c5dcbe5efd57';

// ── Demo: cycle through all states to preview them ───────────────────────────
// Replace with real move status from your API/state management
const DEMO_STATUS: MoveStatus = 'mover_arrived';

export default function TrackMoveScreen() {
  const insets = useSafeAreaInsets();

  // Cancel button sits 8 pt above the safe-area bottom
  const cancelBottom = insets.bottom + 8;
  // Service card sits cancel(52) + gap(14) above cancel button
  const cardBottom   = cancelBottom + 52 + 14;

  // ── Exit animation — white circle expands to cover map, then navigate home ──
  const cancelRevealScale = useSharedValue(0);
  const cancelBgStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cancelRevealScale.value }],
  }));

  const replaceToTabs = () => router.replace('/(tabs)');

  const handleCancelMove = () => {
    cancelRevealScale.value = withTiming(
      1,
      { duration: 520, easing: Easing.out(Easing.cubic) },
      () => {
        'worklet';
        runOnJS(replaceToTabs)();
      },
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* ── Full-screen map ────────────────────────────────────────────────── */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.mapBase} />
        <Image source={MAP_IMG} style={StyleSheet.absoluteFill} contentFit="cover" />
        <View style={styles.mapOverlay} />
      </View>

      {/* ── Map decorative elements ────────────────────────────────────────── */}
      <View style={styles.glowCircle} />

      <View style={styles.routeLineWrap}>
        <Image source={ROUTE_LINE} style={styles.routeLineImg} contentFit="contain" />
      </View>

      <View style={styles.pinRedWrap}>
        <Image source={PIN_RED} style={styles.pinImg} contentFit="contain" />
      </View>

      <View style={styles.indicatorRing}>
        <View style={styles.indicatorDot} />
      </View>

      <View style={styles.truckWrap}>
        <Image source={TRUCK_IMG} style={styles.truckImg} contentFit="contain" />
      </View>

      <View style={styles.pinGreenWrap}>
        <Image source={PIN_GREEN} style={styles.pinImg} contentFit="contain" />
      </View>

      {/* ── Route info card (top overlay) ─────────────────────────────────── */}
      <RouteInfoCard
        top={insets.top > 0 ? insets.top - 2 : 42}
        pickupLocation="Kumasi"
        pickupRegion="Ashanti Region"
        dropoffLocation="Kotei, Kumasi, Ashanti Region"
        distance="1.1 km"
        eta="3min"
      />

      {/* ── Service card (bottom overlay) ─────────────────────────────────── */}
      <ServiceCard
        status={DEMO_STATUS}
        bottom={cardBottom}
        onCall={() => router.push('/shared/call' as any)}
        onMessage={() => router.push('/shared/message' as any)}
        onPaymentConfirmed={() => { /* handle payment confirmed */ }}
      />

      {/* ── Cancel Move button ─────────────────────────────────────────────── */}
      <View style={[styles.cancelWrap, { bottom: cancelBottom }]}>
        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.85}
          onPress={handleCancelMove}
        >
          <Text style={styles.cancelText}>Cancel Move</Text>
        </TouchableOpacity>
      </View>

      {/* ── Exit reveal overlay — white circle that expands on cancel ─────── */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.cancelRevealBg, cancelBgStyle]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D0D' },

  // ── Map ────────────────────────────────────────────────────────────────────
  mapBase:    { ...StyleSheet.absoluteFillObject, backgroundColor: '#0D0D0D' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13,13,13,0.3)' },

  // ── Map decorative ─────────────────────────────────────────────────────────
  glowCircle: {
    position: 'absolute',
    left: 25,
    top: '50%' as unknown as number,
    marginTop: -154,
    width: 327,
    height: 327,
    borderRadius: 194.5,
    backgroundColor: '#88E6B1',
    opacity: 0.2,
  },
  routeLineWrap: {
    position: 'absolute',
    left: 30,
    top: 169,
    width: 332,
    height: 324,
  },
  routeLineImg: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '-138.58deg' }],
  },
  pinRedWrap: {
    position: 'absolute',
    left: 50,
    top: 233,
    width: 28.5,
    height: 58.4,
  },
  pinGreenWrap: {
    position: 'absolute',
    left: 252,
    top: 416,
    width: 28.5,
    height: 58.4,
  },
  pinImg: { width: '100%', height: '100%' },
  indicatorRing: {
    position: 'absolute',
    left: 165,
    top: 386,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(9,146,80,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0AAA5D',
    borderWidth: 1.5,
    borderColor: '#0D0D0D',
  },
  truckWrap: {
    position: 'absolute',
    left: 247,
    top: 427,
    width: 54,
    height: 42,
    transform: [{ rotate: '-11.03deg' }],
  },
  truckImg: { width: '100%', height: '100%' },

  // ── Cancel Move button ──────────────────────────────────────────────────────
  cancelWrap: {
    position: 'absolute',
    left: 21,
    right: 19,
  },
  cancelBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
    textAlign: 'center',
  },

  // ── Cancel exit reveal ──────────────────────────────────────────────────────
  cancelRevealBg: {
    backgroundColor: Colors.background,
  },
});
