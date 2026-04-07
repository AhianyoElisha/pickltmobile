import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { WizardProvider, useWizard } from '@/context/wizard-context';
import { WizardShell, WizardFooterConfig } from '@/components/ui/booking/wizard-shell';
import { PaymentSuccessModal } from '@/components/ui/payment-success-modal';
import { StepMoveOverview } from '@/components/ui/booking/scheduled/step-move-overview';
import { StepPickupInfo } from '@/components/ui/booking/scheduled/step-pickup-info';
import { StepDropoffInfo } from '@/components/ui/booking/scheduled/step-dropoff-info';
import { StepInventory } from '@/components/ui/booking/scheduled/step-inventory';
import { StepMoveTiming } from '@/components/ui/booking/scheduled/step-move-timing';
import { StepAdditionalServices, ADDITIONAL_SERVICES } from '@/components/ui/booking/scheduled/step-additional-services';
import { StepPaymentInfo } from '@/components/ui/booking/scheduled/step-payment-info';
import { StepMoveReview } from '@/components/ui/booking/scheduled/step-move-review';
import type { StepDef } from '@/components/ui/booking/wizard-step-bar';
import type { ScheduledFormData } from '@/constants/wizard-types';

export type { ScheduledFormData } from '@/constants/wizard-types';

// ── Steps config ──────────────────────────────────────────────────────────────

const STEPS: StepDef[] = [
  { num: 1, label: 'Move Details' },
  { num: 2, label: 'Pick Up Address' },
  { num: 3, label: 'Drop Off Address' },
  { num: 4, label: 'Inventory' },
  { num: 5, label: 'Move Timing' },
  { num: 6, label: 'Additional services & photos' },
  { num: 7, label: 'Payment information' },
  { num: 8, label: 'Move Review' },
];

const STEP_TITLES = [
  'Move Details Overview',
  'Pick Up Information',
  'Drop Off Information',
  'Inventory',
  'Move Timing',
  'Additional services & photos',
  'Payment information',
  'Move Review',
];

const TOTAL_STEPS = 8;
const SCREEN_WIDTH = Dimensions.get('window').width;

// ── Inner wizard (reads context) ──────────────────────────────────────────────

