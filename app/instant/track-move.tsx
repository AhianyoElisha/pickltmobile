import { router, useLocalSearchParams } from 'expo-router';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CallIcon,
  MessageIcon,
  StarIcon,
  UsersIcon,
  VehicleIcon,
} from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

// ── Route connector dots + line ────────────────────────────────────────────────
function RouteConnector() {
  return (
    <View style={connector.wrap}>
      <View style={connector.dot} />
      <View style={connector.line} />
      <View style={connector.dot} />
    </View>
  );
}
const connector = StyleSheet.create({
  wrap: { width: 10, alignItems: 'center', gap: 2, paddingVertical: 2 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  line: { width: 2, flex: 1, minHeight: 16, backgroundColor: '#D0D8E4' },
});

// ── Main screen ────────────────────────────────────────────────────────────────
export default function TrackMoveScreen() {
  const params = useLocalSearchParams<{
    fromName: string; fromAddress: string;
    toName: string; toAddress: string;
    moveType: string; moveTypeId: string;
    moverId: string;
  }>();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>

      {/* ── Full-screen map placeholder ── */}
      <View style={styles.map}>
        <View style={styles.mapOverlay} />
      </View>

      {/* ── Top floating route card ── */}
      <View style={styles.routeCard}>
        <View style={styles.routeRow}>
          <RouteConnector />
          <View style={styles.routeLocations}>
            {/* Pick up */}
            <View style={styles.locationRow}>
              <View style={styles.locationText}>
                <Text style={styles.locationLabel}>Pick Up Location</Text>
                <Text style={styles.locationValue} numberOfLines={1}>
                  {params.fromAddress || 'Kumasi, Ashanti Region'}
                </Text>
              </View>
              <Text style={styles.etaText}>1.1 km / 3min</Text>
            </View>

            <View style={styles.locationDivider} />

            {/* Drop off */}
            <View style={styles.locationRow}>
              <View style={styles.locationText}>
                <Text style={styles.locationLabel}>Drop off Location</Text>
                <Text style={styles.locationValue} numberOfLines={1}>
                  {params.toAddress || 'Kotei, Kumasi, Ashanti Region'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* ── Bottom floating info card ── */}
      <View style={styles.infoCard}>
        {/* Header: avatar + name + rating + moves / distance */}
        <View style={styles.moverHeader}>
          <View style={styles.avatar} />
          <View style={styles.moverMeta}>
            <Text style={styles.moverName}>William Jane</Text>
            <View style={styles.moverStats}>
              <StarIcon size={14} />
              <Text style={styles.moverStatText}>4.7 Rating</Text>
              <View style={styles.statDot} />
              <Text style={styles.moverStatText}>9 moves</Text>
            </View>
          </View>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>5 min / 0.1 km away</Text>
          </View>
        </View>

        {/* Vehicle row */}
        <View style={styles.vehicleRow}>
          <View style={styles.vehicleIconBox}>
            <VehicleIcon size={20} color={Colors.textSecondary} />
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>Mercedes Benz Sprinter</Text>
            <Text style={styles.vehiclePlate}>GW-12903-22</Text>
          </View>
          <View style={styles.moversChip}>
            <UsersIcon size={16} color={Colors.textSecondary} />
            <Text style={styles.moversChipText}>2 movers</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <CallIcon size={20} color={Colors.primary} />
            <Text style={styles.actionBtnText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <MessageIcon size={20} color={Colors.primary} />
            <Text style={styles.actionBtnText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Cancel Move button ── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.85}
          onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.cancelText}>Cancel Move</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  // Full-screen map
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E8EDF2',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  // Top route card — floating at top
  routeCard: {
    position: 'absolute',
    top: 42,
    left: 19,
    right: 19,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  routeRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'stretch',
  },
  routeLocations: {
    flex: 1,
    gap: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  locationText: { flex: 1 },
  locationLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    lineHeight: 15.4,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  locationValue: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    lineHeight: 18.2,
    color: Colors.textPrimary,
  },
  etaText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.primary,
    textAlign: 'right',
    flexShrink: 0,
  },
  locationDivider: {
    height: 1,
    backgroundColor: '#E8EDF2',
    marginVertical: 2,
  },

  // Bottom info card
  infoCard: {
    position: 'absolute',
    bottom: 100,
    left: 19,
    right: 19,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    gap: 12,
  },
  moverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D0D8E4',
    flexShrink: 0,
  },
  moverMeta: {
    flex: 1,
    gap: 4,
  },
  moverName: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    lineHeight: 21,
    color: Colors.textPrimary,
  },
  moverStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moverStatText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.textSecondary,
  },
  statDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textSecondary,
  },
  distanceBadge: {
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexShrink: 0,
  },
  distanceText: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    lineHeight: 15.4,
    color: Colors.primary,
    textAlign: 'center',
  },

  // Vehicle row
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vehicleIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F5F6F8',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  vehicleInfo: { flex: 1 },
  vehicleName: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    lineHeight: 18.2,
    color: Colors.textPrimary,
  },
  vehiclePlate: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    lineHeight: 15.4,
    color: Colors.textSecondary,
  },
  moversChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F5F6F8',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexShrink: 0,
  },
  moversChipText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.textSecondary,
  },

  // Call + Message buttons
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionBtnText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.primary,
  },

  // Cancel button
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 19,
    right: 19,
  },
  cancelBtn: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
  },
});
