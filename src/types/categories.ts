/** @format */

// Category and amenity type definitions

export type Amenity = {
    id: string;
    name: string;
    description: string;
    osmQuery: string; // The OSM query for this amenity type
    icon: string; // Emoji or icon identifier
    color: string; // Hex color for map markers
};

export type Category = {
    id: string;
    name: string;
    description: string;
    icon: string; // Emoji for category
    color: string; // Category theme color
    amenities: Amenity[];
};

// Generic location data that all amenities share
export type LocationPoint = {
    id: string;
    name: string;
    lat: number;
    lng: number;
    description?: string;
    address?: string;
    postcode?: string;
    amenityType: string; // Which amenity this represents
    categoryId: string; // Which category this belongs to
    source: 'osm' | 'local';
    tags?: Record<string, string>; // Raw OSM tags for additional info
    created_at?: string;
    updated_at?: string;
};

// UI state for selected categories/amenities
export type CategorySelection = {
    categoryId: string;
    selectedAmenities: string[]; // Array of amenity IDs
};
