export interface LocationOption {
  id: string;
  name: string;
  address: string;
}

export type MoveTypeId = 'light' | 'regular' | 'premium';

export interface MoveTypeOption {
  id: MoveTypeId;
  title: string;
  description: string;
}

export interface InstantBookingData {
  from: LocationOption;
  to: LocationOption;
  moveType: MoveTypeOption;
}

export interface ScheduledBookingData {
  from: LocationOption;
  to: LocationOption;
  moveType: MoveTypeOption;
}

export interface TimeSlot {
  id: string;
  label: string;
  range: string;
}
