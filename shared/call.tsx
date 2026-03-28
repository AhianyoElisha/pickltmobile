import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
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
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ArrowLeftIcon,
  CallIcon,
  MicrophoneIcon,
  VolumeIcon,
} from '@/components/ui/pickup-icons';
import { FontFamily } from '@/constants/theme';

export default function CallScreen() {
  const insets = useSafeAreaInsets();

  // ── Circular-reveal animation ───────────────────────────────────────────────
  const revealScale = useSharedValue(0);
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

  const handleBack = () => {
    contentOpacity.value = withTiming(0, { duration: 150 });
    revealScale.value = withTiming(
      0,
      { duration: 380, easing: Easing.in(Easing.cubic) },
      () => runOnJS(router.back)(),
    );
  };

  // ── Call timer ──────────────────────────────────────────────────────────────
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  // ── Ripple animations ───────────────────────────────────────────────────────
  const r1Scale   = useSharedValue(1);
  const r1Opacity = useSharedValue(0.12);
  const r2Scale   = useSharedValue(1);
  const r2Opacity = useSharedValue(0.25);

  useEffect(() => {
    r1Scale.value = withRepeat(
      withSequence(
        withTiming(1.07, { duration: 1300, easing: Easing.inOut(Easing.sin) }),
        withTiming(1.0,  { duration: 1300, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
    );
    r1Opacity.value = withRepeat(
      withSequence(
        withTiming(0.23, { duration: 1300 }),
        withTiming(0.10, { duration: 1300 }),
      ),
      -1,
    );
    r2Scale.value = withDelay(
      500,
      withRepeat(
        withSequence(
          withTiming(1.10, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
          withTiming(1.0,  { duration: 1000, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
      ),
    );
    r2Opacity.value = withDelay(
      500,
      withRepeat(
        withSequence(
          withTiming(0.48, { duration: 1000 }),
          withTiming(0.25, { duration: 1000 }),
        ),
        -1,
      ),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const r1Style = useAnimatedStyle(() => ({
    transform: [{ scale: r1Scale.value }],
    opacity: r1Opacity.value,
  }));

  const r2Style = useAnimatedStyle(() => ({
    transform: [{ scale: r2Scale.value }],
    opacity: r2Opacity.value,
  }));

  return (
    <View style={styles.overlay}>
      {/* ── Expanding white circle — circular reveal ──────────────────────── */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.whiteBg, bgStyle]} />

      {/* ── Screen content ────────────────────────────────────────────────── */}
      <Animated.View style={[StyleSheet.absoluteFill, contentStyle]}>

        {/* Header ─────────────────────────────────────────────────────────── */}
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.85}
            onPress={handleBack}
          >
            <ArrowLeftIcon color="#fff" size={20} />
          </TouchableOpacity>

          <Text style={styles.title}>Audio Call</Text>

          {/* Plain spacer — same width as back button to keep title centred */}
          <View style={styles.headerSpacer} />
        </View>

        {/* Caller section — flex centred in remaining space ───────────────── */}
        <View style={[styles.callerSection, { paddingBottom: insets.bottom + 44 + 72 + 44 }]}>

          {/* Concentric ripple rings + avatar */}
          <View style={styles.imageBox}>
            {/* Ring 1 — outermost (254×254) */}
            <Animated.View style={[styles.ring1, r1Style]} />
            {/* Ring 2 — middle (200×200) */}
            <Animated.View style={[styles.ring2, r2Style]} />
            {/* Ring 3 — solid brand blue (144×144) */}
            <View style={styles.ring3} />
            {/* Avatar placeholder (80×80) */}
            <View style={styles.avatar} />
          </View>

          {/* Name + timer */}
          <View style={styles.textBlock}>
            <Text style={styles.name}>Angela Mellinger</Text>
            <Text style={styles.timerText}>{mm}:{ss}</Text>
          </View>
        </View>

        {/* Bottom action bar ──────────────────────────────────────────────── */}
        <View style={[styles.actionsRow, { bottom: insets.bottom + 44 }]}>
          {/* Speaker */}
          <TouchableOpacity style={styles.actionSm} activeOpacity={0.8}>
            <VolumeIcon color="#fff" size={24} />
          </TouchableOpacity>

          {/* End call — phone icon rotated 135° to signal hang-up */}
          <TouchableOpacity
            style={styles.actionEnd}
            activeOpacity={0.8}
            onPress={handleBack}
          >
            <View style={styles.endCallIconWrapper}>
              <CallIcon color="#fff" size={28} />
            </View>
          </TouchableOpacity>

          {/* Microphone */}
          <TouchableOpacity style={styles.actionSm} activeOpacity={0.8}>
            <MicrophoneIcon color="#fff" size={24} />
          </TouchableOpacity>
        </View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  whiteBg: {
    backgroundColor: '#ffffff',
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1D64EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Invisible spacer — no background, keeps title centred
  headerSpacer: {
    width: 48,
    height: 48,
  },
  title: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: '#0D121C',
    textAlign: 'center',
  },

  // ── Caller section — vertically centred between header and action bar ────────
  callerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },

  // 254×254 container for the four concentric rings
  imageBox: {
    width: 254,
    height: 254,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Outermost ring  — 254×254
  ring1: {
    position: 'absolute',
    width: 254,
    height: 254,
    borderRadius: 127,
    backgroundColor: 'rgba(29,100,236,0.15)',
  },
  // Second ring — 200×200
  ring2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(29,100,236,0.28)',
  },
  // Solid blue ring — 144×144
  ring3: {
    position: 'absolute',
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: '#1D64EC',
  },
  // Avatar placeholder — 80×80
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E4E7EC',
  },

  // ── Text under ripple ────────────────────────────────────────────────────────
  textBlock: {
    alignItems: 'center',
    gap: 11,
  },
  name: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
    color: '#0D121C',
    textAlign: 'center',
  },
  timerText: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 22.4,
    color: '#0D121C',
    textAlign: 'center',
  },

  // ── Bottom actions ───────────────────────────────────────────────────────────
  actionsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  actionSm: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9AA4B2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionEnd: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E53051',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Rotate the phone icon 135° to represent "end call" (hang-up gesture)
  endCallIconWrapper: {
    transform: [{ rotate: '135deg' }],
  },
});
