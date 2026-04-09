import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  GpsTargetIcon,
  PickupPinIcon,
  RouteDirectionIcon,
} from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

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
  const { colors } = useAppTheme();
  return (
    <View style={[styles.mapCard, { borderColor: colors.textSecondary }]}>
      <View style={[styles.mapPlaceholder, { backgroundColor: colors.surface }]}>
        <Text style={[styles.mapPlaceholderText, { color: colors.textSecondary }]}>Map Preview</Text>
        <TouchableOpacity style={[styles.gpsBtn, { backgroundColor: colors.background }]} activeOpacity={0.8} onPress={onGpsPress}>
          <GpsTargetIcon size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      {!hideLocationPanel && (
        <View style={[styles.locationPanel, { backgroundColor: colors.background }]}>
          <View style={styles.locationIcons}>
            <PickupPinIcon size={24} color={colors.textSecondary} />
            <RouteDirectionIcon size={24} color={colors.textSecondary} />
          </View>
          <View style={styles.locationTexts}>
            <Text style={[styles.locationText, { color: colors.textSecondary }]} numberOfLines={1}>
              {fromName || 'Pick up location'}
            </Text>
            <View style={[styles.locationDivider, { backgroundColor: colors.textSecondary }]} />
            <Text style={[styles.locationText, { color: colors.textSecondary }]} numberOfLines={1}>
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
  },
  mapPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  gpsBtn: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 48,
    height: 48,
    borderRadius: 9999,
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
  },
  locationDivider: {
    height: 0.5,
    width: '100%',
  },
});
