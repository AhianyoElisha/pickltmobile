import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

import { BottomNavBar } from '@/components/ui/bottom-nav-bar';

const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  return (
    <MaterialTopTabs
      tabBarPosition="bottom"
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
      }}>
      {/* Explicit order: Home → Moves → Scheduled → Profile */}
      <MaterialTopTabs.Screen name="index" />
      <MaterialTopTabs.Screen name="moves" />
      <MaterialTopTabs.Screen name="scheduled" />
      <MaterialTopTabs.Screen name="profile" />
    </MaterialTopTabs>
  );
}
