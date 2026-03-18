import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CallIcon,
  MessageIcon,
  RouteConnectorIcon,
  StarIcon,
  UsersIcon,
  VehicleIcon,
} from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

// ── Figma asset URLs for image-based elements (map photo, avatar photo) ────────
const MAP_IMG    = 'https://www.figma.com/api/mcp/asset/7cd54e0b-d3fe-433c-997e-af6a84b2abe1';
const AVATAR_IMG = 'https://www.figma.com/api/mcp/asset/21bf82e1-57aa-458c-b598-69adcdb642f7';

// ── Map overlay decorative assets (pins, truck, route line) ────────────────────
const ROUTE_LINE = 'https://www.figma.com/api/mcp/asset/0f91616f-ee45-40be-8894-28eaedec71a0';
const PIN_RED    = 'https://www.figma.com/api/mcp/asset/ed34e124-9274-4324-aaf5-35498af45619';
const PIN_GREEN  = 'https://www.figma.com/api/mcp/asset/c8f31e82-dd0f-4d2c-8c68-b65a7f18d80f';
const TRUCK_IMG  = 'https://www.figma.com/api/mcp/asset/f8c88763-b873-45e9-b2b9-c5dcbe5efd57';

export default function TrackMoveScreen() {
  const insets = useSafeAreaInsets();

  // Cancel button sits 8 pt above the safe-area bottom (home indicator / nav bar)
  const cancelBottom  = insets.bottom + 8;
  // Service card sits cancel(52) + gap(14) above cancel button
  const cardBottom    = cancelBottom + 52 + 14;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* ── Full-screen map ──────────────────────────────────────────────── */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.mapBase} />
        <Image source={MAP_IMG} style={StyleSheet.absoluteFill} contentFit="cover" />
        <View style={styles.mapOverlay} />
      </View>

      {/* ── Map decorative elements ──────────────────────────────────────── */}

      {/* Green placeholder glow circle */}
      <View style={styles.glowCircle} />

      {/* Blue route path */}
      <View style={styles.routeLineWrap}>
        <Image
          source={ROUTE_LINE}
          style={styles.routeLineImg}
          contentFit="contain"
        />
      </View>

      {/* Red pick-up pin */}
      <View style={styles.pinRedWrap}>
        <Image source={PIN_RED} style={styles.pinImg} contentFit="contain" />
      </View>

      {/* Green pulsing indicator dot */}
      <View style={styles.indicatorRing}>
        <View style={styles.indicatorDot} />
      </View>

      {/* Delivery truck (rotated) */}
      <View style={styles.truckWrap}>
        <Image source={TRUCK_IMG} style={styles.truckImg} contentFit="contain" />
      </View>

      {/* Green destination pin */}
      <View style={styles.pinGreenWrap}>
        <Image source={PIN_GREEN} style={styles.pinImg} contentFit="contain" />
      </View>

      {/* ── Route info card (top overlay) ───────────────────────────────── */}
      {/*
        Figma exact spec:
          top: 42, left: 19, width: 343, height: 118, borderRadius: 16
          Pick Up row: paddingLeft 38, top 16 — divided at y=57
          Drop off row: top 65 — connector spans y=37..89 at left 23
      */}
      <View style={[styles.routeCard, { top: insets.top > 0 ? insets.top - 2 : 42 }]}>

        {/* Pick Up row */}
        <View style={styles.rcPickRow}>
          <View style={styles.rcLocBlock}>
            <Text style={styles.rcLocLabel}>Pick Up Location</Text>
            <Text style={styles.rcLocValue}>Kumasi, Ashanti Region</Text>
          </View>
          <View style={styles.rcEtaBlock}>
            <Text style={styles.rcEtaDist}>1.1 km</Text>
            <Text style={styles.rcEtaTime}>3min</Text>
          </View>
        </View>

        {/* Horizontal divider at y ≈ 57 */}
        <View style={styles.rcDivider} />

        {/* Drop off row */}
        <View style={styles.rcDropRow}>
          <View style={styles.rcLocBlock}>
            <Text style={styles.rcLocLabel}>Drop off Location</Text>
            <Text style={styles.rcLocValue}>Kotei, Kumasi, Ashanti Region</Text>
          </View>
        </View>

        {/* Route connector SVG — absolute, left:23, top:37, 11×52
            It spans across the divider linking pick-up and drop-off dots */}
        <View style={styles.rcConnector} pointerEvents="none">
          <RouteConnectorIcon />
        </View>
      </View>

      {/* ── Service info card (bottom overlay) ──────────────────────────── */}
      {/*
        Figma exact spec:
          left: 17, width: 343, height: 200, borderRadius: 16
          Header height: 57, divider 0.5px #CDD5DF
          Avatar: left 15, top 18.5, 36×36
          Name block: left 54, top 16
          ETA block: right 15, top 16
          Vehicle box: left 19, top 77, 40×40, bg #E3E8EF, borderRadius 10
          Vehicle icon (20×20): left 29, top 87
          "Mercedes Benz Sprinter": left 67, top 81
          "GW-12903-22": left 67, top 99
          Profile icon + "2 movers": right side, top 88
          Call button: left 12, top 137, width 153, height 50, borderRadius 40
          Message button: left 180, top 136, width 153, height 50, borderRadius 40
      */}
      <View style={[styles.serviceCard, { bottom: cardBottom }]}>

        {/* ── Header section (top 0..57) ── */}
        <View style={styles.scHeader}>
          {/* Avatar */}
          <Image source={AVATAR_IMG} style={styles.scAvatar} contentFit="cover" />

          {/* Name + rating */}
          <View style={styles.scNameBlock}>
            <Text style={styles.scName}>William Jane</Text>
            <View style={styles.scRatingRow}>
              <StarIcon size={15} />
              <Text style={styles.scRatingText}>4.7 Rating</Text>
              <Text style={styles.scMovesText}>9 moves</Text>
            </View>
          </View>

          {/* ETA */}
          <View style={styles.scEtaBlock}>
            <Text style={styles.scEtaDist}>5 min</Text>
            <Text style={styles.scEtaTime}>0.1 km away</Text>
          </View>
        </View>

        {/* Header divider */}
        <View style={styles.scDivider} />

        {/* ── Vehicle section — absolute positions match Figma exactly ── */}
        {/* Vehicle icon box: left 19, top 77 → top 77 in card */}
        <View style={styles.scVehicleBox}>
          <VehicleIcon size={20} color={Colors.textSecondary} />
        </View>

        {/* Vehicle name: left 67, top 81 */}
        <Text style={styles.scVehicleName}>Mercedes Benz Sprinter</Text>

        {/* Plate: left 67, top 99 */}
        <Text style={styles.scVehiclePlate}>GW-12903-22</Text>

        {/* 2 movers group: right side, top ~88 */}
        <View style={styles.scMoversGroup}>
          <UsersIcon size={15} color={Colors.textSecondary} />
          <Text style={styles.scMoversText}>2 movers</Text>
        </View>

        {/* ── Call button: left 12, top 137, width 153, height 50 ── */}
        <TouchableOpacity style={styles.scCallBtn} activeOpacity={0.8}>
          <CallIcon size={24} color="#0D121C" />
          <Text style={styles.scBtnLabel}>Call</Text>
        </TouchableOpacity>

        {/* ── Message button: left 180, top 136, width 153, height 50 ── */}
        <TouchableOpacity style={styles.scMsgBtn} activeOpacity={0.8}>
          <MessageIcon size={24} color="#0D121C" />
          <Text style={styles.scBtnLabel}>Message</Text>
        </TouchableOpacity>
      </View>

      {/* ── Cancel Move button ───────────────────────────────────────────── */}
      <View style={[styles.cancelWrap, { bottom: cancelBottom }]}>
        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.85}
          onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.cancelText}>Cancel Move</Text>
        </TouchableOpacity>
      </View>
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
    // vertically centered on map (top 50% - 327/2 + 19)
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
    left: 165,   // 185 (dot centre) - 20 (ring radius)
    top: 386,    // 406 (dot centre) - 20
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

  // ── Route card ─────────────────────────────────────────────────────────────
  // Figma: top 42, left 19, width 343, height 118, borderRadius 16
  routeCard: {
    position: 'absolute',
    left: 19,
    width: 343,
    height: 118,
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'visible',
  },
  // Pick-up row — top section (0..57), paddingLeft 38 (15+23 connector offset)
  rcPickRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 38,
    paddingRight: 15,
    paddingTop: 16,
    paddingBottom: 0,
    height: 57,         // exact Figma header-section height
  },
  rcDivider: {
    height: 0.5,
    backgroundColor: '#CDD5DF',
  },
  // Drop-off row — bottom section (65..106), paddingLeft 38
  rcDropRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 38,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
  },
  rcLocBlock: { flex: 1, gap: 3 },
  rcLocLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },
  rcLocValue: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  rcEtaBlock: { alignItems: 'flex-end', flexShrink: 0, marginLeft: 8 },
  rcEtaDist: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: '#0D121C',
    textAlign: 'right',
  },
  rcEtaTime: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    textAlign: 'right',
  },
  // Connector SVG: absolute at left 23, top 37 — spans pick-up & drop-off dots
  rcConnector: {
    position: 'absolute',
    left: 23,
    top: 37,
    width: 11,
    height: 52,
  },

  // ── Service card ────────────────────────────────────────────────────────────
  // Figma: left 17, width 343, height 200, borderRadius 16
  serviceCard: {
    position: 'absolute',
    left: 17,
    width: 343,
    height: 200,
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },

  // Header section — height 57, borderBottom 0.5 #CDD5DF
  // Uses flex so text doesn't get cut; exact positions below matched via padding
  scHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 16,
    height: 57,
  },
  scAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginTop: 2.5,
    flexShrink: 0,
  },
  scNameBlock: {
    flex: 1,
    marginLeft: 3,
    gap: 4,
  },
  scName: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  scRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  scRatingText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },
  scMovesText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },
  scEtaBlock: { alignItems: 'flex-end', flexShrink: 0, marginLeft: 8 },
  scEtaDist: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: '#0D121C',
    textAlign: 'right',
  },
  scEtaTime: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    textAlign: 'right',
  },
  scDivider: { height: 0.5, backgroundColor: '#CDD5DF' },

  // Vehicle section — absolute positions from Figma
  // Icon box: left 19, top 77, 40×40, bg #E3E8EF, borderRadius 10
  scVehicleBox: {
    position: 'absolute',
    left: 19,
    top: 77,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E3E8EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // "Mercedes Benz Sprinter": left 67, top 81
  scVehicleName: {
    position: 'absolute',
    left: 67,
    top: 81,
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  // "GW-12903-22": left 67, top 99
  scVehiclePlate: {
    position: 'absolute',
    left: 67,
    top: 99,
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
  },
  // Profile icon + "2 movers": right side, top ~88
  scMoversGroup: {
    position: 'absolute',
    right: 15,
    top: 88,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  scMoversText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },

  // Call button: left 12, top 137, width 153, height 50, borderRadius 40
  scCallBtn: {
    position: 'absolute',
    left: 12,
    top: 137,
    width: 153,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#697586',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  // Message button: left 180, top 136, width 153, height 50, borderRadius 40
  scMsgBtn: {
    position: 'absolute',
    left: 180,
    top: 136,
    width: 153,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#697586',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  scBtnLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: '#0D121C',
  },

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
});
