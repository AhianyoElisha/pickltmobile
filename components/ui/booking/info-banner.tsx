import { StyleSheet, Text, View } from 'react-native';

import { CameraIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface InfoBannerProps {
  text: string;
}

export function InfoBanner({ text }: InfoBannerProps) {
  const { colors } = useAppTheme();
  return (
    <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.textSecondary }]}>
      <CameraIcon size={24} color={colors.textSecondary} />
      <Text style={[s.text, { color: colors.textPrimary }]}>{text}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  text: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16.8,
  },
});
