import { router, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeftIcon,
  CameraIcon,
  GalleryAddIcon,
  GpsTargetIcon,
} from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

export default function AddMovePhotosScreen() {
  const params = useLocalSearchParams<{
    fromName: string; fromAddress: string;
    toName: string; toAddress: string;
    moveType: string; moveTypeId: string;
  }>();

  function handleNext() {
    router.push({
      pathname: '/instant/select-mover',
      params: { ...params },
    });
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Move Photos</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mapCard}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map Preview</Text>
            <TouchableOpacity style={styles.gpsBtn} activeOpacity={0.8}>
              <GpsTargetIcon size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

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
  mapCard: { borderRadius: 16, overflow: 'hidden', borderWidth: 0.5, borderColor: Colors.textSecondary },
  mapPlaceholder: { height: 200, backgroundColor: '#E8EDF2', alignItems: 'center', justifyContent: 'center' },
  mapPlaceholderText: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.textSecondary },
  gpsBtn: { position: 'absolute', right: 12, bottom: 12, width: 48, height: 48, borderRadius: 9999, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
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
