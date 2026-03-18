/**
 * BottomNavBar — reusable bottom navigation bar.
 *
 * Matches the PickLT Figma design exactly (node 2034-2914).
 * Icons are the exact SVG paths from the Figma asset export.
 *
 * Usage inside app/(tabs)/_layout.tsx:
 *   <Tabs tabBar={(props) => <BottomNavBar {...props} />}>
 */

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily } from '@/constants/theme';
import {
  NavHomeIcon,
  NavMovesIcon,
  NavProfileIcon,
  NavScheduledIcon,
} from './nav-icons';

// ── Tab config ────────────────────────────────────────────────────────────────
// Maps route name → display label + icon component
const TAB_CONFIG: Record<
  string,
  {
    label: string;
    Icon: React.ComponentType<{ color: string; size: number }>;
  }
> = {
  index: { label: 'Home', Icon: NavHomeIcon },
  moves: { label: 'Moves', Icon: NavMovesIcon },
  scheduled: { label: 'Scheduled', Icon: NavScheduledIcon },
  profile: { label: 'Profile', Icon: NavProfileIcon },
};

// ── Component ─────────────────────────────────────────────────────────────────
export function BottomNavBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        // Respect the device's home-indicator safe area
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}>
      {state.routes.map((route, index) => {
        const config = TAB_CONFIG[route.name];
        if (!config) return null;

        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const color = isFocused ? Colors.primary : Colors.textSecondary;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
            style={styles.tab}>
            <config.Icon color={color} size={24} />
            <Text style={[styles.label, { color }]}>{config.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingTop: 8,
    paddingHorizontal: 20,
    // Figma shadow: 2px 0px 40px rgba(0,0,0,0.12)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: 'center',
  },
});
