import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';

// ── Figma asset URLs (valid for 7 days) ────────────────────────────────────────
const A = {
  map:            'https://www.figma.com/api/mcp/asset/7cd54e0b-d3fe-433c-997e-af6a84b2abe1',
  routeConnector: 'https://www.figma.com/api/mcp/asset/628a0dd8-28ad-4e04-bcb2-758fef8b9ca9',
  routeLine:      'https://www.figma.com/api/mcp/asset/0f91616f-ee45-40be-8894-28eaedec71a0',
  pinRed:         'https://www.figma.com/api/mcp/asset/ed34e124-9274-4324-aaf5-35498af45619',
  pinGreen:       'https://www.figma.com/api/mcp/asset/c8f31e82-dd0f-4d2c-8c68-b65a7f18d80f',
  truck:          'https://www.figma.com/api/mcp/asset/f8c88763-b873-45e9-b2b9-c5dcbe5efd57',
  avatar:         'https://www.figma.com/api/mcp/asset/21bf82e1-57aa-458c-b598-69adcdb642f7',
  vehicleGroup:   'https://www.figma.com/api/mcp/asset/f42a4560-38ad-430e-b52f-6520083731fd',
  callIcon:       'https://www.figma.com/api/mcp/asset/ec349a01-2cdd-465a-a3bd-be959857eab6',
  messageIcon:    'https://www.figma.com/api/mcp/asset/db28274b-edb6-4266-98ef-0b37be76a716',
  starIcon:       'https://www.figma.com/api/mcp/asset/4ca6e745-d366-4759-8d6c-807ba3ecd8f5',
  profile2User:   'https://www.figma.com/api/mcp/asset/c9f85f85-f821-443c-968f-700bf05b6c67',
};

