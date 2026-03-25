import { Image } from 'expo-image';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  BoxAddIcon,
  CallIcon,
  CheckCircleIcon,
  MessageIcon,
  StarIcon,
  StarOutlineIcon,
  UsersIcon,
  VehicleIcon,
  VerifiedBadgeIcon,
} from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

// ── Figma asset URLs ──────────────────────────────────────────────────────────
const AVATAR_IMG = 'https://www.figma.com/api/mcp/asset/21bf82e1-57aa-458c-b598-69adcdb642f7';
const TRUCK_IMG  = 'https://www.figma.com/api/mcp/asset/f8c88763-b873-45e9-b2b9-c5dcbe5efd57';

// ── Move status types ─────────────────────────────────────────────────────────
export type MoveStatus =
  | 'en_route'                     // mover approaching (default)
  | 'mover_arrived'                // mover at pickup — green banner + estimated price
  | 'loading'                      // items being loaded — blue banner + progress bar
  | 'in_transit'                   // driving to destination — blue banner, no buttons
  | 'arrived_destination'          // mover at dropoff — green banner + estimated price
  | 'unloading'                    // items being unloaded — yellow banner + final price
  | 'awaiting_payment'             // move done, payment needed — payment card below
  | 'awaiting_mover_confirmation'  // client paid, mover to confirm
  | 'move_completed';              // move confirmed — review card below

interface ServiceCardProps {
  status?: MoveStatus;
  bottom: number;
  onCall?: () => void;
  onMessage?: () => void;
  onPaymentConfirmed?: () => void;
  onSubmitReview?: (rating: number, comment: string) => void;
  onSkipReview?: () => void;
}

// ── Status banner config ──────────────────────────────────────────────────────
type BannerConfig = {
  bg: string;
  icon: 'check' | 'box' | 'vehicle';
  title: string;
  subtitle: string;
};

const BANNER_CONFIG: Partial<Record<MoveStatus, BannerConfig>> = {
  mover_arrived: {
    bg: '#EDFCF2',
    icon: 'check',
    title: 'Your mover has arrived!',
    subtitle: 'Meet them at the pick up location',
  },
  loading: {
    bg: '#EEF4FF',
    icon: 'box',
    title: 'Loading your items',
    subtitle: 'Your items are being loaded onto the vehicle',
  },
  in_transit: {
    bg: '#EEF4FF',
    icon: 'vehicle',
    title: 'On the way to destination',
    subtitle: 'Your items are being transported',
  },
  arrived_destination: {
    bg: '#EDFCF2',
    icon: 'check',
    title: 'Arrived at destination',
    subtitle: 'Your mover has reached the drop off location',
  },
  unloading: {
    bg: '#FEFBE8',
    icon: 'box',
    title: 'Unloading your items',
    subtitle: 'Your items are being unloaded at the destination',
  },
  awaiting_payment: {
    bg: '#EDFCF2',
    icon: 'check',
    title: 'Move completed - Payment required',
    subtitle: 'Please pay the mover and confirm below',
  },
  awaiting_mover_confirmation: {
    bg: '#EDFCF2',
    icon: 'check',
    title: 'Move completed - Payment required',
    subtitle: 'Please pay the mover and confirm below',
  },
};

// ── Header right content ──────────────────────────────────────────────────────
function HeaderRight({ status }: { status: MoveStatus }) {
  if (status === 'en_route') {
    return (
      <View style={styles.headerRightBlock}>
        <Text style={styles.etaDist}>5 min</Text>
        <Text style={styles.etaTime}>0.1 km away</Text>
      </View>
    );
  }
  if (status === 'loading') {
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack} />
        <View style={styles.progressFill} />
      </View>
    );
  }
  if (status === 'in_transit') {
    return (
      <View style={styles.headerRightBlock}>
        <Text style={[styles.etaDist, { color: Colors.primary }]}>In transit</Text>
        <Text style={styles.etaTime}>To destination</Text>
      </View>
    );
  }
  const isFinal =
    status === 'unloading' ||
    status === 'awaiting_payment' ||
    status === 'awaiting_mover_confirmation' ||
    status === 'move_completed';
  return (
    <View style={styles.headerRightBlock}>
      <Text style={styles.priceText}>$55</Text>
      <Text style={styles.etaTime}>{isFinal ? 'Final price' : 'Estimated price'}</Text>
    </View>
  );
}

