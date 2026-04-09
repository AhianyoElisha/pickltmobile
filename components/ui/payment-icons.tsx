import { Circle, Path, Rect, Svg, Text as SvgText } from 'react-native-svg';

export function ApplePayIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.365 12.745c-.024-2.43 1.984-3.605 2.075-3.66-1.13-1.652-2.89-1.879-3.515-1.905-1.498-.151-2.92.881-3.68.881-.762 0-1.93-.86-3.175-.836-1.633.024-3.139.95-3.978 2.41-1.696 2.94-.434 7.28 1.218 9.665.81 1.165 1.776 2.475 3.04 2.428 1.222-.05 1.683-.789 3.16-.789 1.476 0 1.892.789 3.182.762 1.314-.024 2.146-1.188 2.95-2.36.93-1.353 1.314-2.66 1.337-2.728-.029-.013-2.566-.985-2.591-3.908ZM13.93 5.6c.673-.815 1.127-1.948.999-3.075-.967.04-2.137.643-2.83 1.456-.622.722-1.166 1.876-1.018 2.984 1.078.082 2.176-.547 2.85-1.365Z"
        fill="#0D121C"
      />
    </Svg>
  );
}

export function GooglePayIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12.05 12.18v2.86h3.97c-.16 1.04-.66 1.92-1.4 2.51l2.27 1.76c1.32-1.22 2.08-3.02 2.08-5.16 0-.5-.04-.98-.13-1.43l-6.79-.54Z" fill="#4285F4" />
      <Path d="M5.74 13.95l-.51.39-1.81 1.41C4.57 17.83 7.13 19.5 10.05 19.5c1.94 0 3.57-.64 4.76-1.74l-2.27-1.76c-.62.42-1.42.67-2.49.67-1.92 0-3.55-1.3-4.13-3.05l-.18.33Z" fill="#34A853" />
      <Path d="M3.42 8.25C2.94 9.21 2.66 10.3 2.66 11.5s.28 2.29.76 3.25c0 .01 3.08-2.39 3.08-2.39-.14-.42-.22-.86-.22-1.32 0-.46.08-.9.22-1.32L3.42 8.25Z" fill="#FBBC05" />
      <Path d="M10.05 6.45c1.06 0 2.01.37 2.76 1.08l2.07-2.07C13.57 4.31 11.93 3.5 10.05 3.5c-2.92 0-5.48 1.67-6.63 4.75l3.08 2.39c.58-1.75 2.21-3.05 4.13-3.05Z" fill="#EA4335" />
    </Svg>
  );
}

export function PayPalIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.5 3h6.2c2.6 0 4.4 1.3 4 4-.4 3.1-2.5 4.7-5.5 4.7h-2c-.4 0-.7.3-.8.7L9.5 17H6.3L8.5 3Z"
        fill="#003087"
      />
      <Path
        d="M10.4 8.5h2.7c2.5 0 4.3-1.2 4.7-3.7.4-2.2-1-3.3-3.4-3.3h-5c-.4 0-.7.3-.8.7L6.3 17h3.2l.9-5.5c.1-.4.4-.7.8-.7Z"
        fill="#0070E0"
      />
      <Path
        d="M17.6 8.5c-.5 3.1-2.6 4.6-5.6 4.6h-1.5l-.9 5.5h2.9c.4 0 .7-.3.8-.7l.6-3.6h2c2.6 0 4.5-1.4 5-4.1.2-1.1-.1-2.1-.8-2.7-.2.4-.3.7-.5 1Z"
        fill="#001C64"
      />
    </Svg>
  );
}

export function MastercardLogo({ width = 46, height = 28 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 46 28" fill="none">
      <Circle cx="17" cy="14" r="9" fill="#EB001B" />
      <Circle cx="29" cy="14" r="9" fill="#F79E1B" />
      <Path
        d="M23 7.4a9 9 0 0 1 0 13.2 9 9 0 0 1 0-13.2Z"
        fill="#FF5F00"
      />
    </Svg>
  );
}

export function VisaLogo({ width = 60, height = 28 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 60 28" fill="none">
      <SvgText x="0" y="20" fontSize="20" fontWeight="bold" fontStyle="italic" fill="#FFFFFF">
        VISA
      </SvgText>
      <SvgText x="34" y="27" fontSize="7" fill="#FFFFFF">
        Debit
      </SvgText>
    </Svg>
  );
}

export function CheckCircleIcon({
  size = 20,
  filled = true,
}: {
  size?: number;
  filled?: boolean;
}) {
  if (!filled) {
    return (
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Circle cx="10" cy="10" r="9.25" stroke="#2A3542" strokeWidth={1.5} fill="none" />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="10" cy="10" r="10" fill="#1D64EC" />
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

// Faint diagonal pattern overlay for cards (decorative)
export function CardPattern({ width = 335, height = 186, color = '#FFFFFF' }: { width?: number; height?: number; color?: string }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 335 186" fill="none">
      <Circle cx="280" cy="160" r="80" fill={color} fillOpacity={0.06} />
      <Circle cx="60" cy="20" r="60" fill={color} fillOpacity={0.05} />
    </Svg>
  );
}

// re-export Rect to avoid unused import warning if consumer doesn't import it
export { Rect };
