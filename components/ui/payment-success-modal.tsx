import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

import { Colors, FontFamily } from '@/constants/theme';

// ── Success illustration ──────────────────────────────────────────────────────

function SuccessIllustration() {
  const C = Colors.primary; // #1D64EC

  // Sparkle helper: 4-ray star at (cx, cy) with arm length r
  function Sparkle({ cx, cy, r = 4, color = C }: { cx: number; cy: number; r?: number; color?: string }) {
    return (
      <G>
        <Path d={`M${cx} ${cy - r} L${cx} ${cy + r}`} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <Path d={`M${cx - r} ${cy} L${cx + r} ${cy}`} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <Path d={`M${cx - r * 0.7} ${cy - r * 0.7} L${cx + r * 0.7} ${cy + r * 0.7}`} stroke={color} strokeWidth={1} strokeLinecap="round" />
        <Path d={`M${cx + r * 0.7} ${cy - r * 0.7} L${cx - r * 0.7} ${cy + r * 0.7}`} stroke={color} strokeWidth={1} strokeLinecap="round" />
      </G>
    );
  }

  return (
    <Svg width={144} height={144} viewBox="0 0 144 144" fill="none">
      {/* Main blue circle */}
      <Circle cx={72} cy={72} r={52} fill={C} />

      {/* White checkmark */}
      <Path
        d="M52 72L65 85L92 58"
        stroke="white"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sparkle elements around circle */}
      <Sparkle cx={14} cy={32} r={4} />
      <Sparkle cx={130} cy={28} r={3.5} />
      <Sparkle cx={28} cy={124} r={3} />
      <Sparkle cx={120} cy={118} r={4} />
      <Sparkle cx={10} cy={88} r={2.5} />
      <Sparkle cx={134} cy={88} r={2.5} />

      {/* Small dots */}
      <Circle cx={36} cy={10} r={3} fill={C} />
      <Circle cx={108} cy={134} r={3} fill={C} />
      <Circle cx={12} cy={110} r={2} fill={C} opacity={0.6} />
      <Circle cx={132} cy={60} r={2} fill={C} opacity={0.6} />
    </Svg>
  );
}

// ── PaymentSuccessModal ───────────────────────────────────────────────────────

interface PaymentSuccessModalProps {
  visible: boolean;
  onCheckDetails: () => void;
}

export function PaymentSuccessModal({
  visible,
  onCheckDetails,
}: PaymentSuccessModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      {/* Backdrop */}
      <TouchableWithoutFeedback>
        <View style={s.backdrop}>
          {/* Modal card */}
          <View style={s.card}>
            {/* Icon + text */}
            <View style={s.iconSection}>
              <SuccessIllustration />
              <View style={s.textBlock}>
                <Text style={s.title}>Payment Successful!</Text>
                <Text style={s.subtitle}>
                  Your reservation has been successfully completed. Enjoy your stay!
                </Text>
              </View>
            </View>

            {/* CTA button */}
            <TouchableOpacity
              style={s.btn}
              activeOpacity={0.85}
              onPress={onCheckDetails}>
              <Text style={s.btnText}>Check Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(13,13,13,0.82)',
    borderRadius: 32,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    gap: 24,
    alignItems: 'center',
  },
  iconSection: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  textBlock: {
    width: '100%',
    gap: 8,
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
  },
});
