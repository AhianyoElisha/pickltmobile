# Screen Spec: Bottom Navigation Bar

## What is this page about?
A persistent bottom navigation bar shared across all authenticated screens. It contains 4 tab buttons representing the core app sections. This is a shared component, not a standalone screen.

## User Flows
* User taps any tab icon to navigate to the corresponding section.
* Active tab is visually highlighted.
* Home tab is the default selected tab and the default landing page after authentication.

## Data Displayed
* 4 tab icons with labels.
* Active/inactive visual state per tab.

## Tabs
| Tab | Icon | Label | Default? |
|-----|------|-------|----------|
| Tab 1 | Home icon | Home | Yes (default) |
| Tab 2 | TBD | TBD | No |
| Tab 3 | TBD | TBD | No |
| Tab 4 | TBD | TBD | No |

## Components Needed
* Bottom Tab Navigator (Expo Router tabs).
* Tab icon components (active/inactive states).

## States and Edge Cases
* **States:** Active tab highlighted, inactive tabs dimmed.
* **Edge Case:** Bottom nav is only shown on authenticated screens — not on splash, onboarding, or auth flow screens.

## Notes
The bottom nav is implemented as a shared layout component in Expo Router's `(tabs)` group.
Figma frames for the bottom nav are embedded within the Home Dashboard and other authenticated screen designs.
