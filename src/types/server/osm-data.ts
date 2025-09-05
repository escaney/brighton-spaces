/** @format */

export type OSMElement = {
    type: 'node' | 'way' | 'relation';
    id: number;
    lat?: number;
    lon?: number;
    tags?: Record<string, string>;
    nodes?: number[];
    members?: Array<{
        type: string;
        ref: number;
        role: string;
    }>;
};

export type OSMResponse = {
    version: number;
    generator: string;
    osm3s: {
        timestamp_osm_base: string;
        copyright: string;
    };
    elements: OSMElement[];
};

export type OSMAmenity = {
    id: string;
    source: 'osm';
    lat: number;
    lng: number;
    name: string;
    description?: string;
    amenityType: string;
    tags: Record<string, string>;
};

export type AmenityQuery = {
    type: string;
    osmQuery: string;
    defaultName: string;
    icon?: string;
    tagMatchers?: Array<Record<string, string>>;
    descriptionTags?: Record<string, string | Record<string, string> | ((value: string) => string)>;
};
