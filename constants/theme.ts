// PickLT Design System — colours and typography tokens
// Sourced from Figma file: yG9jobqptDSJTE7NYw1Joh

// ─── Colours ────────────────────────────────────────────────────────────────

export const Colors = {
  /** Primary brand blue */
  primary: '#1D64EC',
  /** Near-black — primary body text */
  textPrimary: '#0D121C',
  /** Secondary / subdued text */
  textSecondary: '#697586',
  /** Light text on dark backgrounds (e.g. onboarding subtitles) */
  textLight: '#E3E8EF',
  /** Pure white */
  white: '#FFFFFF',
  /** App background */
  background: '#FFFFFF',
  /** Dark border (e.g. Google button outline) */
  borderDark: '#2A3542',
  /** Light border / dividers */
  borderLight: '#E3E8EF',
  /** Input border */
  inputBorder: '#D0D0D0',
  /** Tab bar — inactive icon */
  tabIconDefault: '#697586',
  /** Tab bar — active icon */
  tabIconSelected: '#1D64EC',

  // Legacy aliases kept for existing component compatibility
  light: {
    text: '#0D121C',
    background: '#FFFFFF',
    tint: '#1D64EC',
    icon: '#697586',
    tabIconDefault: '#697586',
    tabIconSelected: '#1D64EC',
  },
  dark: {
    text: '#E3E8EF',
    background: '#0D121C',
    tint: '#FFFFFF',
    icon: '#697586',
    tabIconDefault: '#697586',
    tabIconSelected: '#FFFFFF',
  },
} as const;

// ─── Typography ─────────────────────────────────────────────────────────────
// SF Pro Display is loaded via expo-font in app/_layout.tsx.
// Use these family keys in StyleSheet fontFamily values.

export const FontFamily = {
  regular: 'SFProDisplay-Regular',
  medium: 'SFProDisplay-Medium',
  semibold: 'SFProDisplay-Semibold',
  bold: 'SFProDisplay-Bold',
  heavy: 'SFProDisplay-Heavy',
} as const;

// Figma text-style tokens
export const TextStyles = {
  /** Heading/H4 — 24px Bold (600), lineHeight 1.5 */
  h4: {
    fontFamily: FontFamily.semibold,
    fontSize: 24,
    lineHeight: 36,
  },
  /** Body/Large/Semibold — 18px Bold (600), lineHeight 1.4 */
  bodyLargeSemibold: {
    fontFamily: FontFamily.semibold,
    fontSize: 18,
    lineHeight: 25.2,
  },
  /** Body/Medium/Regular — 16px Regular (400), lineHeight 1.4 */
  bodyMediumRegular: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 22.4,
  },
  /** Body/Medium/Medium — 16px Medium (500), lineHeight 1.4 */
  bodyMediumMedium: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22.4,
  },
  /** Body/Medium/Semibold — 16px Semibold (600), lineHeight 1.4 */
  bodyMediumSemibold: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
  },
  /** Body/Small/Regular — 14px Regular (400), lineHeight 1.4 */
  bodySmallRegular: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
  },
  /** Body/Small/Medium — 14px Medium (500), lineHeight 1.4 */
  bodySmallMedium: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
} as const;

// ─── Legacy Fonts export (kept for existing references) ─────────────────────
export const Fonts = FontFamily;
