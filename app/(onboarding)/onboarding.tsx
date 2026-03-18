import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


const { width, height } = Dimensions.get('window');

// NOTE: Background images are placeholders — replace with actual photos from the Figma file.
const SLIDES = [
  {
    id: '1',
    bg: require('@/assets/images/onboarding-1.png'),
    title: 'Making the world a better place.',
    subtitle: 'Find the perfect move that fits your budget effortlessly.',
  },
  {
    id: '2',
    bg: require('@/assets/images/onboarding-2.png'),
    title: 'A stress-free move, every time.',
    subtitle: 'A seamless way to move properties with confidence.',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const next = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = () => {
    // markOnboardingComplete is called by get-started.tsx when the user
    // actually taps Sign Up or Sign In, not here.
    router.replace('/(onboarding)/get-started');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Full-screen slide images */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.bg} style={StyleSheet.absoluteFillObject} contentFit="cover" />
            <View style={styles.imageOverlay} />
          </View>
        )}
      />

      {/* Bottom panel — overlays the slides */}
      <View style={styles.bottomPanel}>
        {/* Text & buttons group */}
        <View style={styles.textAndButtons}>
          {/* Progress dots + text */}
          <View style={styles.sliderAndText}>
            {/* Dots */}
            <View style={styles.dotsRow}>
              {SLIDES.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === currentIndex ? styles.dotActive : styles.dotInactive]}
                />
              ))}
            </View>
            {/* Text */}
            <View style={styles.textBlock}>
              <Text style={styles.title}>{SLIDES[currentIndex].title}</Text>
              <Text style={styles.subtitle}>{SLIDES[currentIndex].subtitle}</Text>
            </View>
          </View>

          {/* Skip + Next buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.8}>
              <Text style={styles.buttonText}>
                {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}

              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Home indicator space */}
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  // Slides
  slide: {
    width,
    height,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  // Bottom panel
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(13,13,13,0.35)',
    paddingTop: 48,
    paddingHorizontal: 20,
    gap: 8,
  },
  textAndButtons: {
    gap: 24,
  },
  sliderAndText: {
    gap: 16,
  },

  // Progress dots
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    height: 7,
    borderRadius: 4,
  },
  dotActive: {
    width: 29,
    backgroundColor: '#1D64EC',
  },
  dotInactive: {
    width: 7,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  // Text block
  textBlock: {
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 36, // 24 * 1.5
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E3E8EF',
    lineHeight: 19.6, // 14 * 1.4
  },

  // Buttons
  buttonsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  skipButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#1D64EC',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#1D64EC',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22.4, // 16 * 1.4
    textAlign: 'center',
  },

  // Home indicator
  homeIndicator: {
    height: 24,
  },
});
