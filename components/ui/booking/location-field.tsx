import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';
import { LOCATION_SUGGESTIONS } from './data';
import { fieldStyles } from './field-styles';
import { LocationOption } from './types';

interface LocationFieldProps {
  Icon: React.ComponentType<{ color?: string; size?: number }>;
  label: string;
  value: LocationOption | null;
  onChange: (location: LocationOption) => void;
}

export function LocationField({ Icon, label, value, onChange }: LocationFieldProps) {
  const { colors } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('');

  const slideAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const filtered = query.trim()
    ? LOCATION_SUGGESTIONS.filter(
        (l) =>
          l.name.toLowerCase().includes(query.toLowerCase()) ||
          l.address.toLowerCase().includes(query.toLowerCase()),
      )
    : LOCATION_SUGGESTIONS;

  function openSheet() {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 4,
        speed: 14,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function closeSheet(onDone?: () => void) {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      onDone?.();
    });
  }

  function handleSelect(location: LocationOption) {
    closeSheet(() => {
      onChange(location);
      setQuery('');
    });
  }

  // Reset animation values when modal is closed externally
  useEffect(() => {
    if (!modalVisible) {
      slideAnim.setValue(500);
      fadeAnim.setValue(0);
    }
  }, [modalVisible]);

  return (
    <>
      <TouchableOpacity style={fieldStyles.row} onPress={openSheet} activeOpacity={0.8}>
        <View style={fieldStyles.iconWrap}>
          <Icon color={Colors.white} size={24} />
        </View>
        <View style={fieldStyles.textWrap}>
          <Text style={fieldStyles.label}>{label}</Text>
          <Text style={value ? fieldStyles.value : fieldStyles.placeholder}>
            {value ? value.name : `Select ${label.toLowerCase()} location`}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={() => closeSheet()}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={sheet.container}>
            {/* Fading backdrop */}
            <Animated.View
              style={[StyleSheet.absoluteFillObject, sheet.backdrop, { opacity: fadeAnim }]}
            />
            {/* Tap-to-dismiss */}
            <TouchableOpacity
              style={StyleSheet.absoluteFillObject}
              activeOpacity={1}
              onPress={() => closeSheet()}
            />
            {/* Sliding sheet */}
            <Animated.View
              style={[sheet.sheet, { transform: [{ translateY: slideAnim }], backgroundColor: colors.surfaceElevated }]}>
              <View style={sheet.handle} />
              <Text style={[sheet.title, { color: colors.textPrimary }]}>{label} Location</Text>

              <TextInput
                style={[sheet.input, { borderColor: colors.divider, color: colors.textPrimary, backgroundColor: colors.surface }]}
                value={query}
                onChangeText={setQuery}
                placeholder="Search location..."
                placeholderTextColor={colors.placeholder}
                autoFocus
                returnKeyType="search"
              />

              <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={sheet.option}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}>
                    <Text style={[sheet.optionName, { color: colors.textPrimary }]}>{item.name}</Text>
                    <Text style={[sheet.optionAddress, { color: colors.textSecondary }]}>{item.address}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={[sheet.separator, { backgroundColor: colors.divider }]} />}
                ListEmptyComponent={
                  <Text style={[sheet.empty, { color: colors.textSecondary }]}>No locations found</Text>
                }
              />
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const sheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    maxHeight: '75%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    marginBottom: 12,
  },
  option: {
    paddingVertical: 12,
  },
  optionName: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 19.6,
  },
  optionAddress: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16.8,
    marginTop: 2,
  },
  separator: {
    height: 1,
  },
  empty: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
  },
});