// ── Banner icon ───────────────────────────────────────────────────────────────
function BannerIcon({ type }: { type: BannerConfig['icon'] }) {
  if (type === 'check')   return <CheckCircleIcon size={25} />;
  if (type === 'box')     return <BoxAddIcon size={24} color="#697586" />;
  return <VehicleIcon size={20} color="#697586" />;
}

// ── Interactive 5-star rating row ─────────────────────────────────────────────
function StarRating({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (r: number) => void;
}) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((n) => (
        <TouchableOpacity key={n} activeOpacity={0.7} onPress={() => onChange(n)}>
          {n <= rating ? (
            <StarOutlineIcon size={22} color="#FBCB2E" fillColor="#FBCB2E" />
          ) : (
            <StarOutlineIcon size={22} color="#697586" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── Main ServiceCard component ────────────────────────────────────────────────
export default function ServiceCard({
  status = 'en_route',
  bottom,
  onCall,
  onMessage,
  onPaymentConfirmed,
  onSubmitReview,
  onSkipReview,
}: ServiceCardProps) {
  const [rating, setRating]   = useState(0);
  const [comment, setComment] = useState('');

  const banner       = BANNER_CONFIG[status];
  const showTruck    = ['mover_arrived', 'loading', 'arrived_destination', 'unloading'].includes(status);
  const showButtons  = status !== 'in_transit';
  const isEnRoute    = status === 'en_route';
  // move_completed: no banner, compact card + review card below
  const isCompleted  = status === 'move_completed';

  // Primary card height
  let primaryCardHeight = 200; // en_route
  if (isCompleted)                         primaryCardHeight = 192;
  else if (status === 'in_transit')        primaryCardHeight = 192;
  else if (!isEnRoute)                     primaryCardHeight = 254;

  // Card gap differs per state
  const cardGap =
    status === 'awaiting_mover_confirmation' ? 16 :
    status === 'move_completed'               ? 11 :
    13;

  return (
    <View style={[styles.wrapper, { bottom, gap: cardGap }]}>

      {/* ── Primary service info card ────────────────────────────────────────── */}
      <View style={[styles.serviceCard, { height: primaryCardHeight }]}>

        {/* Floating truck decoration above card */}
        {showTruck && (
          <View style={styles.truckDecoration} pointerEvents="none">
            <Image source={TRUCK_IMG} style={styles.truckImg} contentFit="contain" />
          </View>
        )}

        {/* ── Header row ──────────────────────────────────────────────────────── */}
        <View style={styles.scHeader}>
          <View style={styles.avatarWrap}>
            <Image source={AVATAR_IMG} style={styles.scAvatar} contentFit="cover" />
            {!isEnRoute && (
              <View style={styles.verifiedBadge}>
                <VerifiedBadgeIcon size={14} />
              </View>
            )}
          </View>

          <View style={styles.scNameBlock}>
            <Text style={styles.scName}>William Jane</Text>
            <View style={styles.scRatingRow}>
              <StarIcon size={15} />
              <Text style={styles.scRatingText}>4.7 Rating</Text>
              <Text style={styles.scMovesText}>9 moves</Text>
            </View>
          </View>

          <HeaderRight status={status} />
        </View>

        {/* Divider */}
        <View style={styles.scDivider} />

        {/* ── Status banner (hidden for en_route and move_completed) ─────────── */}
        {banner && (
          <View style={[styles.bannerRow, { backgroundColor: banner.bg }]}>
            <View style={styles.bannerIconWrap}>
              <BannerIcon type={banner.icon} />
            </View>
            <View style={styles.bannerTextBlock}>
              <Text style={styles.bannerTitle}>{banner.title}</Text>
              <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
            </View>
          </View>
        )}

        {/* ── Vehicle section ──────────────────────────────────────────────────── */}
        {isEnRoute ? (
          // en_route: Figma exact absolute layout
          <>
            <View style={styles.scVehicleBoxAbs}>
              <VehicleIcon size={20} color={Colors.textSecondary} />
            </View>
            <Text style={styles.scVehicleNameAbs}>Mercedes Benz Sprinter</Text>
            <Text style={styles.scVehiclePlateAbs}>GW-12903-22</Text>
            <View style={styles.scMoversGroupAbs}>
              <UsersIcon size={15} color={Colors.textSecondary} />
              <Text style={styles.scMoversText}>2 movers</Text>
            </View>
          </>
        ) : (
          // All other states (including move_completed): flex vehicle row
          <View style={styles.vehicleSection}>
            <View style={styles.vehicleIconBox}>
              <VehicleIcon size={20} color={Colors.textSecondary} />
            </View>
            <View style={styles.vehicleTextBlock}>
              <Text style={styles.vehicleName}>Mercedes Benz Sprinter</Text>
              <Text style={styles.vehiclePlate}>GW-12903-22</Text>
            </View>
            <View style={styles.moversRow}>
              <UsersIcon size={15} color={Colors.textSecondary} />
              <Text style={styles.scMoversText}>2 movers</Text>
            </View>
          </View>
        )}

        {/* ── Buttons ─────────────────────────────────────────────────────────── */}
        {isEnRoute ? (
          <>
            <TouchableOpacity style={styles.scCallBtnAbs} activeOpacity={0.8} onPress={onCall}>
              <CallIcon size={24} color="#0D121C" />
              <Text style={styles.scBtnLabel}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scMsgBtnAbs} activeOpacity={0.8} onPress={onMessage}>
              <MessageIcon size={24} color="#0D121C" />
              <Text style={styles.scBtnLabel}>Message</Text>
            </TouchableOpacity>
          </>
        ) : showButtons ? (
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={onCall}>
              <CallIcon size={24} color="#0D121C" />
              <Text style={styles.scBtnLabel}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={onMessage}>
              <MessageIcon size={24} color="#0D121C" />
              <Text style={styles.scBtnLabel}>Message</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {/* ── Payment card (awaiting_payment) ──────────────────────────────────── */}
      {status === 'awaiting_payment' && (
        <View style={styles.paymentCard}>
          <View style={styles.paymentAmountRow}>
            <Text style={styles.paymentAmount}>$55</Text>
            <Text style={styles.paymentAmountLabel}>Amount to pay</Text>
          </View>

          <View style={styles.paymentNotice}>
            <Text style={styles.paymentNoticeText}>
              {'Please pay the mover directly (cash or transfer), then tap "I Have Paid" below. The mover must also confirm receipt before the move is marked complete.'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.paymentBtn}
            activeOpacity={0.85}
            onPress={onPaymentConfirmed}
          >
            <Text style={styles.paymentBtnLabel}>I Have Paid</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Confirmation banner (awaiting_mover_confirmation) ──────────────────── */}
      {status === 'awaiting_mover_confirmation' && (
        <View style={styles.confirmationCard}>
          <View style={styles.confirmIconWrap}>
            <CheckCircleIcon size={20} />
          </View>
          <Text style={styles.confirmationText}>
            Payment confirmed! Waiting for mover to confirm receipt...
          </Text>
        </View>
      )}

      {/* ── Review card (move_completed) ───────────────────────────────────────── */}
      {status === 'move_completed' && (
        <View style={styles.reviewCard}>
          {/* Header: check badge + title + subtitle + stars */}
          <View style={styles.reviewHeader}>
            <CheckCircleIcon size={28} />
            <Text style={styles.reviewTitle}>Move Completed</Text>
            <Text style={styles.reviewSubtitle}>
              How was your experience with William Jane
            </Text>
            <StarRating rating={rating} onChange={setRating} />
          </View>

          <View style={styles.reviewDivider} />

          {/* Comment textarea + buttons */}
          <View style={styles.reviewBody}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment (optional)"
              placeholderTextColor="#697586"
              multiline
              value={comment}
              onChangeText={setComment}
              textAlignVertical="top"
            />

            <View style={styles.reviewButtonsRow}>
              <TouchableOpacity
                style={styles.skipBtn}
                activeOpacity={0.8}
                onPress={onSkipReview}
              >
                <Text style={styles.skipBtnLabel}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.85}
                onPress={() => onSubmitReview?.(rating, comment)}
              >
                <Text style={styles.submitBtnLabel}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 17,
    width: 343,
  },

  // ── Primary service card ──────────────────────────────────────────────────
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'visible',
  },

  truckDecoration: {
    position: 'absolute',
    right: 15,
    top: -41,
    width: 54,
    height: 42,
    transform: [{ rotate: '-11.03deg' }],
    zIndex: 10,
  },
  truckImg: { width: '100%', height: '100%' },

  // ── Header ────────────────────────────────────────────────────────────────
  scHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 16,
    height: 62,
  },
  avatarWrap: {
    width: 36,
    height: 36,
    marginTop: 2.5,
    flexShrink: 0,
  },
  scAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  verifiedBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
  },
  scNameBlock: { flex: 1, marginLeft: 4, gap: 4 },
  scName: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  scRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  scRatingText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },
  scMovesText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },
  headerRightBlock: { alignItems: 'flex-end', flexShrink: 0, marginLeft: 8 },
  etaDist: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: '#0D121C',
    textAlign: 'right',
  },
  etaTime: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    textAlign: 'right',
  },
  priceText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.primary,
    textAlign: 'right',
  },
  progressContainer: {
    width: 89,
    height: 20,
    justifyContent: 'center',
    marginLeft: 8,
    flexShrink: 0,
  },
  progressTrack: {
    position: 'absolute',
    left: 0,
    top: 7,
    width: 89,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
  },
  progressFill: {
    position: 'absolute',
    left: 17,
    top: 7,
    width: 50,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#3475F2',
  },

  scDivider: { height: 0.5, backgroundColor: '#CDD5DF' },

  // ── Status banner ─────────────────────────────────────────────────────────
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 10,
    height: 62,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CDD5DF',
  },
  bannerIconWrap: {
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  bannerTextBlock: { flex: 1, gap: 3 },
  bannerTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  bannerSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },

  // ── Vehicle — en_route (absolute) ─────────────────────────────────────────
  scVehicleBoxAbs: {
    position: 'absolute',
    left: 19,
    top: 77,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E3E8EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scVehicleNameAbs: {
    position: 'absolute',
    left: 67,
    top: 81,
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  scVehiclePlateAbs: {
    position: 'absolute',
    left: 67,
    top: 99,
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
  },
  scMoversGroupAbs: {
    position: 'absolute',
    right: 15,
    top: 88,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  scMoversText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    letterSpacing: 0.15,
  },

  // ── Vehicle — flex (all banner states + move_completed) ───────────────────
  vehicleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 8,
  },
  vehicleIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E3E8EF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  vehicleTextBlock: { flex: 1, gap: 3 },
  vehicleName: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: '#0D121C',
  },
  vehiclePlate: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
  },
  moversRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },

  // ── Buttons — en_route (absolute) ─────────────────────────────────────────
  scCallBtnAbs: {
    position: 'absolute',
    left: 12,
    top: 137,
    width: 153,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#697586',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  scMsgBtnAbs: {
    position: 'absolute',
    left: 180,
    top: 137,
    width: 153,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#697586',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },

  // ── Buttons — flex ────────────────────────────────────────────────────────
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 4,
    gap: 15,
  },
  actionBtn: {
    flex: 1,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#697586',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  scBtnLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: '#0D121C',
  },

  // ── Payment card ──────────────────────────────────────────────────────────
  paymentCard: {
    height: 261,
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  paymentAmountRow: { alignItems: 'center', paddingTop: 8, gap: 2 },
  paymentAmount: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    lineHeight: 30,
    color: Colors.primary,
    textAlign: 'center',
  },
  paymentAmountLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  paymentNotice: {
    backgroundColor: '#FEF7C3',
    borderRadius: 16,
    padding: 12,
    minHeight: 82,
    justifyContent: 'center',
  },
  paymentNoticeText: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 18.2,
    color: '#C01048',
    textAlign: 'center',
  },
  paymentBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentBtnLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
    textAlign: 'center',
  },

  // ── Confirmation card ─────────────────────────────────────────────────────
  confirmationCard: {
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  confirmIconWrap: { flexShrink: 0 },
  confirmationText: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16.8,
    color: '#0D121C',
  },

  // ── Review card ───────────────────────────────────────────────────────────
  reviewCard: {
    height: 313,
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },

  // Review card top section: check icon + title + subtitle + stars
  reviewHeader: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 12,
    gap: 4,
  },
  reviewTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: '#0D121C',
    textAlign: 'center',
    marginTop: 4,
  },
  reviewSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    lineHeight: 16,
    color: '#697586',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 6,
  },

  reviewDivider: {
    height: 0.5,
    backgroundColor: '#CDD5DF',
    marginTop: 12,
  },

  // Review card bottom section: comment + buttons
  reviewBody: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 16,
  },
  commentInput: {
    height: 82,
    borderWidth: 1,
    borderColor: '#697586',
    borderRadius: 16,
    padding: 12,
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: '#0D121C',
  },
  reviewButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  skipBtn: {
    flex: 1,
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#697586',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtnLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: '#0D121C',
  },
  submitBtn: {
    flex: 1,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#697586',
    borderWidth: 1,
    borderColor: '#697586',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    lineHeight: 22.4,
    color: Colors.white,
  },
});
