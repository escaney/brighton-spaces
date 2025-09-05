/** @format */

import { AMENITY_QUERIES } from '../config/osm-queries';
import { BRIGHTON_BOUNDS } from '../constants/map';
import { formatOSMQuery } from './osm';

export function createOverpassQuery(
    amenityTypes: string[],
    bounds = BRIGHTON_BOUNDS,
): string {
    const { south, west, north, east } = bounds;
    const boundaries = `${south},${west},${north},${east}`;
    const queryParts: string[] = [];

    amenityTypes.forEach((amenityType) => {
        const amenityQuery = AMENITY_QUERIES[amenityType];

        if (amenityQuery) {
            queryParts.push(`node[${amenityQuery.osmQuery}](${boundaries});`);
            queryParts.push(`way[${amenityQuery.osmQuery}](${boundaries});`);
        }
    });

    if (amenityTypes.includes('drinking-water')) {
        queryParts.push(`node[man_made=water_tap](${boundaries});`);
        queryParts.push(`node[drinking_water=yes](${boundaries});`);
        queryParts.push(`way[man_made=water_tap](${boundaries});`);
    }

    return formatOSMQuery(queryParts);
}
