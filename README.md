# Brighton Spaces

A React application for finding free water fountains around Brighton & Hove.

## Features

- Interactive map showing water fountain locations
- Real-time data from Supabase database
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Map**: React Leaflet, OpenStreetMap
- **Backend**: Supabase (PostgreSQL)
- **State Management**: TanStack Query (React Query)
- **Deployment**: Railway (Docker)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run database seeding
npm run seed
```

## Production

The app is automatically deployed to Railway on pushes to the `main` branch.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Push to GitHub (CI will run)
4. Create a pull request
5. Merge to `main` (triggers deployment)

## License

MIT
