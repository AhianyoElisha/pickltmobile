import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

function CloseIcon({ size = 20, color = Colors.textPrimary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5 5L15 15M15 5L5 15"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DeleteAccountConfirmModal({
  visible,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { colors } = useAppTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={s.backdrop} onPress={onCancel}>
        <Pressable style={[s.card, { backgroundColor: colors.surfaceElevated }]} onPress={() => {}}>
          <TouchableOpacity style={s.closeBtn} activeOpacity={0.7} onPress={onCancel}>
            <CloseIcon color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={s.textBlock}>
            <Text style={[s.title, { color: colors.textPrimary }]}>
              Are you sure you want{'\n'}to delete your account?
            </Text>
            <Text style={[s.subtitle, { color: colors.textPrimary }]}>
              This action is permanent and cannot be undone. All your data, moves, and preferences
              will be lost.
            </Text>
          </View>

          <View style={s.buttons}>
            <TouchableOpacity style={s.cancelBtn} activeOpacity={0.9} onPress={onCancel}>
              <Text style={s.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.deleteBtn, { borderColor: colors.danger }]}
              activeOpacity={0.9}
              onPress={onConfirm}>
              <Text style={[s.deleteText, { color: colors.danger }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 13, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: 335,
    borderRadius: 24,
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 16,
    gap: 24,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 32,
    left: 16,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 52,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
  },
  deleteBtn: {
    flex: 1,
    height: 52,
    borderRadius: 9999,
    borderWidth: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
  },
});
