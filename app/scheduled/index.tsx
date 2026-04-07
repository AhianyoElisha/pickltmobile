import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

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

// ── Inner wizard (reads context) ──────────────────────────────────────────────

function ScheduledWizardInner() {
  const { state, nextStep, prevStep } = useWizard<ScheduledFormData>();
  const activeStep = state.activeStep;

  // ── Modal state ─────────────────────────────────────────────────────────
  const [modalVisible, setModalVisible] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  function handleConsentChange(value: boolean) {
    setCanProceed(value);
  }

  // ── Navigation handlers ─────────────────────────────────────────────────
  function handleHeaderBack() {
    if (activeStep === 1) {
      router.back();
    } else {
      prevStep();
    }
  }

  function handleNext() {
    if (activeStep === TOTAL_STEPS) {
      setModalVisible(true);
    } else {
      nextStep();
    }
  }

  function handleBack() {
    if (activeStep === 1) {
      router.back();
    } else {
      prevStep();
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
        nextDisabled: !canProceed,
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

  const hideStepBar = activeStep === TOTAL_STEPS;

  return (
    <View style={styles.root}>
      <WizardShell
        title={STEP_TITLES[activeStep - 1]}
        steps={STEPS}
        activeStep={activeStep}
        footer={footer}
        onHeaderBack={handleHeaderBack}
        footerInScroll={false}
        hideStepBar={hideStepBar}>
        {renderStep()}
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
