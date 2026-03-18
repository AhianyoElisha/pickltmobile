# Screen Spec: Move Details

## What is this page about?
A full detail view for a specific move request, reached by tapping a Move Card on the Home Dashboard. Displays all information about the selected move.

## User Flows
* User taps a Move Card on the Home Dashboard.
* User is navigated to this screen with the selected move's data.
* User reviews all move details.
* User taps back to return to the Home Dashboard.

## Data Displayed
* Pickup address (full).
* Drop-off address (full).
* Move type (Light / Regular / Premium).
* Move category (Instant / Scheduled).
* Status (Pending / In Transit / Completed / Cancelled).
* Scheduled date and time (for scheduled moves).
* Any additional notes or instructions.

## Components Needed
* Detail row components (label + value pairs).
* Status badge / tag.
* Back navigation header.

## States and Edge Cases
* **States:** Loading state while fetching move details.
* **Edge Case:** Move status has changed since the card was viewed (stale data).

## Notes
Figma frames for this screen are TBD. Node-ids will be added once designs are finalized.
