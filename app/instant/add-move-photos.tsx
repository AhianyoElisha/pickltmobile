import { router, useLocalSearchParams, useNavigation, useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeftIcon,
  CameraIcon,
  GalleryAddIcon,
} from '@/components/ui/pickup-icons';
import { MapCard } from '@/components/ui/map-card';
import { Colors, FontFamily } from '@/constants/theme';

export default function AddMovePhotosScreen() {
  const params = useLocalSearchParams<{
    fromName: string; fromAddress: string;
    toName: string; toAddress: string;
    moveType: string; moveTypeId: string;
  }>();

  const navigation = useNavigation();
  const slideX = useSharedValue(0);
  const slideStyle = useAnimatedStyle(() => ({ transform: [{ translateX: slideX.value }] }));
  const goBack = () => router.back();
  const handleBack = () => {
    navigation.setOptions({ animation: 'none' });
    slideX.value = withTiming(Dimensions.get('window').width, {
      duration: 280,
      easing: Easing.in(Easing.cubic),
    }, () => {
      'worklet';
      runOnJS(goBack)();
    });
  };

  // ── Slide-in on return from forward screen ──────────────────────────────────
  const hasBeenFocused = useRef(false);
  useFocusEffect(useCallback(() => {
    if (!hasBeenFocused.current) { hasBeenFocused.current = true; return; }
    const width = Dimensions.get('window').width;
    runOnUI((w: number) => {
      'worklet';
      slideX.value = -w;
      slideX.value = withTiming(0, { duration: 220, easing: Easing.out(Easing.cubic) });
    })(width);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  function handleNext() {
    router.push({
      pathname: '/instant/select-mover',
      params: { ...params },
    });
  }

  return (
    <Animated.View style={[styles.safe, slideStyle]}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.8}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Move Photos</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MapCard hideLocationPanel />

        <Text style={styles.pageHeading}>Add Move Photos</Text>

        <View style={styles.infoCard}>
          <CameraIcon size={24} color={Colors.textSecondary} />
          <Text style={styles.infoText}>
            Photos help movers prepare the right equipment and give you an accurate quote. Add clear photos of your items.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Main Photo</Text>
        <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
          <GalleryAddIcon size={32} color={Colors.textSecondary} />
          <Text style={styles.uploadTitle}>Tap to add main photo</Text>
          <Text style={styles.uploadSubtitle}>PNG, JPG up to 3MB</Text>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>Additional Photos</Text>
        <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
          <GalleryAddIcon size={32} color={Colors.textSecondary} />
          <Text style={styles.uploadTitle}>Add more photos</Text>
          <Text style={styles.uploadSubtitle}>PNG, JPG up to 3MB</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} activeOpacity={0.85} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 48, height: 48, borderRadius: 9999, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.bold, fontSize: 18, lineHeight: 25.2, color: Colors.textPrimary, textAlign: 'center', flex: 1 },
  headerSpacer: { width: 48 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16, gap: 12 },
  pageHeading: { fontFamily: FontFamily.medium, fontSize: 20, lineHeight: 28, color: Colors.textPrimary, textAlign: 'center' },
  infoCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.textSecondary, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 },
  infoText: { flex: 1, fontFamily: FontFamily.regular, fontSize: 13, lineHeight: 18.2, color: Colors.textSecondary },
  sectionLabel: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4, color: Colors.textPrimary },
  uploadBox: { height: 150, borderRadius: 16, borderWidth: 1.5, borderColor: Colors.textSecondary, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.white },
  uploadTitle: { fontFamily: FontFamily.medium, fontSize: 14, lineHeight: 19.6, color: Colors.textSecondary },
  uploadSubtitle: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 16.8, color: Colors.textSecondary },
  footer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, backgroundColor: Colors.white },
  nextBtn: { height: 56, backgroundColor: Colors.primary, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  nextText: { fontFamily: FontFamily.semibold, fontSize: 16, lineHeight: 22.4, color: Colors.white },
});
