import Svg, { Circle, Line, Path, G } from 'react-native-svg';

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

// ── Star icon (feather-star, filled yellow) ───────────────────────────────────
export function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 0L10.4723 5.26569L16 6.11913L12 10.2156L12.9483 16L8.00474 13.2662L3.05548 15.9981L4.00379 10.2137L0 6.11533L5.52774 5.2619L8 0Z"
        fill="#FBCB2E"
      />
    </Svg>
  );
}

// ── Star outline icon (for interactive rating widget — unfilled/selected state) ─
export function StarOutlineIcon({
  color = '#697586',
  fillColor,
  size = 22,
}: {
  color?: string;
  fillColor?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fillColor ?? 'none'}
      />
    </Svg>
  );
}

// ── Users / profile-2user icon ────────────────────────────────────────────────
export function UsersIcon({
  color = '#fff',
  size = 20,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M7.63216 9.06159C7.54883 9.05326 7.44883 9.05326 7.35716 9.06159C5.37383 8.99492 3.79883 7.36992 3.79883 5.36992C3.79883 3.32826 5.44883 1.66992 7.49883 1.66992C9.54049 1.66992 11.1988 3.32826 11.1988 5.36992C11.1905 7.36992 9.61549 8.99492 7.63216 9.06159Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13.6752 3.33008C15.2919 3.33008 16.5919 4.63841 16.5919 6.24674C16.5919 7.82174 15.3419 9.10508 13.7836 9.16341C13.7169 9.15508 13.6419 9.15508 13.5669 9.16341" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3.46562 12.1301C1.44896 13.4801 1.44896 15.6801 3.46562 17.0217C5.75729 18.5551 9.51562 18.5551 11.8073 17.0217C13.824 15.6717 13.824 13.4717 11.8073 12.1301C9.52396 10.6051 5.76562 10.6051 3.46562 12.1301Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15.2832 16.6699C15.8832 16.5449 16.4499 16.3033 16.9165 15.9449C18.2165 14.9699 18.2165 13.3616 16.9165 12.3866C16.4582 12.0366 15.8999 11.8033 15.3082 11.6699" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ── Shopping bag icon ─────────────────────────────────────────────────────────
export function ShoppingBagIcon({
  color = '#fff',
  size = 20,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M7.00002 5.41667H13C15.8334 5.41667 16.1167 6.74167 16.3084 8.35833L17.0584 14.6083C17.3 16.6583 16.6667 18.3333 13.75 18.3333H6.25835C3.33335 18.3333 2.70002 16.6583 2.95002 14.6083L3.70003 8.35833C3.88336 6.74167 4.16669 5.41667 7.00002 5.41667Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.66667 6.66667V3.75C6.66667 2.5 7.5 1.66667 8.75 1.66667H11.25C12.5 1.66667 13.3333 2.5 13.3333 3.75V6.66667" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17.0083 14.1915H6.66667" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ── Vehicle / truck-group icon ────────────────────────────────────────────────
export function VehicleIcon({
  color = '#697586',
  size = 15,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <Path d="M7.5 8.75H8.125C8.8125 8.75 9.375 8.1875 9.375 7.5V1.25H3.75C2.8125 1.25 1.99376 1.76874 1.56876 2.53124" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1.25 10.625C1.25 11.6625 2.0875 12.5 3.125 12.5H3.75C3.75 11.8125 4.3125 11.25 5 11.25C5.6875 11.25 6.25 11.8125 6.25 12.5H8.75C8.75 11.8125 9.3125 11.25 10 11.25C10.6875 11.25 11.25 11.8125 11.25 12.5H11.875C12.9125 12.5 13.75 11.6625 13.75 10.625V8.75H11.875C11.5312 8.75 11.25 8.46875 11.25 8.125V6.25C11.25 5.90625 11.5312 5.625 11.875 5.625H12.6812L11.6125 3.75626C11.3875 3.36876 10.975 3.125 10.525 3.125H9.375V7.5C9.375 8.1875 8.8125 8.75 8.125 8.75H7.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 13.75C5.69036 13.75 6.25 13.1904 6.25 12.5C6.25 11.8096 5.69036 11.25 5 11.25C4.30964 11.25 3.75 11.8096 3.75 12.5C3.75 13.1904 4.30964 13.75 5 13.75Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 13.75C10.6904 13.75 11.25 13.1904 11.25 12.5C11.25 11.8096 10.6904 11.25 10 11.25C9.30964 11.25 8.75 11.8096 8.75 12.5C8.75 13.1904 9.30964 13.75 10 13.75Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13.75 7.5V8.75H11.875C11.5312 8.75 11.25 8.46875 11.25 8.125V6.25C11.25 5.90625 11.5312 5.625 11.875 5.625H12.6812L13.75 7.5Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1.25 5H5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1.25 6.875H3.75" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1.25 8.75H2.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
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

// ── Call / phone icon (vuesax/linear/call) ────────────────────────────────────
export function CallIcon({
  color = '#697586',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

// ── Message / chat bubble icon ────────────────────────────────────────────────
export function MessageIcon({
  color = '#697586',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.5 14.5H15.5M8.5 9.5H12"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z"
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

// ── Box Add icon (vuesax/linear/box-add) — for loading/unloading status ──────
export function BoxAddIcon({
  color = '#697586',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.93 2.48L4.59 5.45C3.38 6.12 2.39 7.8 2.39 9.18V14.83C2.39 16.21 3.38 17.89 4.59 18.56L9.93 21.53C11.07 22.16 12.94 22.16 14.08 21.53L19.42 18.56C20.63 17.89 21.62 16.21 21.62 14.83V9.18C21.62 7.8 20.63 6.12 19.42 5.45L14.08 2.48C12.93 1.84 11.07 1.84 9.93 2.48Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.27 7.96L12 13.07L20.73 7.96"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 22.08V13.06"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 5.5V2.5M8.5 4H11.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Check circle (filled green, white tick) — for arrival/completion banners ──
export function CheckCircleIcon({ size = 25 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Circle cx={12.5} cy={12.5} r={12.5} fill="#17B26A" />
      <Path
        d="M7.5 12.5L10.8 16L17.5 9.5"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Verified mover badge (small blue circle with white tick) ───────────────────
export function VerifiedBadgeIcon({ size = 14 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Circle cx={7} cy={7} r={7} fill="#1D64EC" />
      <Path
        d="M4 7L6.2 9.2L10.4 5"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Volume / Speaker icon — viewBox 0 0 24 24, stroke-based ─────────────────
export function VolumeIcon({
  color = '#fff',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Speaker cone */}
      <Path
        d="M11 5L6 9H3C2.45 9 2 9.45 2 10V14C2 14.55 2.45 15 3 15H6L11 19V5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Short wave */}
      <Path
        d="M15.54 8.46a5 5 0 0 1 0 7.07"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Long wave */}
      <Path
        d="M19.07 4.93a10 10 0 0 1 0 14.14"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ── Microphone icon — viewBox 0 0 24 24, stroke-based ────────────────────────
export function MicrophoneIcon({
  color = '#fff',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Capsule body */}
      <Path
        d="M12 2C10.34 2 9 3.34 9 5V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V5C15 3.34 13.66 2 12 2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Stand arc */}
      <Path
        d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Post */}
      <Path d="M12 19V22" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      {/* Base */}
      <Path d="M8 22H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// ── Send icon (paper-plane) — viewBox 0 0 24 24, stroke-based ───────────────
export function SendIcon({
  color = '#fff',
  size = 20,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 2L11 13"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Smile / Emoji icon — viewBox 0 0 24 24, stroke-based ────────────────────
export function SmileIcon({
  color = '#9AA4B2',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 14C8.5 14 9.5 16 12 16C14.5 16 15.5 14 15.5 14"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Eyes */}
      <Path
        d="M9 10H9.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M15 10H15.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ── Attachment / Paperclip icon — viewBox 0 0 24 24, stroke-based ────────────
export function AttachmentIcon({
  color = '#9AA4B2',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 21.9983 8.005 21.9983C6.41277 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63416 12.8758 3.76 11.75L12.33 3.18C13.0858 2.42412 14.1084 2.00018 15.175 2.00018C16.2416 2.00018 17.2642 2.42412 18.02 3.18C18.7759 3.93589 19.1998 4.95843 19.1998 6.025C19.1998 7.09157 18.7759 8.11411 18.02 8.87L9.41 17.46C9.03214 17.8379 8.52072 18.0498 7.9875 18.0498C7.45428 18.0498 6.94286 17.8379 6.565 17.46C6.18714 17.0821 5.97518 16.5707 5.97518 16.0375C5.97518 15.5043 6.18714 14.9929 6.565 14.615L15.07 6.11"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Route connector (filled dot → line → hollow dot) — viewBox 0 0 11 52 ─────
// Extracted from Figma asset: assets/icons/route-connector.svg
export function RouteConnectorIcon() {
  return (
    <Svg width={11} height={52} viewBox="0 0 11 52" fill="none">
      {/* Top filled circle (pick-up) */}
      <Circle cx={5.5} cy={5.5} r={5.5} fill="#0D121C" />
      {/* Connecting line */}
      <Line x1={5.5} y1={8} x2={5.5} y2={50} stroke="#0D121C" />
      {/* Bottom circle (drop-off) — black ring + white fill centre */}
      <Circle cx={5.5} cy={46.5} r={5.5} fill="#0D121C" />
      <Circle cx={5.5} cy={46.5} r={2.2} fill="white" />
    </Svg>
  );
}
