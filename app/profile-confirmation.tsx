import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { formatLongDate } from '@/components/ui/booking/calendar-grid';
import { ArrowLeftIcon, CalendarIcon } from '@/components/ui/pickup-icons';
import { AvatarUploader } from '@/components/ui/profile/avatar-uploader';
import {
  CountryPickerField,
  CountrySelection,
} from '@/components/ui/profile/country-picker-field';
import { DateOfBirthSheet } from '@/components/ui/profile/date-of-birth-sheet';
import { GenderSheet } from '@/components/ui/profile/gender-sheet';
import { ProfileField } from '@/components/ui/profile/profile-field';
import { ChevronDownIcon } from '@/components/ui/profile-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useAppTheme } from '@/context/theme-context';

const GENDER_OPTIONS = ['Male', 'Female', 'Other'] as const;

export default function ProfileConfirmationScreen() {
  const insets = useSafeAreaInsets();
  const { markProfileConfirmed } = useAuth();
  const { colors } = useAppTheme();

  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<CountrySelection>({
    flag: '🇺🇸',
    dialCode: '+1',
    code: 'US',
  });
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const [dobSheetOpen, setDobSheetOpen] = useState(false);
  const [genderSheetOpen, setGenderSheetOpen] = useState(false);

  async function handleConfirm() {
    await markProfileConfirmed();
    router.replace('/(tabs)');
  }

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={s.header}>
          <TouchableOpacity style={s.backBtn} activeOpacity={0.85} onPress={() => router.back()}>
            <ArrowLeftIcon size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: colors.textPrimary }]}>Confirm Profile</Text>
          <View style={s.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <AvatarUploader imageUri={avatarUri} onChange={setAvatarUri} />

          <View style={{ gap: 14 }}>
            <ProfileField
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              autoCapitalize="words"
            />
            <ProfileField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <ProfileField
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone number"
              keyboardType="phone-pad"
              leftAdornment={
                <CountryPickerField
                  flag={country.flag}
                  dialCode={country.dialCode}
                  onChange={setCountry}
                />
              }
            />
            <ProfileField
              label="Date of Birth"
              onPress={() => setDobSheetOpen(true)}
              displayValue={dob ? formatLongDate(dob) : ''}
              placeholder="Select your date of birth"
              rightIcon={<CalendarIcon size={20} color={colors.textSecondary} />}
            />
            <ProfileField
              label="Gender"
              onPress={() => setGenderSheetOpen(true)}
              displayValue={gender ?? ''}
              placeholder="Select gender"
              rightIcon={<ChevronDownIcon />}
            />
          </View>
        </ScrollView>

        <View style={[s.footer, { paddingBottom: insets.bottom + 8, backgroundColor: colors.background, borderTopColor: colors.divider }]}>
          <TouchableOpacity style={s.saveBtn} activeOpacity={0.9} onPress={handleConfirm}>
            <Text style={s.saveText}>Confirm & Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <DateOfBirthSheet
        visible={dobSheetOpen}
        value={dob}
        onConfirm={(iso) => {
          setDob(iso);
          setDobSheetOpen(false);
        }}
        onClose={() => setDobSheetOpen(false)}
      />
      <GenderSheet
        visible={genderSheetOpen}
        value={gender}
        options={GENDER_OPTIONS}
        onSelect={(g) => {
          setGender(g);
          setGenderSheetOpen(false);
        }}
        onClose={() => setGenderSheetOpen(false)}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 24,
    gap: 24,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    textAlign: 'center',
  },
  headerSpacer: { width: 48, height: 48 },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  saveBtn: {
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: Colors.white,
  },
});
