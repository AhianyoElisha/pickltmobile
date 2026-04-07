import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowLeftIcon } from '@/components/ui/pickup-icons';
import { WizardStepBar, StepDef } from '@/components/ui/booking/wizard-step-bar';
import { Colors, FontFamily } from '@/constants/theme';

// ── Footer config ─────────────────────────────────────────────────────────────

export interface WizardFooterConfig {
  mode: 'single' | 'double';
  nextLabel: string;
  backLabel?: string;
  onNext: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface WizardShellProps {
  title: string;
  steps: StepDef[];
  activeStep: number;
  footer: WizardFooterConfig;
  onHeaderBack: () => void;
  children: React.ReactNode;
  /** When true, footer buttons render inside the ScrollView instead of fixed at bottom */
  footerInScroll?: boolean;
  /** Hide the step bar (e.g. for move-review step) */
  hideStepBar?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function WizardShell({
  title,
  steps,
  activeStep,
  footer,
  onHeaderBack,
  children,
  footerInScroll = false,
  hideStepBar = false,
}: WizardShellProps) {
  const insets = useSafeAreaInsets();

  const footerButtons = (
    <View style={footer.mode === 'double' ? s.footerRow : s.footerSingle}>
      {footer.mode === 'double' && footer.onBack && (
        <TouchableOpacity style={s.goBackBtn} activeOpacity={0.85} onPress={footer.onBack}>
          <Text style={s.goBackText}>{footer.backLabel ?? 'Go Back'}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[s.nextBtn, footer.nextDisabled && s.nextBtnDisabled]}
        activeOpacity={0.85}
        onPress={footer.onNext}
        disabled={footer.nextDisabled}>
        <Text style={s.nextText}>{footer.nextLabel}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={s.root}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={[s.header, { paddingTop: insets.top + 4 }]}>
        <TouchableOpacity style={s.backBtn} onPress={onHeaderBack} activeOpacity={0.8}>
          <ArrowLeftIcon size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{title}</Text>
      </View>

      {/* ── Step bar ───────────────────────────────────────────────────── */}
      {!hideStepBar && <WizardStepBar activeStep={activeStep} steps={steps} />}

      {/* ── Scrollable content ─────────────────────────────────────────── */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {children}

          {footerInScroll && (
            <View style={s.footerInScroll}>{footerButtons}</View>
          )}

          <View style={{ height: 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Fixed footer ─────────────────────────────────────────────── */}
      {!footerInScroll && (
        <View style={[s.fixedFooter, { paddingBottom: insets.bottom + 8 }]}>
          {footerButtons}
        </View>
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: Colors.background,
  },
  backBtn: {
    width: 48, height: 48, borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 25.2,
    color: Colors.textPrimary,
    flex: 1,
  },

  scroll:        { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 16 },

  // Fixed footer (outside scroll)
  fixedFooter: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 8,
  },

  // Footer inside scroll
  footerInScroll: {
    paddingTop: 8,
  },

  // Button layouts
  footerRow:    { flexDirection: 'row', gap: 16 },
  footerSingle: { flexDirection: 'row' },

  goBackBtn: {
    flex: 1, height: 56,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.textSecondary,
    borderRadius: 40,
    alignItems: 'center', justifyContent: 'center',
  },
  goBackText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.textPrimary,
  },
  nextBtn: {
    flex: 1, height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    alignItems: 'center', justifyContent: 'center',
  },
  nextBtnDisabled: {
    opacity: 0.5,
  },
  nextText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
  },
});
