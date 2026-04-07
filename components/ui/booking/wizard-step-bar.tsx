import { useEffect, useRef } from 'react';
import { Dimensions, LayoutChangeEvent, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';

const DEFAULT_STEPS = [
  { num: 1, label: 'Move Details' },
  { num: 2, label: 'Pick Up Address' },
  { num: 3, label: 'Drop Off Address' },
  { num: 4, label: 'Inventory' },
  { num: 5, label: 'Move Timing' },
  { num: 6, label: 'Additional services & photos' },
  { num: 7, label: 'Payment information' },
];

export interface StepDef {
  num: number;
  label: string;
}

interface Props {
  activeStep: number;
  steps?: StepDef[];
}

export function WizardStepBar({ activeStep, steps }: Props) {
  const resolvedSteps = steps ?? DEFAULT_STEPS;
  const scrollRef = useRef<ScrollView>(null);
  const stepPositions = useRef<Record<number, { x: number; width: number }>>({});
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const pos = stepPositions.current[activeStep];
    if (pos && scrollRef.current) {
      const scrollTo = pos.x + pos.width / 2 - screenWidth / 2;
      scrollRef.current.scrollTo({ x: Math.max(0, scrollTo), animated: true });
    }
  }, [activeStep, screenWidth]);

  function handleStepLayout(num: number, e: LayoutChangeEvent) {
    stepPositions.current[num] = {
      x: e.nativeEvent.layout.x,
      width: e.nativeEvent.layout.width,
    };
  }

  return (
    <View style={s.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.content}>
        {resolvedSteps.map((step, i) => {
          const isActive = step.num === activeStep;
          return (
            <View
              key={step.num}
              style={s.group}
              onLayout={(e) => handleStepLayout(step.num, e)}>
              {i > 0 && <View style={s.dash} />}
              <View style={s.step}>
                <View style={[s.circle, isActive ? s.circleActive : s.circleInactive]}>
                  <Text style={isActive ? s.numActive : s.numInactive}>{step.num}</Text>
                </View>
                <Text style={isActive ? s.labelActive : s.labelInactive}>{step.label}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  // Outer View controls vertical rhythm — ScrollView only scrolls horizontally
  wrapper: {
    paddingTop: 8,
    paddingBottom: 8,
  },

  // Content inside the scroll: horizontal padding + gap between groups
  content: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },

  group: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  step:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dash:  { width: 20, height: 1, backgroundColor: '#CDD5DF' },

  circle:         { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  circleActive:   { backgroundColor: Colors.primary },
  circleInactive: { backgroundColor: '#F0F0F0' },

  numActive:   { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 18, color: Colors.white },
  numInactive: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 18, color: '#B0B0B0' },

  labelActive:   { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 18, color: Colors.textPrimary },
  labelInactive: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 18, color: '#B0B0B0' },
});
