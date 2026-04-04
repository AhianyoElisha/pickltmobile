import { LocationOption, MoveTypeOption, TimeSlot } from './types';

export const LOCATION_SUGGESTIONS: LocationOption[] = [
  { id: '1', name: 'Berlin Mitte', address: 'Mitte, 10115 Berlin' },
  { id: '2', name: 'Berlin Prenzlauer Berg', address: 'Prenzlauer Berg, 10405 Berlin' },
  { id: '3', name: 'Frankfurt am Main', address: 'Frankfurt, 60306 Hessen' },
  { id: '4', name: 'Frankfurt Sachsenhausen', address: 'Sachsenhausen, 60594 Frankfurt' },
  { id: '5', name: 'Munich City Centre', address: 'Altstadt, 80331 Munich' },
  { id: '6', name: 'Hamburg Altona', address: 'Altona, 22765 Hamburg' },
  { id: '7', name: 'Hamburg HafenCity', address: 'HafenCity, 20457 Hamburg' },
  { id: '8', name: 'Cologne Old Town', address: 'Altstadt, 50667 Cologne' },
  { id: '9', name: 'Stuttgart Mitte', address: 'Mitte, 70173 Stuttgart' },
  { id: '10', name: 'Düsseldorf Altstadt', address: 'Altstadt, 40213 Düsseldorf' },
];

export const MOVE_TYPES: MoveTypeOption[] = [
  {
    id: 'light',
    title: 'Light Move',
    description: 'Perfect for small loads — boxes, single furniture pieces, or a studio apartment.',
  },
  {
    id: 'regular',
    title: 'Regular Move',
    description: 'Ideal for 1–2 bedroom apartments with standard furniture and appliances.',
  },
  {
    id: 'premium',
    title: 'Premium Move',
    description: 'Full-service move for large homes — packing, loading, transport, and unloading.',
  },
];

export function getUpcomingDates(count = 14): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'morning', label: 'Morning', range: '7:00 AM – 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', range: '12:00 PM – 5:00 PM' },
  { id: 'evening', label: 'Evening', range: '5:00 PM – 9:00 PM' },
];

export const BUILDING_TYPES = ['Apartment', 'House', 'Office', 'Storage', 'Other'] as const;
export const FLOOR_LEVELS = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th+ Floor'] as const;
export const PARKING_OPTIONS = ['Driveway', 'Street Parking', 'Parking Lot', 'No Parking Available'] as const;
