import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ComponentProps, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DeleteAccountConfirmModal } from '@/components/ui/profile/delete-account-confirm-modal';
import { LogoutConfirmModal } from '@/components/ui/profile/logout-confirm-modal';
import { FontFamily } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useAppTheme } from '@/context/theme-context';

type FeatherName = ComponentProps<typeof Feather>['name'];
type IoniconsName = ComponentProps<typeof Ionicons>['name'];

type RowItem = {
  label: string;
  iconSet?: 'feather' | 'ionicons';
  icon: FeatherName | IoniconsName;
  onPress: () => void;
};

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { colors } = useAppTheme();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const generalItems: RowItem[] = [
    { label: 'Edit Profile', icon: 'user', onPress: () => router.push('/profile/personal-data' as never) },
    { label: 'Change Password', icon: 'lock', onPress: () => {} },
    { label: 'Notifications', icon: 'bell', onPress: () => router.push('/profile/notifications' as never) },
    { label: 'Security', iconSet: 'ionicons', icon: 'shield-checkmark-outline', onPress: () => router.push('/profile/security' as never) },
    { label: 'Language', icon: 'globe', onPress: () => router.push('/profile/language' as never) },
    { label: 'Appearance', icon: 'sun', onPress: () => router.push('/profile/appearance' as never) },
  ];

  const paymentItems: RowItem[] = [
    { label: 'Payment Account', icon: 'credit-card', onPress: () => router.push('/profile/payment-account' as never) },
    { label: 'Your Card', icon: 'credit-card', onPress: () => router.push('/profile/your-card' as never) },
  ];

  const preferenceItems: RowItem[] = [
    { label: 'Legal and Policies', icon: 'shield', onPress: () => router.push('/profile/privacy-policy' as never) },
    { label: 'Help & Support', icon: 'help-circle', onPress: () => router.push('/profile/help-center' as never) },
  ];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Header: avatar + name + email */}
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: colors.subtle }]}>
            <Feather name="image" size={24} color={colors.textSecondary} />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.name, { color: colors.textPrimary }]}>Jenny Wilson</Text>
            <Text style={[styles.email, { color: colors.textSecondary }]}>wilson@09gail.com</Text>
          </View>
        </View>

        {/* General */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>General</Text>
          <View style={styles.rows}>
            {generalItems.map((item) => (
              <SettingsRow key={item.label} item={item} />
            ))}
          </View>
        </View>

        {/* Payments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Payments</Text>
          <View style={styles.rows}>
            {paymentItems.map((item) => (
              <SettingsRow key={item.label} item={item} />
            ))}
          </View>
        </View>

        {/* Preferencess */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Preferencess</Text>
          <View style={styles.rows}>
            {preferenceItems.map((item) => (
              <SettingsRow key={item.label} item={item} />
            ))}
            <SettingsRow
              item={{ label: 'Logout', icon: 'log-out', onPress: () => setLogoutVisible(true) }}
              labelColor={colors.mutedLabel}
              iconColor={colors.danger}
            />
            <SettingsRow
              item={{ label: 'Delete Account', icon: 'trash-2', onPress: () => setDeleteVisible(true) }}
              labelColor={colors.danger}
              iconColor={colors.danger}
            />
          </View>
        </View>
      </ScrollView>
      <DeleteAccountConfirmModal
        visible={deleteVisible}
        onCancel={() => setDeleteVisible(false)}
        onConfirm={() => {
          setDeleteVisible(false);
          // TODO: call delete account API when backend is wired up
        }}
      />
      <LogoutConfirmModal
        visible={logoutVisible}
        onCancel={() => setLogoutVisible(false)}
        onConfirm={() => {
          setLogoutVisible(false);
          signOut();
        }}
      />
    </SafeAreaView>
  );
}

function SettingsRow({
  item,
  labelColor,
  iconColor,
}: {
  item: RowItem;
  labelColor?: string;
  iconColor?: string;
}) {
  const { colors } = useAppTheme();
  const color = iconColor ?? colors.icon;
  return (
    <TouchableOpacity
      style={[styles.row, { borderColor: colors.borderDark }]}
      activeOpacity={0.7}
      onPress={item.onPress}>
      <View style={styles.rowLeft}>
        {item.iconSet === 'ionicons' ? (
          <Ionicons name={item.icon as IoniconsName} size={20} color={color} />
        ) : (
          <Feather name={item.icon as FeatherName} size={20} color={color} />
        )}
        <Text style={[styles.rowLabel, { color: labelColor ?? colors.textPrimary }]}>
          {item.label}
        </Text>
      </View>
      <Feather name="chevron-right" size={18} color={colors.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
  },
  email: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
  },
  section: {
    gap: 14,
  },
  sectionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
  },
  rows: {
    gap: 16,
  },
  row: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
});
