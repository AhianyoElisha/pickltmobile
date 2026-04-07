import type { ArrivalTime } from '@/components/ui/booking/time-input-field';

// ── Scheduled wizard form data ────────────────────────────────────────────────

export interface ScheduledFormData {
  // Entry params (from home)
  fromName: string;
  fromAddress: string;
  toName: string;
  toAddress: string;
  moveType: string;
  moveTypeId: string;

  // Step 1: Move Overview
  moveDate: string | null;
  buildingType: string | null;
  floorLevel: string | null;
  hasElevator: boolean | null;
  parkingOption: string | null;

  // Step 2: Pickup Info
  streetAddress: string;
  apartment: string;
  accessNotes: string;
  loadingZone: boolean | null;

  // Step 3: Drop Off Info
  dropStreetAddress: string;
  dropApartment: string;
  dropAccessNotes: string;
  dropFloorLevel: string | null;
  dropHasElevator: boolean | null;
  dropParkingOption: string | null;

  // Step 4: Inventory
  inventoryCategory: 'Living Room' | 'Bedroom' | 'Kitchen' | 'Office';
  inventoryCounts: Record<string, number>;

  // Step 5: Move Timing
  arrivalTime: ArrivalTime | null;
  preferEarliestArr: boolean;
  avoidEveningDel: boolean;

  // Step 6: Additional Services
  checkedServices: Record<string, boolean>;
  mainPhotos: string[];
  extraPhotos: string[];

  // Step 7: Payment Info
  finalAccessNotes: string;
  selectedPayment: 'card' | 'cash';
  isBusinessMove: boolean;
  selectedCardId: string | null;
}

// ── Instant wizard form data ──────────────────────────────────────────────────

export interface InstantFormData {
  fromName: string;
  fromAddress: string;
  toName: string;
  toAddress: string;
  moveType: string;
  moveTypeId: string;

  // Step 1: Pickup Info
  selectedCategory: 'Living Room' | 'Bedroom' | 'Kitchen' | 'Office';
  counts: Record<string, number>;

  // Step 2: Add Photos
  mainPhotos: string[];
  extraPhotos: string[];

  // Step 3: Select Mover
  selectedMoverId: string;
}
