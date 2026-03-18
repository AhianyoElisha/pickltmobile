import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, FontFamily } from '@/constants/theme';
import { SwapIcon, TruckFieldIcon } from '@/components/ui/home-icons';
import { DateField } from './date-field';
import { LocationField } from './location-field';
import { MoveTypeField } from './move-type-field';
import { TimeField } from './time-field';
import { LocationOption, MoveTypeOption, ScheduledBookingData, TimeSlot } from './types';

interface ScheduledBookingFormProps {
  onSearch: (data: ScheduledBookingData) => void;
}

export function ScheduledBookingForm({ onSearch }: ScheduledBookingFormProps) {
  const [from, setFrom] = useState<LocationOption | null>(null);
  const [to, setTo] = useState<LocationOption | null>(null);
  const [moveType, setMoveType] = useState<MoveTypeOption | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null);

  function handleSwap() {
    const prev = from;
    setFrom(to);
    setTo(prev);
  }

  function handleSearch() {
    if (!from || !to || !moveType || !date || !timeSlot) return;
    onSearch({ from, to, moveType, date, timeSlot });
  }

  const canSearch = Boolean(from && to && moveType && date && timeSlot);

  return (
    <View>
      <View style={styles.fromToWrap}>
        <LocationField
          Icon={TruckFieldIcon}
          label="From"
          value={from}
          onChange={setFrom}
        />
        <LocationField
          Icon={TruckFieldIcon}
          label="To"
          value={to}
          onChange={setTo}
        />
        <TouchableOpacity style={styles.swapBtn} onPress={handleSwap} activeOpacity={0.8}>
          <SwapIcon size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldWrap}>
        <MoveTypeField value={moveType} onChange={setMoveType} />
      </View>

      <View style={styles.fieldWrap}>
        <DateField value={date} onChange={setDate} />
      </View>

      <View style={styles.fieldWrap}>
        <TimeField value={timeSlot} onChange={setTimeSlot} />
      </View>

      <TouchableOpacity
        style={[styles.searchBtn, !canSearch && styles.searchBtnDisabled]}
        onPress={handleSearch}
        activeOpacity={0.85}
        disabled={!canSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fromToWrap: {
    marginTop: 22,
    gap: 15,
    position: 'relative',
  },
  swapBtn: {
    position: 'absolute',
    right: 0,
    top: 42,
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldWrap: {
    marginTop: 15,
  },
  searchBtn: {
    marginTop: 28,
    height: 46,
    backgroundColor: Colors.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnDisabled: {
    opacity: 0.5,
  },
  searchText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 18.2,
    color: Colors.textPrimary,
  },
});
