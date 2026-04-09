import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 24;
const KNOB_SIZE = 20;
const PADDING = 2;
const TRAVEL = TRACK_WIDTH - KNOB_SIZE - PADDING * 2;

export function Toggle({ value, onChange }: ToggleProps) {
  const { colors } = useAppTheme();
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const bg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.textSecondary, Colors.primary],
  });
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRAVEL],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onChange(!value)}>
      <Animated.View style={[s.track, { backgroundColor: bg }]}>
        <Animated.View style={[s.knob, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: 12,
    padding: PADDING,
    justifyContent: 'center',
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#101828',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
