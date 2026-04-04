import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { CalendarIcon } from '@/components/ui/pickup-icons';
import { Colors, FontFamily } from '@/constants/theme';

// ── Helpers ───────────────────────────────────────────────────────────────────
const DAY_HEADERS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function todayString() {
  return new Date().toISOString().split('T')[0];
}

function formatDisplay(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

/** Returns the ISO string 'YYYY-MM-DD' for a given year, month (1-based), day */
function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Build a 6-row × 7-col grid of day numbers for a given year+month.
 * Each cell is { iso, day, currentMonth, past }
 */
function buildCalendarGrid(year: number, month: number) {
  const today = todayString();
  // day-of-week for 1st (0=Sun … 6=Sat) → convert to Mon-first index
  const firstDow = new Date(year, month - 1, 1).getDay();
  // Mon-first: Sun=6, Mon=0, Tue=1, ...
  const offset = (firstDow + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  type Cell = { iso: string; day: number; currentMonth: boolean; past: boolean };
  const cells: Cell[] = [];

  // Leading days from previous month
  for (let i = offset - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear  = month === 1 ? year - 1 : year;
    const iso = toISO(prevYear, prevMonth, d);
    cells.push({ iso, day: d, currentMonth: false, past: iso < today });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = toISO(year, month, d);
    cells.push({ iso, day: d, currentMonth: true, past: iso < today });
  }

  // Trailing days to fill 42 cells
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear  = month === 12 ? year + 1 : year;
  let d = 1;
  while (cells.length < 42) {
    const iso = toISO(nextYear, nextMonth, d);
    cells.push({ iso, day: d, currentMonth: false, past: iso < today });
    d++;
  }

  // Chunk into rows of 7
  const rows: Cell[][] = [];
  for (let i = 0; i < 42; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

// ── SVG icons ─────────────────────────────────────────────────────────────────
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <Svg
      width={16} height={16} viewBox="0 0 16 16" fill="none"
      style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
      <Path d="M4 6L8 10L12 6" stroke={Colors.textSecondary} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function NavArrow({ direction }: { direction: 'left' | 'right' }) {
  const d = direction === 'left' ? 'M13 15.5L7 10L13 4.5' : 'M7 15.5L13 10L7 4.5';
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d={d} stroke={Colors.textPrimary} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ── Inline calendar grid ──────────────────────────────────────────────────────
function CalendarGrid({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (iso: string) => void;
}) {
  const today = todayString();
  const initial = selected ? new Date(selected) : new Date();
  const [year,  setYear]  = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth() + 1); // 1-based

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 12) { setMonth(1); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const rows = buildCalendarGrid(year, month);

  return (
    <View style={cal.wrap}>
      {/* Month nav */}
      <View style={cal.monthRow}>
        <TouchableOpacity style={cal.navBtn} onPress={prevMonth} activeOpacity={0.7}>
          <NavArrow direction="left" />
        </TouchableOpacity>
        <Text style={cal.monthLabel}>{MONTH_NAMES[month - 1]} {year}</Text>
        <TouchableOpacity style={cal.navBtn} onPress={nextMonth} activeOpacity={0.7}>
          <NavArrow direction="right" />
        </TouchableOpacity>
      </View>

      {/* Day headers */}
      <View style={cal.row}>
        {DAY_HEADERS.map((h) => (
          <View key={h} style={cal.cell}>
            <Text style={cal.dayHeader}>{h}</Text>
          </View>
        ))}
      </View>

      {/* Date rows */}
      {rows.map((row, ri) => (
        <View key={ri} style={cal.row}>
          {row.map((cell) => {
            const isSelected = cell.iso === selected;
            const isToday    = cell.iso === today;
            const disabled   = cell.past;
            return (
              <TouchableOpacity
                key={cell.iso}
                style={[cal.cell, isSelected && cal.cellSelected]}
                onPress={() => !disabled && onSelect(cell.iso)}
                activeOpacity={disabled ? 1 : 0.7}
                disabled={disabled}>
                <Text style={[
                  cal.dayText,
                  isSelected && cal.dayTextSelected,
                  isToday && !isSelected && cal.dayTextToday,
                  !cell.currentMonth && cal.dayTextOther,
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
    borderColor: '#E3E8EF',
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
    color: Colors.textPrimary,
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
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  dayText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#171717',
    textAlign: 'center',
  },
  dayTextSelected:  { color: Colors.white },
  dayTextToday:     { color: Colors.textPrimary, fontFamily: FontFamily.semibold },
  dayTextOther:     { color: Colors.textSecondary },
  dayTextDisabled:  { color: Colors.textSecondary, opacity: 0.5 },
});

// ── Main component ────────────────────────────────────────────────────────────
interface SelectDateFieldProps {
  value: string | null;
  onChange: (date: string) => void;
  label?: string;
  hint?: string;
}

export function SelectDateField({
  value,
  onChange,
  label = 'Select Date',
  hint = 'When would you like to move?',
}: SelectDateFieldProps) {
  const [open, setOpen] = useState(false);

  function handleSelect(iso: string) {
    onChange(iso);
    setOpen(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.inputBox} onPress={() => setOpen(v => !v)} activeOpacity={0.8}>
        <CalendarIcon size={18} color={Colors.textSecondary} />
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {value ? formatDisplay(value) : 'dd/mm/yyyy'}
        </Text>
        <ChevronIcon open={open} />
      </TouchableOpacity>

      {open && <CalendarGrid selected={value} onSelect={handleSelect} />}

      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 24.8,
    color: Colors.textPrimary,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#CDD5DF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  inputText: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 25.6,
    color: Colors.textPrimary,
  },
  placeholder: { color: Colors.textSecondary },
  hint: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 18.6,
    color: Colors.textSecondary,
  },
});
