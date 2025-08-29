/** @format */

import { useQuery } from '@tanstack/react-query';
import { fetchOSMAmenities } from '../services/amenities';

export const OSM_AMENITIES_QUERY_KEY = ['osm-amenities'] as const;

export function useOSMAmenities(amenityTypes: string[]) {
    return useQuery({
        queryKey: [...OSM_AMENITIES_QUERY_KEY, ...amenityTypes.sort()],
        queryFn: () => fetchOSMAmenities(amenityTypes),
        staleTime: 24 * 60 * 60 * 1000, // 24hrs
        gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        retry: 2,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
