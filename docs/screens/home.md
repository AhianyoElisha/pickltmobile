# Screen Spec: Home Dashboard

## What is this page about?
[cite_start]The main landing area of the app featuring a form to request new moves and a dashboard displaying current/past move statuses[cite: 81]. 

## User Flows
* [cite_start]User views the top form and toggles between "Instant" and "Scheduled"[cite: 82].
* [cite_start]User inputs pickup, drop-off, and move type, then taps to initiate[cite: 82].
* [cite_start]User scrolls down to view a categorized list/tabs of move statuses[cite: 82].
* [cite_start]User taps a specific Move Card to navigate to the Move Details screen[cite: 82].
* [cite_start]User uses the Bottom Navigation Bar to switch major app views[cite: 82].

## Data Displayed
* [cite_start]Toggle state (Instant/Scheduled)[cite: 83].
* [cite_start]Location data (Pickup/Drop-off)[cite: 83].
* [cite_start]Move type categories (Light, Regular, Premium)[cite: 83].
* [cite_start]Move Cards (minimal details: Date, Locations, Status tag)[cite: 83].
* [cite_start]Status category tabs (e.g., Pending, In Transit, Completed)[cite: 83].

## Components Needed
* [cite_start]Segmented Control / Toggle Switch[cite: 84].
* [cite_start]Location Input fields (with icon)[cite: 84].
* [cite_start]Dropdown or Selectable chips for Move Type[cite: 84].
* [cite_start]Primary Action Button ("Request Move")[cite: 84].
* [cite_start]Tabs Component (for move statuses)[cite: 84].
* [cite_start]Move Summary Card[cite: 84].
* [cite_start]Bottom Navigation Bar[cite: 84].

## States and Edge Cases
* [cite_start]**States:** Form validation (locations empty), Empty state for Move Cards (if user has no history)[cite: 85].