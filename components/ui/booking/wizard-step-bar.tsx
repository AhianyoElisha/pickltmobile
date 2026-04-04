import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';

const STEPS = [
  { num: 1, label: 'Move Details' },
  { num: 2, label: 'Pick Up Address' },
  { num: 3, label: 'Drop Off Address' },
  { num: 4, label: 'Inventory' },
] as const;

interface Props {
  activeStep: 1 | 2 | 3 | 4;
}

export function WizardStepBar({ activeStep }: Props) {
  return (
    <View style={s.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.content}>
        {STEPS.map((step, i) => {
          const isActive = step.num === activeStep;
          return (
            <View key={step.num} style={s.group}>
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
