/**
 * Shared summary-card components used by both:
 *   - app/scheduled/move-review.tsx
 *   - app/move-details.tsx
 */
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Colors, FontFamily } from '@/constants/theme';

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
  return (
    <View style={s.cardHeadingBlock}>
      <Text style={s.cardHeading}>{title}</Text>
      {!!subtitle && <Text style={s.cardSubtitle}>{subtitle}</Text>}
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
  const rowStyle = dashed
    ? s.rowDashed
    : border === false
    ? s.rowNoBorder
    : s.rowSolid;

  return (
    <View style={[s.row, rowStyle]}>
      <Text style={s.rowLabel}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={s.rowValue}>{value}</Text>
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
  return (
    <View style={[s.card, padH15 && s.cardPadH15]}>
      {children}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  // Card wrapper
  card: {
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: '#B0B0B0',
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
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 26,
    color: Colors.textSecondary,
  },

  // Detail rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSolid: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E8EF',
    paddingBottom: 12,
    paddingTop: 4,
  },
  rowNoBorder: {
    paddingBottom: 12,
    paddingTop: 4,
  },
  rowDashed: {
    borderBottomWidth: 1,
    borderBottomColor: '#CDD5DF',
    borderStyle: 'dashed',
    paddingBottom: 20,
    paddingTop: 4,
  },
  rowLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.textSecondary,
    flex: 1,
  },
  rowValue: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 24,
    color: '#171717',
    textAlign: 'right',
    flexShrink: 1,
  },
});

// Re-export styles for screens that need to extend them
export const summaryCardStyles = s;
