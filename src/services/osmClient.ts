/** @format */

import { OSMResponse } from '../types/osm-data';
import { OVERPASS_API_URL } from '../config/api';

export async function queryOverpassAPI(
    overpassQuery: string,
): Promise<OSMResponse> {
    const response = await fetch(OVERPASS_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(overpassQuery)}`,
    });

    if (!response.ok) {
        throw new Error(
            `OSM API request failed: ${response.status} ${response.statusText}`,
        );
    }

    return response.json();
}
