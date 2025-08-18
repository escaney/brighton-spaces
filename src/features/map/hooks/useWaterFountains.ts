import { useQuery } from '@tanstack/react-query'
import { getWaterFountains } from '../../../services'

export const WATER_FOUNTAINS_QUERY_KEY = ['water-fountains'] as const

export function useWaterFountains() {
  return useQuery({
    queryKey: WATER_FOUNTAINS_QUERY_KEY,
    queryFn: getWaterFountains,
  })
}