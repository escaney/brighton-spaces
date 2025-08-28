import { useQuery } from '@tanstack/react-query'
import { fetchOSMAmenities } from '../services/osm'

export const OSM_AMENITIES_QUERY_KEY = ['osm-amenities'] as const

// Generic hook for any combination of amenity types
export function useOSMAmenities(amenityTypes: string[]) {
  return useQuery({
    queryKey: [...OSM_AMENITIES_QUERY_KEY, ...amenityTypes.sort()], // Sort for consistent caching
    queryFn: () => fetchOSMAmenities(amenityTypes),
    staleTime: 24 * 60 * 60 * 1000, // 24hrs
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
