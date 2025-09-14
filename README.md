# Pokémon Mobile (React Native + Expo)

A React Native app (Expo + TypeScript) that lists Pokémon from the public PokeAPI with incremental “Load More”, client-side filtering (search and type), and smooth skeleton loading for a native mobile experience.

## Quick start

Prerequisites:

- Node.js 18+ (recommended: Node 20 LTS)
- npm 9+
- iOS: Xcode + iOS Simulator, or the Expo Go app on an iPhone
- Android: Android Studio + Android Emulator, or the Expo Go app on an Android device

Install dependencies:

```bash
npm install
```

Start the Expo dev server:

```bash
npm run start
```

Then choose where to run it:

- iOS Simulator: `npm run ios`
- Android Emulator: `npm run android`
- Web (experimental RN web target): `npm run web`

The Expo Dev Tools will show a QR code; you can scan it with the Expo Go app to run on a physical device.

## What you’ll see

- A header with a decorative SVG background.
- A grid-like list of Pokémon cards with a two-column layout (flex-wrap).
- Search by name and a modal-based Type filter.
- Skeleton placeholders while data loads and an animated image placeholder until images finish loading.
- “Load More” pagination that hides while any filter is active to avoid mixed states.

## Tech stack

- Expo 54 (React Native 0.81) + React 19 + TypeScript
- NativeWind + Tailwind CSS utilities for styling
- `react-native-safe-area-context` for safe areas
- `react-native-svg` + `react-native-svg-transformer` for inline SVG assets
- React Native Reanimated
- PokeAPI (`https://pokeapi.co/`) for data

## Scripts

- `npm run start` – start the Expo dev server
- `npm run ios` – launch iOS Simulator and run the app
- `npm run android` – launch Android Emulator and run the app
- `npm run web` – run the React Native web target (optional)

## Notes and assumptions

- Data source: Public PokeAPI (no API key). The app fetches the list endpoint and then each Pokémon’s details.
- Pagination: Uses the API’s `next` URL and `count` field; each page loads 20 items. The “Load More” button is hidden if there are no more items, or whenever any filter is active.
- Artificial delay: A ~500ms delay is intentionally added so skeletons remain visible and the loading experience feels stable.
- Styling: Tailwind utilities via NativeWind; global styles imported from `global.css`. SVGs are imported as React components using the transformer.
- Configuration: Babel is set up with Reanimated last and Worklets before it; `index.ts` imports `react-native-reanimated` at the top per requirements. Metro is configured for NativeWind and the SVG transformer.
- Environment: Node 18+. If you hit dependency issues, try reinstalling (`rm -rf node_modules && npm install`) or using Node 20 LTS.

## License

This project is for demonstration and learning purposes.
