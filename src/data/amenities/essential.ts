/** @format */

import { Category } from '../../types/categories';

export const ESSENTIAL_AMENITIES: Category = {
    id: 'amenities',
    name: 'Essential Amenities',
    description: 'Find basic facilities around Brighton & Hove',
    icon: '🏢',
    color: '#3B82F6',
    amenities: [
        {
            id: 'drinking-water',
            name: 'Water Fountains',
            description: 'Free drinking water fountains and taps',
            osmQuery: 'amenity=drinking_water',
            icon: '🚰',
            color: '#3B82F6',
        },
        {
            id: 'toilets',
            name: 'Public Toilets',
            description: 'Public toilet facilities',
            osmQuery: 'amenity=toilets',
            icon: '🚻',
            color: '#06B6D4',
        },
    ],
};
