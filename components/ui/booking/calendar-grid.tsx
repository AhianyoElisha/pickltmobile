import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { Colors, FontFamily } from '@/constants/theme';
import { useAppTheme } from '@/context/theme-context';

export const DAY_HEADERS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function todayString() {
  return new Date().toISOString().split('T')[0];
}

export function formatDisplay(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${MONTH_NAMES[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function buildCalendarGrid(year: number, month: number) {
  const today = todayString();
  const firstDow = new Date(year, month - 1, 1).getDay();
  const offset = (firstDow + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  type Cell = { iso: string; day: number; currentMonth: boolean; past: boolean };
  const cells: Cell[] = [];

  for (let i = offset - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const iso = toISO(prevYear, prevMonth, d);
    cells.push({ iso, day: d, currentMonth: false, past: iso < today });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = toISO(year, month, d);
    cells.push({ iso, day: d, currentMonth: true, past: iso < today });
  }

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  let d = 1;
  while (cells.length < 42) {
    const iso = toISO(nextYear, nextMonth, d);
    cells.push({ iso, day: d, currentMonth: false, past: iso < today });
    d++;
  }

  const rows: Cell[][] = [];
  for (let i = 0; i < 42; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

function NavArrow({ direction, color }: { direction: 'left' | 'right'; color: string }) {
  const d = direction === 'left' ? 'M13 15.5L7 10L13 4.5' : 'M7 15.5L13 10L7 4.5';
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d={d} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CalendarGrid({
  selected,
  onSelect,
  allowPastDates = false,
}: {
  selected: string | null;
  onSelect: (iso: string) => void;
  allowPastDates?: boolean;
}) {
  const today = todayString();
  const initial = selected ? new Date(selected) : new Date();
  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth() + 1);
  const { colors } = useAppTheme();

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (month === 12) { setMonth(1); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  const rows = buildCalendarGrid(year, month);

  return (
    <View style={[cal.wrap, { borderColor: colors.divider }]}>
      <View style={cal.monthRow}>
        <TouchableOpacity style={cal.navBtn} onPress={prevMonth} activeOpacity={0.7}>
          <NavArrow direction="left" color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[cal.monthLabel, { color: colors.textPrimary }]}>{MONTH_NAMES[month - 1]} {year}</Text>
        <TouchableOpacity style={cal.navBtn} onPress={nextMonth} activeOpacity={0.7}>
          <NavArrow direction="right" color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={cal.row}>
        {DAY_HEADERS.map((h) => (
          <View key={h} style={cal.cell}>
            <Text style={[cal.dayHeader, { color: colors.textPrimary }]}>{h}</Text>
          </View>
        ))}
      </View>

      {rows.map((row, ri) => (
        <View key={ri} style={cal.row}>
          {row.map((cell) => {
            const isSelected = cell.iso === selected;
            const isToday = cell.iso === today;
            const disabled = !allowPastDates && cell.past;
            return (
              <TouchableOpacity
                key={cell.iso}
                style={[cal.cell, isSelected && cal.cellSelected]}
                onPress={() => !disabled && onSelect(cell.iso)}
                activeOpacity={disabled ? 1 : 0.7}
                disabled={disabled}>
                <Text style={[
                  cal.dayText,
                  { color: colors.textPrimary },
                  isSelected && cal.dayTextSelected,
                  isToday && !isSelected && cal.dayTextToday,
                  !cell.currentMonth && { color: colors.textSecondary },
                  disabled && cal.dayTextDisabled,
                ]}>
                  {cell.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const cal = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 4,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navBtn: { padding: 8, borderRadius: 8 },
  monthLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 18,
    lineHeight: 27.9,
    textAlign: 'center',
  },
  row: { flexDirection: 'row' },
  cell: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellSelected: { backgroundColor: Colors.primary },
  dayHeader: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  dayText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  dayTextSelected: { color: Colors.white },
  dayTextToday: { fontFamily: FontFamily.semibold },
  dayTextDisabled: { opacity: 0.5 },
});
