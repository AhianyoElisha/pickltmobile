import { StyleSheet, Text, View } from 'react-native';

import { RouteConnectorIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

interface RouteInfoCardProps {
  top: number;
  pickupLocation?: string;
  pickupRegion?: string;
  dropoffLocation?: string;
  distance?: string;
  eta?: string;
}

export default function RouteInfoCard({
  top,
  pickupLocation = 'Kumasi',
  pickupRegion = 'Ashanti Region',
  dropoffLocation = 'Kotei, Kumasi, Ashanti Region',
  distance = '1.1 km',
  eta = '3min',
}: RouteInfoCardProps) {
  return (
    <View style={[styles.routeCard, { top }]}>

      {/* Pick Up row */}
      <View style={styles.rcPickRow}>
        <View style={styles.rcLocBlock}>
          <Text style={styles.rcLocLabel}>Pick Up Location</Text>
          <Text style={styles.rcLocValue}>{pickupLocation}, {pickupRegion}</Text>
        </View>
        <View style={styles.rcEtaBlock}>
          <Text style={styles.rcEtaDist}>{distance}</Text>
          <Text style={styles.rcEtaTime}>{eta}</Text>
        </View>
      </View>

      {/* Horizontal divider */}
      <View style={styles.rcDivider} />

      {/* Drop off row */}
      <View style={styles.rcDropRow}>
        <View style={styles.rcLocBlock}>
          <Text style={styles.rcLocLabel}>Drop off Location</Text>
          <Text style={styles.rcLocValue}>{dropoffLocation}</Text>
        </View>
      </View>

      {/* Route connector SVG — absolute, left 23, top 37 */}
      <View style={styles.rcConnector} pointerEvents="none">
        <RouteConnectorIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  // Pick-up row — top section (0..57), paddingLeft 38
  rcPickRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 38,
    paddingRight: 15,
    paddingTop: 16,
    paddingBottom: 0,
    height: 57,
  },
  rcDivider: {
    height: 0.5,
    backgroundColor: '#CDD5DF',
  },
  // Drop-off row — bottom section, paddingLeft 38
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
  // Connector SVG: absolute at left 23, top 37
  rcConnector: {
    position: 'absolute',
    left: 23,
    top: 37,
    width: 11,
    height: 52,
  },
});
