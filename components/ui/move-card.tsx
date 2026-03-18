import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CardAddressPinIcon, CardCityPinIcon } from '@/components/ui/home-icons';
import { Colors, FontFamily } from '@/constants/theme';

interface MoveCardProps {
  image?: ImageSourcePropType;
  city: string;
  title: string;
  price: string;
  route: string;
  address: string;
  onPress?: () => void;
}

export function MoveCard({
  image,
  city,
  title,
  price,
  route,
  address,
  onPress,
}: MoveCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.92} style={styles.card}>
      <ImageBackground
        source={image}
        style={styles.bg}
        imageStyle={styles.bgImage}
        resizeMode="cover">
        {/* Dark overlay */}
        <View style={StyleSheet.absoluteFillObject}>
          <View style={styles.overlay} />
        </View>

        {/* Location badge — top left */}
        <View style={styles.topRow}>
          <View style={styles.cityBadge}>
            <CardCityPinIcon size={18} />
            <Text style={styles.cityText}>{city}</Text>
          </View>
        </View>

        {/* Details panel — bottom */}
        <View style={styles.detailsPanel}>
          <View style={styles.nameAndPrice}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <Text style={styles.route}>{route}</Text>
          <View style={styles.addressRow}>
            <CardAddressPinIcon size={16} />
            <Text style={styles.address} numberOfLines={1}>
              {address}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,
    width: '100%',
  },
  bg: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#D0D0D0', // shown when no image
  },
  bgImage: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
  },
  topRow: {
    flexDirection: 'row',
  },
  cityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(13,13,13,0.3)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  cityText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.white,
  },
  detailsPanel: {
    backgroundColor: 'rgba(13,13,13,0.35)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 4,
  },
  nameAndPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
    flex: 1,
  },
  price: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
    textAlign: 'right',
  },
  route: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.white,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  address: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.white,
    flex: 1,
  },
});
