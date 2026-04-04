import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { TextInputField } from '@/components/ui/booking/text-input-field';
import { RadioButtonField } from '@/components/ui/booking/radiobutton-field';
import { DropdownField } from '@/components/ui/booking/dropdown-field';
import { WizardStepBar } from '@/components/ui/booking/wizard-step-bar';
import { FLOOR_LEVELS, PARKING_OPTIONS } from '@/components/ui/booking/data';
import { Colors, FontFamily } from '@/constants/theme';

export default function DropOffInformationScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    fromName: string; fromAddress: string;
    toName: string; toAddress: string;
    moveType: string; moveTypeId: string;
    moveDate: string; buildingType: string;
    floorLevel: string; hasElevator: string;
    parkingOption: string;
    streetAddress: string; apartment: string;
    accessNotes: string; loadingZone: string;
  }>();

  // ── Form state ──────────────────────────────────────────────────────────────
  const [streetAddress,  setStreetAddress]  = useState('');
  const [apartment,      setApartment]      = useState('');
  const [accessNotes,    setAccessNotes]    = useState('');
  const [floorLevel,     setFloorLevel]     = useState<string | null>(null);
  const [hasElevator,    setHasElevator]    = useState<boolean | null>(null);
  const [parkingOption,  setParkingOption]  = useState<string | null>(null);

  // ── Navigation ──────────────────────────────────────────────────────────────
  const navigation = useNavigation();
  const slideX = useSharedValue(0);
  const slideStyle = useAnimatedStyle(() => ({ transform: [{ translateX: slideX.value }] }));
  const goBack = () => router.back();
  const handleBack = () => {
    navigation.setOptions({ animation: 'none' });
    slideX.value = withTiming(Dimensions.get('window').width, {
      duration: 280,
      easing: Easing.in(Easing.cubic),
    }, () => {
      'worklet';
      runOnJS(goBack)();
    });
  };

  function handleNext() {
    router.push({
      pathname: '/(tabs)' as any,
      params: {
        ...params,
        dropStreetAddress:  streetAddress,
        dropApartment:      apartment,
        dropAccessNotes:    accessNotes,
        dropFloorLevel:     floorLevel     ?? '',
        dropHasElevator:    hasElevator === null ? '' : hasElevator ? 'yes' : 'no',
        dropParkingOption:  parkingOption  ?? '',
      },
    });
  }

  return (
    <Animated.View style={[s.root, slideStyle]}>
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <View style={[s.header, { paddingTop: insets.top + 4 }]}>
          <TouchableOpacity style={s.backBtn} onPress={handleBack} activeOpacity={0.8}>
            <ArrowLeftIcon size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Drop Off Information</Text>
        </View>

        {/* ── Step indicator ─────────────────────────────────────────────── */}
        <WizardStepBar activeStep={3} />

        {/* ── Form ───────────────────────────────────────────────────────── */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}>
          <ScrollView
            style={s.scroll}
            contentContainerStyle={s.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">

              <TextInputField
                label="Street Address*"
                hint="Enter the full drop off street address"
                value={streetAddress}
                onChangeText={setStreetAddress}
                placeholder="e.g., 12 Hauptstraße, Berlin"
                autoCapitalize="words"
              />

              <TextInputField
                label="Apartment / Unit (optional)"
                hint="Floor, apartment number, or unit name"
                value={apartment}
                onChangeText={setApartment}
                placeholder="e.g., 3rd floor, Apt 12"
              />

              <TextInputField
                label="Access notes (optional)"
                hint="Any details that will help our team access the location"
                value={accessNotes}
                onChangeText={setAccessNotes}
                placeholder="e.g., narrow corridor, steep stairs, construction at entrance"
                multiline
                numberOfLines={3}
              />

              <DropdownField
                label="Floor level"
                hint="Which floor is the drop off address on?"
                value={floorLevel}
                placeholder="Select floor"
                options={FLOOR_LEVELS}
                onChange={setFloorLevel}
              />

              <RadioButtonField
                label="Elevator available?"
                value={hasElevator}
                onChange={setHasElevator}
              />

              <DropdownField
                label="Parking Situation"
                hint="Availability of parking near the building for the moving truck"
                value={parkingOption}
                placeholder="Select parking situation"
                options={PARKING_OPTIONS}
                onChange={setParkingOption}
              />

              <View style={s.footerInCard}>
                <TouchableOpacity style={s.goBackBtn} activeOpacity={0.85} onPress={handleBack}>
                  <Text style={s.goBackText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.nextBtn} activeOpacity={0.85} onPress={handleNext}>
                  <Text style={s.nextText}>Next</Text>
                </TouchableOpacity>
              </View>

            <View style={{ height: 24 }} />
          </ScrollView>
        </KeyboardAvoidingView>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  root:    { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: Colors.background,
  },
  backBtn: {
    width: 48, height: 48, borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: Colors.textPrimary,
    flex: 1,
  },

  scroll:        { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16 },

  card: {
    gap: 20,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: Colors.white,
  },

  footerInCard: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 0,
    paddingTop: 8,
  },
  goBackBtn: {
    flex: 1, height: 56,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.textSecondary,
    borderRadius: 40,
    alignItems: 'center', justifyContent: 'center',
  },
  goBackText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.textPrimary,
  },
  nextBtn: {
    flex: 1, height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    alignItems: 'center', justifyContent: 'center',
  },
  nextText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
  },
});
