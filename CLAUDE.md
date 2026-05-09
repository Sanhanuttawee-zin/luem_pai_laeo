# Luem-pai-laeo (Don't Forget Your Belongings)

## Project Overview
Mobile-first web app prototype for an intelligent alert system that helps users avoid forgetting essential belongings. Built with React + Vite + Tailwind CSS + shadcn/ui. Designed for GitHub Pages hosting.

## Tech Stack
- React 18 + TypeScript
- Vite 6 (build tool)
- Tailwind CSS 4 (via @tailwindcss/vite)
- shadcn/ui (Radix primitives)
- Lucide React (icons)
- pnpm (package manager)
- Motion (animations)

## Design System
- Primary color: #E85D2A (orange)
- Background: #fdfaf3 (warm cream)
- Font: Inter (sans), Fraunces (serif headings, italic)
- Border radius: 1rem base, 1.5rem cards
- Mobile-first: target 360-428px width (Android/iOS)
- Warm editorial palette with pastel category tints

## Project Structure
```
src/
  main.tsx              # Entry point
  app/
    App.tsx             # Root component, tab navigation
    screens/            # Main screen views
      HomeScreen.tsx    # Dashboard with routines
      PreDepartureScreen.tsx  # UC1: Item checklist
      TripDetailScreen.tsx    # UC2: Trip timeline & alerts
      FindItemScreen.tsx      # UC4: Lost item finder
      RoutinesScreen.tsx      # UC3: Context-based packing
    components/         # Shared components
      BottomNav.tsx     # Tab bar navigation
      ItemCard.tsx      # Item display card
      LeavingAlert.tsx  # UC2: Departure alert modal
      StatusBar.tsx     # Phone status bar mock
      StepCard.tsx      # Trip timeline step
      ui/               # shadcn/ui primitives
  styles/
    index.css           # CSS entry (imports others)
    fonts.css           # Google Fonts (Inter, Fraunces)
    tailwind.css        # Tailwind config
    theme.css           # CSS custom properties / design tokens
```

## Use Cases (from SRS)
- UC1: Pre-Departure Item Check (checklist before leaving)
- UC2: Leaving-Area Missing Item Alert (geofence departure alert)
- UC3: Context-Based Packing Suggestion (routines/profiles)
- UC4: Find a Recently Misplaced Item (last-known location)

## Key Conventions
- Thai language support (bilingual UI)
- Mobile viewport: responsive for 360-428px
- All screens share BottomNav (4 tabs: Home, Check, Trips, Find)
- State management: React useState (no external store)
- No backend — all data is mock/local state
- Hosted on GitHub Pages (static SPA)

## Development Commands
```bash
pnpm install        # Install dependencies
pnpm run dev        # Start dev server
pnpm run build      # Production build
```

## Quality Standard
- Impeccable UI quality — pixel-perfect, user-friendly layouts
- Always verify layout with screen capture after changes
- Feedback loop: change -> capture -> verify -> iterate
