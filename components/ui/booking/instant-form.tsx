import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, FontFamily } from '@/constants/theme';
import { SwapIcon, TruckFieldIcon } from '@/components/ui/home-icons';
import { LocationField } from './location-field';
import { MoveTypeField } from './move-type-field';
import { InstantBookingData, LocationOption, MoveTypeOption } from './types';

interface InstantBookingFormProps {
  onSearch: (data: InstantBookingData) => void;
}

export function InstantBookingForm({ onSearch }: InstantBookingFormProps) {
  const [from, setFrom] = useState<LocationOption | null>(null);
  const [to, setTo] = useState<LocationOption | null>(null);
  const [moveType, setMoveType] = useState<MoveTypeOption | null>(null);

  function handleSwap() {
    const prev = from;
    setFrom(to);
    setTo(prev);
  }

  function handleSearch() {
    if (!from || !to || !moveType) return;
    onSearch({ from, to, moveType });
  }

  const canSearch = Boolean(from && to && moveType);

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
        <TouchableOpacity style={styles.swapBtn} onPress={handleSwap} activeOpacity={1}>
          <SwapIcon size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.moveTypeWrap}>
        <MoveTypeField value={moveType} onChange={setMoveType} />
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
  moveTypeWrap: {
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
