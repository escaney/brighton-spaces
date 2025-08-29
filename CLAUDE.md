# Claude Code Configuration

## Project Overview
Brighton Spaces - A React TypeScript application for exploring amenities and spaces in Brighton using interactive maps and OpenStreetMap data.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet, React Leaflet
- **Data Fetching**: TanStack Query
- **Backend**: Supabase
- **Testing**: Jest, React Testing Library
- **Build**: Create React App

## Development Commands
```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

## Key Scripts
- **Lint**: `npm run lint` - Check code quality
- **Type Check**: `npm run type-check` - Verify TypeScript types
- **Test**: `npm test` - Run test suite
- **Format**: `npm run format` - Format code with Prettier
- **Format Check**: `npm run format:check` - Check if code is formatted

## Project Structure
- `src/pages/` - Route-level page components  
- `src/components/` - Reusable UI components
- `src/services/` - API and data services
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `src/data/` - Static data organized by domain (amenities/, food/, etc.)
- `src/helpers/` - Helper functions for data manipulation
- `src/config/` - Application configuration (API URLs, etc.)
- `src/constants/` - Application constants (map bounds, etc.)

## Database
Uses Supabase for backend services. Configuration in `src/lib/supabase.ts`.

## Environment Variables
- `REACT_APP_OVERPASS_API_URL` - OpenStreetMap Overpass API endpoint (defaults to overpass-api.de)

## External APIs
- OpenStreetMap (OSM) for location data
- Integration handled in `src/services/osm.ts`

## Notes
- Always run `npm run lint`, `npm run type-check`, and `npm run format` before committing
- Tests use Jest with jsdom environment
- Docker setup available for containerized deployment
- Prettier is configured for automatic code formatting