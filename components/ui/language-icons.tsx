import Svg, { Circle, Path } from 'react-native-svg';

import { Colors } from '@/constants/theme';

export function CheckboxCheckedIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="10" cy="10" r="10" fill={Colors.primary} />
      <Path
        d="M6 10.4L8.8 13.2L14.2 7.4"
        stroke="#FFFFFF"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CheckboxUncheckedIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="10" cy="10" r="9.25" stroke="#2A3542" strokeWidth={1.5} fill="none" />
    </Svg>
  );
}
