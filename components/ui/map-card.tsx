import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  GpsTargetIcon,
  PickupPinIcon,
  RouteDirectionIcon,
} from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

interface MapCardProps {
  fromName?: string;
  toName?: string;
  hideLocationPanel?: boolean;
  onGpsPress?: () => void;
}

export function MapCard({
  fromName,
  toName,
  hideLocationPanel = false,
  onGpsPress,
}: MapCardProps) {
  return (
    <View style={styles.mapCard}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>Map Preview</Text>
        <TouchableOpacity style={styles.gpsBtn} activeOpacity={0.8} onPress={onGpsPress}>
          <GpsTargetIcon size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      {!hideLocationPanel && (
        <View style={styles.locationPanel}>
          <View style={styles.locationIcons}>
            <PickupPinIcon size={24} color={Colors.textSecondary} />
            <RouteDirectionIcon size={24} color={Colors.textSecondary} />
          </View>
          <View style={styles.locationTexts}>
            <Text style={styles.locationText} numberOfLines={1}>
              {fromName || 'Pick up location'}
            </Text>
            <View style={styles.locationDivider} />
            <Text style={styles.locationText} numberOfLines={1}>
              {toName || 'Drop off location'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.textSecondary,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#E8EDF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  gpsBtn: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  locationPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: Colors.white,
  },
  locationIcons: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 62,
  },
  locationTexts: {
    flex: 1,
    gap: 16,
  },
  locationText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.textSecondary,
  },
  locationDivider: {
    height: 0.5,
    backgroundColor: Colors.textSecondary,
    width: '100%',
  },
});
