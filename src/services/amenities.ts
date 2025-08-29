/** @format */

import { OSMElement, OSMAmenity } from '../types/osm-data';
import { BRIGHTON_BOUNDS } from '../constants/map';
import { AMENITY_QUERIES } from '../config/osm-queries';
import { queryOverpassAPI } from './osmClient';
import { createOverpassQuery } from '../helpers/osmQueries';

function convertOSMElementToAmenity(element: OSMElement): OSMAmenity | null {
    if (!element.lat || !element.lon) {
        return null;
    }

    const tags = element.tags ?? {};
    const id = `osm-${element.type}-${element.id}`;
    let amenityType = 'unknown';
    let defaultName = 'Unknown Amenity';

    const foundAmenity = Object.values(AMENITY_QUERIES).find((query) =>
        query.tagMatchers?.some((matcher) =>
            Object.entries(matcher).every(
                ([tag, value]) => tags[tag] === value,
            ),
        ),
    );

    if (foundAmenity) {
        amenityType = foundAmenity.type;
        defaultName = foundAmenity.defaultName;
    }

    const name = (tags.name || tags['name:en']) ?? defaultName;
    const descriptionParts: string[] = [];

    if (foundAmenity?.descriptionTags) {
        Object.entries(foundAmenity.descriptionTags).forEach(
            ([tagKey, processor]) => {
                const tagValue = tags[tagKey];
                if (tagValue) {
                    if (typeof processor === 'function') {
                        descriptionParts.push(processor(tagValue));
                    } else if (
                        typeof processor === 'object' &&
                        processor[tagValue]
                    ) {
                        descriptionParts.push(processor[tagValue]);
                    }
                }
            },
        );
    }

    const description =
        descriptionParts.length > 0
            ? descriptionParts.join(' • ')
            : `${(tags.amenity || tags.man_made) ?? 'Amenity'}`;

    return {
        id,
        source: 'osm',
        lat: element.lat,
        lng: element.lon,
        name,
        description,
        amenityType,
        tags,
    };
}

export async function fetchOSMAmenities(
    amenityTypes: string[],
    bounds = BRIGHTON_BOUNDS,
): Promise<OSMAmenity[]> {
    try {
        const query = createOverpassQuery(amenityTypes, bounds);
        const data = await queryOverpassAPI(query);

        const amenities = data.elements
            .map(convertOSMElementToAmenity)
            .filter((amenity): amenity is OSMAmenity => amenity !== null);

        console.log(
            `Found ${amenities.length} amenities from OSM:`,
            amenityTypes
                .map(
                    (type) =>
                        `${type}: ${amenities.filter((a) => a.amenityType === type).length}`,
                )
                .join(', '),
        );

        return amenities;
    } catch (error) {
        console.error('Error fetching OSM amenities:', error);
        throw new Error(
            `Failed to fetch OSM data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}
