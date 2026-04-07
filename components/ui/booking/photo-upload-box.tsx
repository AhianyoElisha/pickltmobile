import * as ImagePicker from 'expo-image-picker';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { GalleryAddIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

interface PhotoUploadBoxProps {
  title: string;
  subtitle?: string;
  photos: string[];
  onPhotosChange: (uris: string[]) => void;
}

async function pickImages(
  current: string[],
  onDone: (uris: string[]) => void,
) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    quality: 0.8,
  });
  if (!result.canceled) {
    onDone([...current, ...result.assets.map((a) => a.uri)]);
  }
}

export function PhotoUploadBox({
  title,
  subtitle = 'PNG, JPG up to 3MB',
  photos,
  onPhotosChange,
}: PhotoUploadBoxProps) {
  if (photos.length === 0) {
    return (
      <TouchableOpacity
        style={s.emptyBox}
        activeOpacity={0.7}
        onPress={() => pickImages(photos, onPhotosChange)}>
        <GalleryAddIcon size={32} color={Colors.textSecondary} />
        <Text style={s.emptyTitle}>{title}</Text>
        <Text style={s.emptySubtitle}>{subtitle}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={s.filledBox}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.thumbRow}>
        {photos.map((uri, i) => (
          <View key={i} style={s.thumbWrap}>
            <Image source={{ uri }} style={s.thumb} resizeMode="cover" />
            <TouchableOpacity
              style={s.removeBtn}
              onPress={() => onPhotosChange(photos.filter((_, j) => j !== i))}
              activeOpacity={0.8}>
              <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <Path
                  d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                  stroke="#fff"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add more button */}
        <TouchableOpacity
          style={s.addMoreBtn}
          activeOpacity={0.7}
          onPress={() => pickImages(photos, onPhotosChange)}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 5v14M5 12h14"
              stroke={Colors.textSecondary}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const THUMB = 72;

const s = StyleSheet.create({
  // Empty state
  emptyBox: {
    height: 150,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
  },
  emptyTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 20,
    color: '#333333',
  },
  emptySubtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#858585',
    textAlign: 'center',
  },

  // Filled state
  filledBox: {
    minHeight: THUMB + 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    backgroundColor: Colors.white,
    paddingVertical: 8,
  },
  thumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  thumbWrap: {
    width: THUMB,
    height: THUMB,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumb: {
    width: THUMB,
    height: THUMB,
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoreBtn: {
    width: THUMB,
    height: THUMB,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
