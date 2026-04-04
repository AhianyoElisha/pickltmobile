import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ArrowLeftIcon,
  AttachmentIcon,
  CallIcon,
  SendIcon,
  SmileIcon,
} from '@/components/ui/pickup-icons';
import { FontFamily } from '@/constants/theme';

// ── Demo messages ─────────────────────────────────────────────────────────────
type Message = {
  id: string;
  type: 'sent' | 'received';
  text: string;
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'received',
    text: "Hello! I've picked up your items and I'm on my way.",
    time: '09:41 AM',
  },
  {
    id: '2',
    type: 'sent',
    text: 'Great! Thank you. How long until you arrive?',
    time: '09:42 AM',
  },
  {
    id: '3',
    type: 'received',
    text: "About 15 minutes. Traffic is light today so we're good!",
    time: '09:43 AM',
  },
  {
    id: '4',
    type: 'sent',
    text: "Perfect, I'll be ready at the door.",
    time: '09:44 AM',
  },
];

export default function MessageScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // ── Circular-reveal animation (mirrors call screen) ─────────────────────────
  const revealScale   = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  const bgStyle = useAnimatedStyle(() => ({
    transform: [{ scale: revealScale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  useEffect(() => {
    revealScale.value = withTiming(1, {
      duration: 520,
      easing: Easing.out(Easing.cubic),
    });
    contentOpacity.value = withDelay(300, withTiming(1, { duration: 220 }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    contentOpacity.value = withTiming(0, { duration: 150 });
    revealScale.value = withTiming(
      0,
      { duration: 380, easing: Easing.in(Easing.cubic) },
      () => {
        'worklet';
        router.back();
      },
    );
  };

  // ── Message send ─────────────────────────────────────────────────────────────
  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      { id: String(Date.now()), type: 'sent', text, time },
    ]);
    setInputText('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 80);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isSent = item.type === 'sent';
    return (
      <View style={[styles.bubbleRow, isSent ? styles.bubbleRowSent : styles.bubbleRowReceived]}>
        {!isSent && <View style={styles.avatarSm} />}
        <View style={styles.bubbleColumn}>
          <View style={[styles.bubble, isSent ? styles.bubbleSent : styles.bubbleReceived]}>
            <Text style={[styles.bubbleText, isSent ? styles.bubbleTextSent : styles.bubbleTextReceived]}>
              {item.text}
            </Text>
          </View>
          <Text style={[styles.timeText, isSent ? styles.timeTextSent : styles.timeTextReceived]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.overlay}>
      {/* ── Expanding white circle — circular reveal ──────────────────────── */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.whiteBg, bgStyle]} />

      {/* ── Screen content (fades in after bg covers screen) ──────────────── */}
      <Animated.View style={[StyleSheet.absoluteFill, contentStyle]}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          {/* ── Header ──────────────────────────────────────────────────────── */}
          <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.85}
              onPress={handleBack}
            >
              <ArrowLeftIcon color="#fff" size={20} />
            </TouchableOpacity>

            {/* Contact info */}
            <View style={styles.contactInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitial}>A</Text>
              </View>
              <View style={styles.contactTextCol}>
                <Text style={styles.contactName}>Angela Mellinger</Text>
                <View style={styles.statusRow}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.statusText}>Online</Text>
                </View>
              </View>
            </View>

            {/* Call shortcut */}
            <TouchableOpacity
              style={styles.callBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/shared/call' as any)}
            >
              <CallIcon color="#1D64EC" size={20} />
            </TouchableOpacity>
          </View>

          {/* ── Messages list ────────────────────────────────────────────────── */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.dateSeparator}>
                <View style={styles.dateLine} />
                <Text style={styles.dateText}>Today</Text>
                <View style={styles.dateLine} />
              </View>
            }
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />

          {/* ── Input bar ────────────────────────────────────────────────────── */}
          <View style={[styles.inputBar, { paddingBottom: insets.bottom + 12 }]}>
            <TouchableOpacity style={styles.inputIconBtn} activeOpacity={0.7}>
              <AttachmentIcon color="#9AA4B2" size={22} />
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
              <TouchableOpacity style={styles.emojiBtn} activeOpacity={0.7}>
                <SmileIcon color="#9AA4B2" size={20} />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="#9AA4B2"
                value={inputText}
                onChangeText={setInputText}
                multiline
                onSubmitEditing={sendMessage}
                returnKeyType="send"
              />
            </View>

            <TouchableOpacity
              style={[styles.sendBtn, inputText.trim() ? styles.sendBtnActive : styles.sendBtnInactive]}
              activeOpacity={0.85}
              onPress={sendMessage}
            >
              <SendIcon color="#fff" size={18} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  whiteBg: {
    backgroundColor: '#ffffff',
  },
  flex: {
    flex: 1,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1D64EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1D64EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: '#fff',
  },
  contactTextCol: {
    gap: 2,
  },
  contactName: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: '#0D121C',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#17B26A',
  },
  statusText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: '#17B26A',
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF4FD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Messages ────────────────────────────────────────────────────────────────
  messageList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E4E7EC',
  },
  dateText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: '#9AA4B2',
  },
  bubbleRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-end',
    gap: 8,
  },
  bubbleRowSent: {
    justifyContent: 'flex-end',
  },
  bubbleRowReceived: {
    justifyContent: 'flex-start',
  },
  avatarSm: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1D64EC',
  },
  bubbleColumn: {
    maxWidth: '72%',
    gap: 4,
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleSent: {
    backgroundColor: '#1D64EC',
    borderBottomRightRadius: 4,
  },
  bubbleReceived: {
    backgroundColor: '#F2F4F7',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  bubbleTextSent: {
    color: '#fff',
  },
  bubbleTextReceived: {
    color: '#0D121C',
  },
  timeText: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    lineHeight: 14,
  },
  timeTextSent: {
    color: '#9AA4B2',
    textAlign: 'right',
  },
  timeTextReceived: {
    color: '#9AA4B2',
    textAlign: 'left',
  },

  // ── Input bar ────────────────────────────────────────────────────────────────
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#F2F4F7',
    backgroundColor: '#fff',
  },
  inputIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F2F4F7',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minHeight: 44,
    gap: 8,
  },
  emojiBtn: {
    paddingBottom: 1,
  },
  textInput: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#0D121C',
    maxHeight: 100,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: '#1D64EC',
  },
  sendBtnInactive: {
    backgroundColor: '#9AA4B2',
  },
});
