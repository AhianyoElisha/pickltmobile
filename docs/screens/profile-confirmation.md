# Screen Spec: Profile Confirmation

## What is this page about?
A one-time screen shown immediately after a user successfully signs up (via email or Google) and completes phone OTP verification. It allows the user to review and confirm their personal details before being routed to the Home Dashboard. This step exists because Google auth may provide a display name that is not the user's real name, and real names are strongly recommended for the moving service.

## User Flows
* User completes sign-up and phone OTP verification.
* User is routed to this screen to review their name, email, and phone number.
* User edits any fields as needed (name especially).
* User taps "Confirm" or "Save" to finalize profile and navigate to Home Dashboard.

## Data Displayed
* Full Name (editable).
* Email address (pre-filled, may be read-only).
* Phone number (pre-filled from OTP verification, may be read-only).

## Components Needed
* Text Input fields (pre-filled).
* Primary Action Button ("Confirm" / "Continue").

## States and Edge Cases
* **States:** Empty name field (validation), save/loading state.
* **Edge Case:** User navigating back should not bypass this screen on first sign-up.

Implement this design from Figma.
@https://www.figma.com/design/yG9jobqptDSJTE7NYw1Joh/PickLT?node-id=2034-2262&m=dev
