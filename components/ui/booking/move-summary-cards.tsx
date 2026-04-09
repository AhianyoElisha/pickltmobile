/**
 * Shared summary-card components used by both:
 *   - app/scheduled/move-review.tsx
 *   - app/move-details.tsx
 */
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

// ── SmallCheckedIcon ──────────────────────────────────────────────────────────

export function SmallCheckedIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={8} r={8} fill={Colors.primary} />
      <Path
        d="M4.5 8.5L7 11L11.5 5.5"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── CardHeading ───────────────────────────────────────────────────────────────

export function CardHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { colors } = useAppTheme();
  return (
    <View style={s.cardHeadingBlock}>
      <Text style={[s.cardHeading, { color: colors.textPrimary }]}>{title}</Text>
      {!!subtitle && <Text style={[s.cardSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
    </View>
  );
}

// ── DetailRow ─────────────────────────────────────────────────────────────────

export function DetailRow({
  label,
  value,
  dashed = false,
  border = true,
}: {
  label: string;
  value: string | React.ReactNode;
  dashed?: boolean;
  border?: boolean;
}) {
  const { colors } = useAppTheme();
  const rowStyle = dashed
    ? [s.rowDashed, { borderBottomColor: colors.divider }]
    : border === false
    ? s.rowNoBorder
    : [s.rowSolid, { borderBottomColor: colors.divider }];

  return (
    <View style={[s.row, rowStyle]}>
      <Text style={[s.rowLabel, { color: colors.textSecondary }]}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={[s.rowValue, { color: colors.textPrimary }]}>{value}</Text>
      ) : (
        value
      )}
    </View>
  );
}

// ── ReviewCard ────────────────────────────────────────────────────────────────

export function ReviewCard({
  children,
  padH15 = false,
}: {
  children: React.ReactNode;
  padH15?: boolean;
}) {
  const { colors } = useAppTheme();
  return (
    <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.borderDark }, padH15 && s.cardPadH15]}>
      {children}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  // Card wrapper
  card: {
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 12,
  },
  cardPadH15: { paddingHorizontal: 15 },

  // Card heading
  cardHeadingBlock: { gap: 0 },
  cardHeading: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 26,
  },
  cardSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 26,
  },

  // Detail rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSolid: {
    borderBottomWidth: 1,
    paddingBottom: 12,
    paddingTop: 4,
  },
  rowNoBorder: {
    paddingBottom: 12,
    paddingTop: 4,
  },
  rowDashed: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingBottom: 20,
    paddingTop: 4,
  },
  rowLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
  },
  rowValue: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
    flexShrink: 1,
  },
});

// Re-export styles for screens that need to extend them
export const summaryCardStyles = s;
