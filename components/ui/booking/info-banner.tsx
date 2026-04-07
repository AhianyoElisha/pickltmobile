import { StyleSheet, Text, View } from 'react-native';

import { CameraIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

interface InfoBannerProps {
  text: string;
}

export function InfoBanner({ text }: InfoBannerProps) {
  return (
    <View style={s.card}>
      <CameraIcon size={24} color={Colors.textSecondary} />
      <Text style={s.text}>{text}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  text: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.textPrimary,
  },
});
