import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// Use require so TS picks up the local .d.ts shim instead of resolving the
// package's untyped .tsx source (which has internal type errors).
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { CountryPicker } = require('react-native-country-codes-picker');

import { ChevronDownIcon } from '@/components/ui/profile-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

export interface CountrySelection {
  flag: string;
  dialCode: string;
  code: string;
}

interface Props {
  flag: string;
  dialCode: string;
  onChange: (country: CountrySelection) => void;
}

export function CountryPickerField({ flag, dialCode, onChange }: Props) {
  const [show, setShow] = useState(false);
  const { colors } = useAppTheme();

  return (
    <>
      <TouchableOpacity style={[s.btn, { borderRightColor: colors.divider }]} activeOpacity={0.7} onPress={() => setShow(true)}>
        <Text style={s.flag}>{flag}</Text>
        <Text style={[s.dial, { color: colors.textPrimary }]}>{dialCode}</Text>
        <ChevronDownIcon size={14} color={colors.textSecondary} />
      </TouchableOpacity>

      <CountryPicker
        show={show}
        lang="en"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pickerButtonOnPress={(item: any) => {
          onChange({ flag: item.flag, dialCode: item.dial_code, code: item.code });
          setShow(false);
        }}
        onBackdropPress={() => setShow(false)}
        style={{
          modal: { height: 500, backgroundColor: colors.surfaceElevated },
          textInput: {
            fontFamily: FontFamily.regular,
            color: colors.textPrimary,
            backgroundColor: colors.surface,
            borderRadius: 12,
          },
          countryButtonStyles: {
            backgroundColor: colors.surfaceElevated,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.divider,
          },
          countryName: {
            fontFamily: FontFamily.medium,
            color: colors.textPrimary,
          },
          dialCode: {
            fontFamily: FontFamily.regular,
            color: colors.textSecondary,
          },
        }}
      />
    </>
  );
}

const s = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 8,
    borderRightWidth: 1,
    marginRight: 4,
    height: 32,
  },
  flag: { fontSize: 18 },
  dial: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
});