function ScheduledWizardInner() {
  const { state, nextStep, prevStep } = useWizard<ScheduledFormData>();
  const activeStep = state.activeStep;

  // ── Slide animation ─────────────────────────────────────────────────────
  const slideX = useSharedValue(0);
  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  const animateTransition = useCallback((direction: 'forward' | 'back', cb: () => void) => {
    const exitTo = direction === 'forward' ? -SCREEN_WIDTH : SCREEN_WIDTH;
    const enterFrom = direction === 'forward' ? SCREEN_WIDTH : -SCREEN_WIDTH;

    slideX.value = withTiming(exitTo, {
      duration: 280,
      easing: Easing.in(Easing.cubic),
    }, () => {
      'worklet';
      slideX.value = enterFrom;
      slideX.value = withTiming(0, {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      });
    });

    // Dispatch state change after a short delay to sync with exit animation
    setTimeout(cb, 280);
  }, [slideX]);

  // ── Modal state ─────────────────────────────────────────────────────────
  const [modalVisible, setModalVisible] = useState(false);
  const canProceedRef = useRef(false);

  function handleConsentChange(canProceed: boolean) {
    canProceedRef.current = canProceed;
  }

  // ── Navigation handlers ─────────────────────────────────────────────────
  function handleHeaderBack() {
    if (activeStep === 1) {
      router.back();
    } else {
      animateTransition('back', prevStep);
    }
  }

  function handleNext() {
    if (activeStep === TOTAL_STEPS) {
      // Step 8: trigger payment
      setModalVisible(true);
    } else {
      animateTransition('forward', nextStep);
    }
  }

  function handleBack() {
    if (activeStep === 1) {
      router.back();
    } else {
      animateTransition('back', prevStep);
    }
  }

  function handleCheckDetails() {
    setModalVisible(false);
    const fd = state.formData;
    router.push({
      pathname: '/move-details' as any,
      params: {
        fromName: fd.fromName,
        fromAddress: fd.fromAddress,
        toName: fd.toName,
        toAddress: fd.toAddress,
        moveType: fd.moveType,
        moveDate: fd.moveDate ?? '',
        floorLevel: fd.floorLevel ?? '',
        hasElevator: fd.hasElevator === null ? '' : fd.hasElevator ? 'yes' : 'no',
        parkingOption: fd.parkingOption ?? '',
        streetAddress: fd.streetAddress,
        apartment: fd.apartment,
        dropStreetAddress: fd.dropStreetAddress,
        dropApartment: fd.dropApartment,
        dropFloorLevel: fd.dropFloorLevel ?? '',
        dropHasElevator: fd.dropHasElevator === null ? '' : fd.dropHasElevator ? 'yes' : 'no',
        dropParkingOption: fd.dropParkingOption ?? '',
        inventory: JSON.stringify(fd.inventoryCounts),
        arrivalTime: fd.arrivalTime
          ? `${String(fd.arrivalTime.hour).padStart(2, '0')}:${String(fd.arrivalTime.minute).padStart(2, '0')} ${fd.arrivalTime.period}`
          : '',
        additionalServices: JSON.stringify(fd.checkedServices),
        mainPhotos: JSON.stringify(fd.mainPhotos),
        extraPhotos: JSON.stringify(fd.extraPhotos),
        paymentMethod: fd.selectedPayment === 'card' && fd.selectedCardId
          ? `card_${fd.selectedCardId}`
          : 'cash',
        isBusinessMove: fd.isBusinessMove ? 'yes' : 'no',
      },
    });
  }

  // ── Footer config ─────────────────────────────────────────────────────
  const footer: WizardFooterConfig = activeStep === TOTAL_STEPS
    ? {
        mode: 'single',
        nextLabel: 'Proceed to payment',
        onNext: handleNext,
        nextDisabled: !canProceedRef.current,
      }
    : {
        mode: 'double',
        nextLabel: activeStep === 7 ? 'Confirm' : 'Next',
        backLabel: 'Go Back',
        onNext: handleNext,
        onBack: handleBack,
      };

  // ── Step content ──────────────────────────────────────────────────────
  function renderStep() {
    switch (activeStep) {
      case 1: return <StepMoveOverview />;
      case 2: return <StepPickupInfo />;
      case 3: return <StepDropoffInfo />;
      case 4: return <StepInventory />;
      case 5: return <StepMoveTiming />;
      case 6: return <StepAdditionalServices />;
      case 7: return <StepPaymentInfo />;
      case 8: return <StepMoveReview onConsentChange={handleConsentChange} />;
      default: return null;
    }
  }

  const useFixedFooter = activeStep === 1;
  const hideStepBar = activeStep === TOTAL_STEPS;

  return (
    <View style={styles.root}>
      <WizardShell
        title={STEP_TITLES[activeStep - 1]}
        steps={STEPS}
        activeStep={activeStep}
        footer={footer}
        onHeaderBack={handleHeaderBack}
        footerInScroll={!useFixedFooter}
        hideStepBar={hideStepBar}>
        <Animated.View style={slideStyle}>
          {renderStep()}
        </Animated.View>
      </WizardShell>

      <PaymentSuccessModal
        visible={modalVisible}
        onCheckDetails={handleCheckDetails}
      />
    </View>
  );
}

// ── Screen (with provider) ────────────────────────────────────────────────────

export default function ScheduledWizardScreen() {
  const params = useLocalSearchParams<{
    fromName: string;
    fromAddress: string;
    toName: string;
    toAddress: string;
    moveType: string;
    moveTypeId: string;
  }>();

  const initialState: ScheduledFormData = {
    fromName: params.fromName ?? '',
    fromAddress: params.fromAddress ?? '',
    toName: params.toName ?? '',
    toAddress: params.toAddress ?? '',
    moveType: params.moveType ?? '',
    moveTypeId: params.moveTypeId ?? '',

    moveDate: null,
    buildingType: null,
    floorLevel: null,
    hasElevator: null,
    parkingOption: null,

    streetAddress: '',
    apartment: '',
    accessNotes: '',
    loadingZone: null,

    dropStreetAddress: '',
    dropApartment: '',
    dropAccessNotes: '',
    dropFloorLevel: null,
    dropHasElevator: null,
    dropParkingOption: null,

    inventoryCategory: 'Living Room',
    inventoryCounts: {},

    arrivalTime: null,
    preferEarliestArr: true,
    avoidEveningDel: false,

    checkedServices: Object.fromEntries(
      ADDITIONAL_SERVICES.map((s) => [s.id, s.defaultChecked]),
    ),
    mainPhotos: [],
    extraPhotos: [],

    finalAccessNotes: '',
    selectedPayment: 'cash',
    isBusinessMove: true,
    selectedCardId: null,
  };

  return (
    <WizardProvider initialState={initialState} totalSteps={TOTAL_STEPS}>
      <ScheduledWizardInner />
    </WizardProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
