import Svg, { Path, Circle } from 'react-native-svg';

import { Colors } from '@/constants/theme';

export function PencilIcon({ color = '#fff', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M14.166 2.5a1.768 1.768 0 1 1 2.5 2.5L6.25 15.417 2.5 16.667l1.25-3.75L14.166 2.5Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronDownIcon({
  color = Colors.textSecondary,
  size = 16,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4 6L8 10L12 6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AvatarPlaceholderIcon({
  size = 48,
  color = Colors.textSecondary,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Circle cx="24" cy="18" r="8" stroke={color} strokeWidth={2} />
      <Path
        d="M8 40c2.5-7.5 9-12 16-12s13.5 4.5 16 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
