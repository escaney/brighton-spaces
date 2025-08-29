/** @format */

import { AmenityQuery } from '../types/osm-data';

export const AMENITY_QUERIES: Record<string, AmenityQuery> = {
    'drinking-water': {
        type: 'drinking-water',
        osmQuery: 'amenity=drinking_water',
        defaultName: 'Water Fountain',
        icon: '🚰',
        tagMatchers: [
            { amenity: 'drinking_water' },
            { man_made: 'water_tap' },
            { drinking_water: 'yes' },
        ],
        descriptionTags: {
            operator: (value: string) => `Operated by ${value}`,
            fee: { yes: 'Fee required', no: 'Free' },
            wheelchair: { yes: 'Wheelchair accessible' },
            bottle: { yes: 'Suitable for bottles' },
            opening_hours: (value: string) => `Hours: ${value}`,
        },
    },
    toilets: {
        type: 'toilets',
        osmQuery: 'amenity=toilets',
        defaultName: 'Public Toilet',
        icon: '🚻',
        tagMatchers: [{ amenity: 'toilets' }],
        descriptionTags: {
            operator: (value: string) => `Operated by ${value}`,
            fee: { yes: 'Fee required', no: 'Free' },
            wheelchair: { yes: 'Wheelchair accessible' },
            opening_hours: (value: string) => `Hours: ${value}`,
        },
    },
};
