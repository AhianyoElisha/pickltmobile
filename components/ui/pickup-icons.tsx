import Svg, { Circle, Path, G } from 'react-native-svg';

// ── Back arrow (ArrowLeft) — viewBox 0 0 20 20, stroke-based ─────────────────
export function ArrowLeftIcon({
  color = '#fff',
  size = 20,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.875 10H3.125"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.75 4.375L3.125 10L8.75 15.625"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Pickup location pin — viewBox 0 0 16.86 19.77, stroke-based ──────────────
export function PickupPinIcon({
  color = '#697586',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={(size / 16.86) * 19.77} viewBox="0 0 16.8566 19.7703" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.75 8.40222C0.764407 4.16163 4.21376 0.735638 8.45435 0.750045C12.6949 0.764453 16.1209 4.21381 16.1065 8.45439V8.54135C16.0543 11.2979 14.5152 13.8457 12.6283 15.837C11.5491 16.9576 10.344 17.9497 9.03696 18.7935C8.68746 19.0958 8.16906 19.0958 7.81957 18.7935C5.87107 17.5253 4.16093 15.924 2.76739 14.0631C1.52535 12.4403 0.820165 10.4707 0.75 8.42831L0.75 8.40222Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={8.42826}
        cy={8.55005}
        r={2.46087}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Route direction (mage:direction-up-2, rotated 90°) ───────────────────────
export function RouteDirectionIcon({
  color = '#697586',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    // rotate="90" centres on (12,12) to point right (destination arrow)
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G rotation={90} origin="12,12">
        <Path
          d="M12.052 10.595V17.319M10.884 17.608L6.28 20.81C5.88188 21.0327 5.4236 21.124 4.97053 21.0709C4.51745 21.0178 4.0927 20.823 3.75685 20.5143C3.42099 20.2056 3.19117 19.7988 3.10016 19.3518C3.00914 18.9048 3.06158 18.4404 3.25 18.025L9.946 4.001C10.1199 3.62725 10.397 3.31095 10.7445 3.08931C11.0921 2.86768 11.4958 2.74994 11.908 2.74994C12.3202 2.74994 12.7239 2.86768 13.0715 3.08931C13.419 3.31095 13.6961 3.62725 13.87 4.001L20.767 18.228C20.9428 18.6345 20.9897 19.0852 20.9012 19.5192C20.8128 19.9531 20.5933 20.3495 20.2724 20.6548C19.9515 20.9601 19.5447 21.1596 19.1069 21.2263C18.669 21.293 18.2213 21.2238 17.824 21.028L13.062 17.608C12.734 17.4078 12.3572 17.3019 11.973 17.3019C11.5888 17.3019 11.212 17.4078 10.884 17.608Z"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

// ── GPS target (vuesax/linear/gps) ───────────────────────────────────────────
export function GpsTargetIcon({
  color = '#fff',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M12 4V2" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 12H2" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 20V22" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20 12H22" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ── Plus icon (for Add Custom Items button) ───────────────────────────────────
export function PlusIcon({
  color = '#0D121C',
  size = 16,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17.5 17.5" fill="none">
      <Path
        d="M8.75 0.75V16.75M16.75 8.75H0.75"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Counter minus button (circle with minus) ──────────────────────────────────
export function MinusCircleIcon({
  color = '#1D64EC',
  size = 32,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 4C9.37321 4 4 9.37321 4 16C4 22.6268 9.37321 28 16 28C22.6268 28 28 22.6268 28 16C28 9.37321 22.6268 4 16 4ZM21.1429 16.6429C21.1429 16.7607 21.0464 16.8571 20.9286 16.8571H11.0714C10.9536 16.8571 10.8571 16.7607 10.8571 16.6429V15.3571C10.8571 15.2393 10.9536 15.1429 11.0714 15.1429H20.9286C21.0464 15.1429 21.1429 15.2393 21.1429 15.3571V16.6429Z"
        fill={color}
      />
    </Svg>
  );
}

// ── Camera icon ───────────────────────────────────────────────────────────────
export function CameraIcon({
  color = '#697586',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.76 22H17.24C20 22 21.1 20.31 21.23 18.25L21.75 9.99C21.89 7.83 20.17 6 18 6C17.39 6 16.83 5.65 16.55 5.11L15.83 3.66C15.37 2.75 14.17 2 13.15 2H10.86C9.83 2 8.63 2.75 8.17 3.66L7.45 5.11C7.17 5.65 6.61 6 6 6C3.83 6 2.11 7.83 2.25 9.99L2.77 18.25C2.89 20.31 4 22 6.76 22Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 8H13.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 18C13.79 18 15.25 16.54 15.25 14.75C15.25 12.96 13.79 11.5 12 11.5C10.21 11.5 8.75 12.96 8.75 14.75C8.75 16.54 10.21 18 12 18Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Gallery add icon ───────────────────────────────────────────────────────────
export function GalleryAddIcon({
  color = '#697586',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.75 5H21.25"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.5 7.75V2.25"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Counter plus button (circle with plus) ────────────────────────────────────
export function PlusCircleIcon({
  color = '#1D64EC',
  size = 32,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 4C9.37321 4 4 9.37321 4 16C4 22.6268 9.37321 28 16 28C22.6268 28 28 22.6268 28 16C28 9.37321 22.6268 4 16 4ZM21.1429 16.6429C21.1429 16.7607 21.0464 16.8571 20.9286 16.8571H16.8571V20.9286C16.8571 21.0464 16.7607 21.1429 16.6429 21.1429H15.3571C15.2393 21.1429 15.1429 21.0464 15.1429 20.9286V16.8571H11.0714C10.9536 16.8571 10.8571 16.7607 10.8571 16.6429V15.3571C10.8571 15.2393 10.9536 15.1429 11.0714 15.1429H15.1429V11.0714C15.1429 10.9536 15.2393 10.8571 15.3571 10.8571H16.6429C16.7607 10.8571 16.8571 10.9536 16.8571 11.0714V15.1429H20.9286C21.0464 15.1429 21.1429 15.2393 21.1429 15.3571V16.6429Z"
        fill={color}
      />
    </Svg>
  );
}
