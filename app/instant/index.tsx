import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { WizardProvider, useWizard } from '@/context/wizard-context';
import { WizardShell, WizardFooterConfig } from '@/components/ui/booking/wizard-shell';
import { InstantStepPickupInfo } from '@/components/ui/booking/instant/step-pickup-info';
import { InstantStepAddPhotos } from '@/components/ui/booking/instant/step-add-photos';
import { InstantStepSelectMover } from '@/components/ui/booking/instant/step-select-mover';
import type { StepDef } from '@/components/ui/booking/wizard-step-bar';
import type { InstantFormData } from '@/constants/wizard-types';

export type { InstantFormData } from '@/constants/wizard-types';

// ── Steps config ──────────────────────────────────────────────────────────────

const STEPS: StepDef[] = [
  { num: 1, label: 'Pick Up Information' },
  { num: 2, label: 'Add Move Photos' },
  { num: 3, label: 'Select Mover' },
];

const STEP_TITLES = [
  'Pick Up Information',
  'Add Move Photos',
  'Select Mover',
];

const TOTAL_STEPS = 3;
const SCREEN_WIDTH = Dimensions.get('window').width;

// ── Inner wizard ──────────────────────────────────────────────────────────────

function InstantWizardInner() {
  const { state, nextStep, prevStep } = useWizard<InstantFormData>();
  const activeStep = state.activeStep;
  const fd = state.formData;

  // ── Circular-reveal animation (entry) ───────────────────────────────────
  const revealScale    = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  const bgStyle = useAnimatedStyle(() => ({
    transform: [{ scale: revealScale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  useEffect(() => {
    revealScale.value = withTiming(1, {
      duration: 520,
      easing: Easing.out(Easing.cubic),
    });
    contentOpacity.value = withDelay(300, withTiming(1, { duration: 220 }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Slide animation (between steps) ─────────────────────────────────────
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

    setTimeout(cb, 280);
  }, [slideX]);

  // ── Navigation ──────────────────────────────────────────────────────────
  const goBack = () => router.back();

  function handleHeaderBack() {
    if (activeStep === 1) {
      // Reverse circular reveal
      contentOpacity.value = withTiming(0, { duration: 150 });
      revealScale.value = withTiming(
        0,
        { duration: 380, easing: Easing.in(Easing.cubic) },
        () => {
          'worklet';
          runOnJS(goBack)();
        },
      );
    } else {
      animateTransition('back', prevStep);
    }
  }

  function handleNext() {
    if (activeStep === TOTAL_STEPS) {
      router.push({
        pathname: '/track-move' as any,
        params: {
          ...fd,
          counts: JSON.stringify(fd.counts),
          moverId: fd.selectedMoverId,
        },
      });
    } else {
      animateTransition('forward', nextStep);
    }
  }

  function handleBack() {
    if (activeStep === 1) {
      handleHeaderBack();
    } else {
      animateTransition('back', prevStep);
    }
  }

  // ── Footer config ─────────────────────────────────────────────────────
  const footer: WizardFooterConfig = {
    mode: 'single',
    nextLabel: activeStep === TOTAL_STEPS ? 'Confirm' : 'Next',
    onNext: handleNext,
  };

  // ── Step content ──────────────────────────────────────────────────────
  function renderStep() {
    switch (activeStep) {
      case 1: return <InstantStepPickupInfo />;
      case 2: return <InstantStepAddPhotos />;
      case 3: return <InstantStepSelectMover />;
      default: return null;
    }
  }

  return (
    <View style={styles.overlay}>
      {/* Expanding white circle — circular reveal */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.whiteBg, bgStyle]} />

      {/* Screen content */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.content, contentStyle]}>
        <WizardShell
          title={STEP_TITLES[activeStep - 1]}
          steps={STEPS}
          activeStep={activeStep}
          footer={footer}
          onHeaderBack={handleHeaderBack}
          footerInScroll={false}
          hideStepBar={false}>
          <Animated.View style={slideStyle}>
            {renderStep()}
          </Animated.View>
        </WizardShell>
      </Animated.View>
    </View>
  );
}

// ── Screen (with provider) ────────────────────────────────────────────────────

export default function InstantWizardScreen() {
  const params = useLocalSearchParams<{
    fromName: string;
    fromAddress: string;
    toName: string;
    toAddress: string;
    moveType: string;
    moveTypeId: string;
  }>();

  const initialState: InstantFormData = {
    fromName: params.fromName ?? '',
    fromAddress: params.fromAddress ?? '',
    toName: params.toName ?? '',
    toAddress: params.toAddress ?? '',
    moveType: params.moveType ?? '',
    moveTypeId: params.moveTypeId ?? '',

    selectedCategory: 'Living Room',
    counts: {},

    mainPhotos: [],
    extraPhotos: [],

    selectedMoverId: '1',
  };

  return (
    <WizardProvider initialState={initialState} totalSteps={TOTAL_STEPS}>
      <InstantWizardInner />
    </WizardProvider>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'transparent' },
  whiteBg: { backgroundColor: '#FFFFFF' },
  content: { flex: 1 },
});
