import { router, useLocalSearchParams, useNavigation, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { MapCard } from '@/components/ui/map-card';
import { SelectDateField } from '@/components/ui/booking/select-date-field';
import { DropdownField } from '@/components/ui/booking/dropdown-field';
import { ElevatorField } from '@/components/ui/booking/radiobutton-field';
import { WizardStepBar } from '@/components/ui/booking/wizard-step-bar';
import { BUILDING_TYPES, FLOOR_LEVELS, PARKING_OPTIONS } from '@/components/ui/booking/data';
import { Colors, FontFamily } from '@/constants/theme';

export default function MoveOverviewScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    fromName: string; fromAddress: string;
    toName: string; toAddress: string;
    moveType: string; moveTypeId: string;
  }>();

  // ── Form state ──────────────────────────────────────────────────────────────
  const [moveDate,      setMoveDate]      = useState<string | null>(null);
  const [buildingType,  setBuildingType]  = useState<string | null>(null);
  const [floorLevel,    setFloorLevel]    = useState<string | null>(null);
  const [hasElevator,   setHasElevator]   = useState<boolean | null>(null);
  const [parkingOption, setParkingOption] = useState<string | null>(null);

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

  // ── Slide-in on return from forward screen ──────────────────────────────────
  const hasBeenFocused = useRef(false);
  useFocusEffect(useCallback(() => {
    if (!hasBeenFocused.current) { hasBeenFocused.current = true; return; }
    const width = Dimensions.get('window').width;
    runOnUI((w: number) => {
      'worklet';
      slideX.value = -w;
      slideX.value = withTiming(0, { duration: 220, easing: Easing.out(Easing.cubic) });
    })(width);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  function handleNext() {
    router.push({
      pathname: '/scheduled/pickup-information' as any,
      params: {
        fromName: params.fromName, fromAddress: params.fromAddress,
        toName: params.toName, toAddress: params.toAddress,
        moveType: params.moveType, moveTypeId: params.moveTypeId,
        moveDate:      moveDate      ?? '',
        buildingType:  buildingType  ?? '',
        floorLevel:    floorLevel    ?? '',
        hasElevator:   hasElevator === null ? '' : hasElevator ? 'yes' : 'no',
        parkingOption: parkingOption ?? '',
      },
    });
  }

  return (
    <Animated.View style={[s.root, slideStyle]}>

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <View style={[s.header, { paddingTop: insets.top + 4 }]}>
          <TouchableOpacity style={s.backBtn} onPress={handleBack} activeOpacity={0.8}>
            <ArrowLeftIcon size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Move Details Overview</Text>
        </View>

        {/* ── Wizard step indicator ─────────────────────────────────────────── */}
        <WizardStepBar activeStep={1} />

        {/* ── Scrollable form ───────────────────────────────────────────────── */}
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          <MapCard fromName={params.fromName} toName={params.toName} />

          <Text style={s.mapSubtitle}>Choose Pick Up And Drop off Points</Text>

          <View style={s.form}>
            <SelectDateField
              value={moveDate}
              onChange={setMoveDate}
            />

            <DropdownField
              label="Building type"
              hint="Select the type of building or space to move"
              value={buildingType}
              placeholder="Select a type"
              options={BUILDING_TYPES}
              onChange={setBuildingType}
            />

            <DropdownField
              label="Floor level"
              hint="Which floor is the pickup address on?"
              value={floorLevel}
              placeholder="Select floor"
              options={FLOOR_LEVELS}
              onChange={setFloorLevel}
            />

            <ElevatorField
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
          </View>

          <View style={{ height: 24 }} />
        </ScrollView>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <View style={[s.footer, { paddingBottom: insets.bottom + 8 }]}>
          <View style={s.footerRow}>
            <TouchableOpacity style={s.goBackBtn} activeOpacity={0.85} onPress={handleBack}>
              <Text style={s.goBackText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.nextBtn} activeOpacity={0.85} onPress={handleNext}>
              <Text style={s.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  root:    { flex: 1, backgroundColor: Colors.background },

  // ── Header ──────────────────────────────────────────────────────────────────
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

  // ── Scroll ───────────────────────────────────────────────────────────────────
  scroll:        { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16, gap: 16 },

  mapSubtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'center',
  },

  form: { gap: 20 },

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 8,
  },
  footerRow: { flexDirection: 'row', gap: 16 },
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
