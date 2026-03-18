import { StyleSheet } from 'react-native';
import { Colors, FontFamily } from '@/constants/theme';

export const fieldStyles = StyleSheet.create({
  row: {
    height: 54,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  iconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
    marginLeft: 19,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 15.6,
    color: 'rgba(255,255,255,0.5)',
  },
  value: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 18.2,
    color: Colors.white,
  },
  placeholder: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 18.2,
    color: 'rgba(255,255,255,0.4)',
  },
});
