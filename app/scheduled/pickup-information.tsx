import { router, useLocalSearchParams, useNavigation, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
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
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { TextInputField } from '@/components/ui/booking/text-input-field';
import { RadioButtonField } from '@/components/ui/booking/radiobutton-field';
import { WizardStepBar } from '@/components/ui/booking/wizard-step-bar';
import { Colors, FontFamily } from '@/constants/theme';

// ── Screen ────────────────────────────────────────────────────────────────────
export default function PickupInformationScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    fromName: string; fromAddress: string;
    toName: string; toAddress: string;
    moveType: string; moveTypeId: string;
    moveDate: string; buildingType: string;
    floorLevel: string; hasElevator: string;
    parkingOption: string;
  }>();

  // ── Form state ──────────────────────────────────────────────────────────────
  const [streetAddress,  setStreetAddress]  = useState('');
  const [apartment,      setApartment]      = useState('');
  const [accessNotes,    setAccessNotes]    = useState('');
  const [loadingZone,    setLoadingZone]    = useState<boolean | null>(null);

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
      pathname: '/scheduled/drop-off-information' as any,
      params: {
        ...params,
        streetAddress,
        apartment,
        accessNotes,
        loadingZone: loadingZone === null ? '' : loadingZone ? 'yes' : 'no',
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
          <Text style={s.headerTitle}>Pick Up Information</Text>
        </View>

        {/* ── Step indicator ─────────────────────────────────────────────── */}
        <WizardStepBar activeStep={2} />

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
                hint="Enter the full pickup street address"
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

              <RadioButtonField
                label="Loading zone required? (German Haltverbot permit)"
                hint="Which floor is the pickup address on?"
                value={loadingZone}
                onChange={setLoadingZone}
                options={['Yes', 'No']}
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

  // ── Card (matches Figma shadow) ─────────────────────────────────────────────
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

  // ── Footer inside card (matches Figma layout) ───────────────────────────────
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