export default function TrackMoveScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* ── Full-screen map background ─────────────────────────────────────── */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.mapDarkBase} />
        <Image source={A.map} style={StyleSheet.absoluteFill} contentFit="cover" />
        <View style={styles.mapOverlay} />
      </View>

      {/* ── Decorative green circle (map placeholder glow) ─────────────────── */}
      <View style={styles.greenCircle} />

      {/* ── Route path line on map ─────────────────────────────────────────── */}
      <View style={styles.routeLineWrap}>
        <Image source={A.routeLine} style={styles.routeLineImg} contentFit="contain" />
      </View>

      {/* ── Red pickup pin ─────────────────────────────────────────────────── */}
      <View style={styles.pinRed}>
        <Image source={A.pinRed} style={styles.pinImg} contentFit="contain" />
      </View>

      {/* ── Green indicator dot with pulse ring ────────────────────────────── */}
      <View style={styles.indicatorRing}>
        <View style={styles.indicatorDot} />
      </View>

      {/* ── Truck image on map ─────────────────────────────────────────────── */}
      <View style={styles.truckWrap}>
        <Image source={A.truck} style={styles.truckImg} contentFit="contain" />
      </View>

      {/* ── Green destination pin ──────────────────────────────────────────── */}
      <View style={styles.pinGreen}>
        <Image source={A.pinGreen} style={styles.pinImg} contentFit="contain" />
      </View>

      {/* ── Route card (top overlay) ───────────────────────────────────────── */}
      <View style={styles.routeCard}>

        {/* Pick-up row */}
        <View style={styles.routeTopRow}>
          <View style={styles.routeLocInfo}>
            <Text style={styles.routeLocLabel}>Pick Up Location</Text>
            <Text style={styles.routeLocValue}>Kumasi, Ashanti Region</Text>
          </View>
          <View style={styles.routeEta}>
            <Text style={styles.routeEtaDistance}>1.1 km</Text>
            <Text style={styles.routeEtaTime}>3min</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.routeDivider} />

        {/* Drop-off row */}
        <View style={styles.routeBottomRow}>
          <View style={styles.routeLocInfo}>
            <Text style={styles.routeLocLabel}>Drop off Location</Text>
            <Text style={styles.routeLocValue}>Kotei, Kumasi, Ashanti Region</Text>
          </View>
        </View>

        {/* Route connector dots + line (absolute, spans both rows) */}
        <Image
          source={A.routeConnector}
          style={styles.routeConnector}
          contentFit="contain"
        />
      </View>

      {/* ── Service info card (bottom overlay) ────────────────────────────── */}
      <View style={styles.serviceCard}>

        {/* Header: avatar + name/rating + eta */}
        <View style={styles.serviceHeader}>
          <Image source={A.avatar} style={styles.serviceAvatar} contentFit="cover" />

          <View style={styles.serviceNameBlock}>
            <Text style={styles.serviceName}>William Jane</Text>
            <View style={styles.serviceRatingRow}>
              <Image source={A.starIcon} style={styles.starImg} contentFit="contain" />
              <Text style={styles.serviceRatingText}>4.7 Rating</Text>
              <Text style={styles.serviceMovesText}>9 moves</Text>
            </View>
          </View>

          <View style={styles.serviceEtaBlock}>
            <Text style={styles.serviceEtaDist}>5 min</Text>
            <Text style={styles.serviceEtaTime}>0.1 km away</Text>
          </View>
        </View>

        {/* Header divider */}
        <View style={styles.headerDivider} />

        {/* Vehicle row */}
        <View style={styles.vehicleRow}>
          <View style={styles.vehicleIconBox}>
            <Image source={A.vehicleGroup} style={styles.vehicleGroupImg} contentFit="contain" />
          </View>

          <View style={styles.vehicleDetails}>
            <Text style={styles.vehicleName}>Mercedes Benz Sprinter</Text>
            <Text style={styles.vehiclePlate}>GW-12903-22</Text>
          </View>

          <View style={styles.moversGroup}>
            <Image source={A.profile2User} style={styles.moversIcon} contentFit="contain" />
            <Text style={styles.moversText}>2 movers</Text>
          </View>
        </View>

        {/* Call + Message buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <Image source={A.callIcon} style={styles.actionIcon} contentFit="contain" />
            <Text style={styles.actionBtnLabel}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnRight]} activeOpacity={0.8}>
            <Image source={A.messageIcon} style={styles.actionIcon} contentFit="contain" />
            <Text style={styles.actionBtnLabel}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Cancel Move button ─────────────────────────────────────────────── */}
      <View style={styles.cancelWrap}>
        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.85}
          onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.cancelText}>Cancel Move</Text>
        </TouchableOpacity>
      </View>

      {/* ── Home indicator ─────────────────────────────────────────────────── */}
      <View style={styles.homeBar}>
        <View style={styles.homePill} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },

  // ── Map ──────────────────────────────────────────────────────────────────────
  mapDarkBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D0D0D',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,13,13,0.3)',
  },

  // ── Decorative green circle ───────────────────────────────────────────────
  greenCircle: {
    position: 'absolute',
    left: 25,
    top: '50%',
    marginTop: -154,            // center (346/2) - 19 offset = -173+19 = -154
    width: 327,
    height: 327,
    borderRadius: 194.5,
    backgroundColor: '#88E6B1',
    opacity: 0.2,
  },

  // ── Route line ────────────────────────────────────────────────────────────
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

  // ── Pins ─────────────────────────────────────────────────────────────────
  pinRed: {
    position: 'absolute',
    left: 50,
    top: 233,
    width: 28.5,
    height: 58.4,
  },
  pinGreen: {
    position: 'absolute',
    left: 252,
    top: 416,
    width: 28.5,
    height: 58.4,
  },
  pinImg: {
    width: '100%',
    height: '100%',
  },

  // ── Green indicator dot ───────────────────────────────────────────────────
  indicatorRing: {
    position: 'absolute',
    left: 185 - 20,             // dot center minus ring radius
    top: 406 - 20,
    width: 52,                  // 12 dot + 20 ring each side
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(9,146,80,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorDot: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: '#0AAA5D',
    borderWidth: 1.5,
    borderColor: '#0D0D0D',
  },

  // ── Truck ─────────────────────────────────────────────────────────────────
  truckWrap: {
    position: 'absolute',
    left: 247,
    top: 427,
    width: 54,
    height: 42,
    transform: [{ rotate: '-11.03deg' }],
  },
  truckImg: {
    width: '100%',
    height: '100%',
  },

  // ── Route card ─────────────────────────────────────────────────────────────
  routeCard: {
    position: 'absolute',
    top: 42,
    left: 19,
    width: 343,
    height: 118,
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'visible',
  },
  routeTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 38,            // 15 (outer) + 23 (connector offset)
    paddingRight: 15,
    paddingTop: 16,
    paddingBottom: 14,
  },
  routeDivider: {
    height: 0.5,
    backgroundColor: '#CDD5DF',
    marginLeft: 0,
  },
  routeBottomRow: {
    paddingLeft: 38,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
  },
  routeLocInfo: {
    flex: 1,
    gap: 2,
  },
  routeLocLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },
  routeLocValue: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  routeEta: {
    alignItems: 'flex-end',
    flexShrink: 0,
    marginLeft: 8,
  },
  routeEtaDistance: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: '#0D121C',
    textAlign: 'right',
  },
  routeEtaTime: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    textAlign: 'right',
  },
  // Absolute connector image spanning across divider
  routeConnector: {
    position: 'absolute',
    left: 23,
    top: 37,
    width: 11,
    height: 52,
  },

  // ── Service info card ───────────────────────────────────────────────────────
  serviceCard: {
    position: 'absolute',
    bottom: 95,
    left: 17,
    width: 343,
    height: 200,
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  // Header section (height 57, with bottom border)
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 16,
    height: 57,
  },
  serviceAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginTop: 2.5,
    flexShrink: 0,
  },
  serviceNameBlock: {
    flex: 1,
    marginLeft: 3,
    gap: 4,
  },
  serviceName: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  serviceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  starImg: {
    width: 15,
    height: 15,
    flexShrink: 0,
  },
  serviceRatingText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },
  serviceMovesText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },
  serviceEtaBlock: {
    alignItems: 'flex-end',
    flexShrink: 0,
    marginLeft: 8,
  },
  serviceEtaDist: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: '#0D121C',
    textAlign: 'right',
  },
  serviceEtaTime: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    textAlign: 'right',
  },
  headerDivider: {
    height: 0.5,
    backgroundColor: '#CDD5DF',
  },

  // Vehicle row (top:57 → 20px below divider start = paddingTop:20)
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 19,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 0,
  },
  vehicleIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E3E8EF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  vehicleGroupImg: {
    width: 20,
    height: 20,
  },
  vehicleDetails: {
    flex: 1,
    marginLeft: 8,
    gap: 2,
  },
  vehicleName: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  vehiclePlate: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
  },
  moversGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 0,
  },
  moversIcon: {
    width: 15,
    height: 15,
  },
  moversText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },

  // Call + Message buttons
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 14,
    gap: 15,
  },
  actionBtn: {
    flex: 1,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#697586',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  actionBtnRight: {
    // identical style, kept separate for future variant needs
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  actionBtnLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: '#0D121C',
  },

  // ── Cancel Move button ──────────────────────────────────────────────────────
  cancelWrap: {
    position: 'absolute',
    bottom: 29,
    left: 21,
    right: 19,
  },
  cancelBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cancelText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
    textAlign: 'center',
  },

  // ── Home indicator ──────────────────────────────────────────────────────────
  homeBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  homePill: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: Colors.white,
  },
});
