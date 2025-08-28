import { useQuery } from '@tanstack/react-query'
import { fetchOSMWaterFountains, fetchOSMWaterFountainsNearLocation } from '../services/osm'

export const OSM_WATER_FOUNTAINS_QUERY_KEY = ['osm-water-fountains'] as const

export function useOSMWaterFountains() {
  return useQuery({
    queryKey: OSM_WATER_FOUNTAINS_QUERY_KEY,
    queryFn: () => fetchOSMWaterFountains(),
    staleTime: 24 * 60 * 60 * 1000, // 24hrs
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
  })
}
