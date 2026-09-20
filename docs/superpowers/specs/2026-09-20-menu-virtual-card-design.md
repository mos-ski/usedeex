# Menu Virtual Card Module

## Goal

Add a single virtual-card preview module to the Menu screen, matching the supplied reference while staying within DeeX's existing design system.

## Design

- Add a `Virtual Card` section in Menu using the existing `SectionCard`, `SectionHeader`, and icon components.
- Render exactly one card preview: dark card surface, virtual status, masked card number, and a `View details` affordance.
- Tapping the module navigates to the existing `/virtual-cards` route.
- Do not include Cashback or Find ATMs blocks in the Menu module.
- Reuse the existing virtual-card screen and routing; no new card data model is needed.

## Verification

- TypeScript/Vite production build must pass.
- Confirm the Menu route renders the module and the module navigates to `/virtual-cards`.
