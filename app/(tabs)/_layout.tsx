import { Tabs } from 'expo-router';

import { BottomNavBar } from '@/components/ui/bottom-nav-bar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{ headerShown: false }}>
      {/* Explicit order: Home → Moves → Scheduled → Profile */}
      <Tabs.Screen name="index" />
      <Tabs.Screen name="moves" />
      <Tabs.Screen name="scheduled" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
