import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AvatarPlaceholderIcon, PencilIcon } from '@/components/ui/profile-icons';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

interface AvatarUploaderProps {
  imageUri?: string | null;
  onChange: (uri: string) => void;
}

export function AvatarUploader({ imageUri, onChange }: AvatarUploaderProps) {
  const { colors } = useAppTheme();
  async function pick() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      onChange(result.assets[0].uri);
    }
  }

  return (
    <View style={s.wrap}>
      <View style={[s.circle, { backgroundColor: colors.surfaceElevated }]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={s.image} />
        ) : (
          <AvatarPlaceholderIcon size={48} />
        )}
      </View>
      <TouchableOpacity style={s.pencilBtn} activeOpacity={0.85} onPress={pick}>
        <PencilIcon color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    width: 140,
    height: 140,
    alignSelf: 'center',
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  pencilBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 38,
    height: 38,
    borderRadius: 12.7,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
