/** @format */

import { formatOSMQuery } from './osm';

const mockQuery = {
    bounds: '50.8,-0.2,50.9,-0.05',
    buildList: (...types: Array<{ type: 'node' | 'way'; filter: string }>) =>
        types.map(
            ({ type, filter }) => `${type}[${filter}](${mockQuery.bounds});`,
        ),
    node: (filter: string) => ({ type: 'node' as const, filter }),
    way: (filter: string) => ({ type: 'way' as const, filter }),
};

describe('formatOSMQuery', () => {
    it('should format a single query part correctly', () => {
        const queryParts = mockQuery.buildList(
            mockQuery.node('amenity=toilets'),
        );
        const result = formatOSMQuery(queryParts);

        const expected = `[out:json][timeout:25];
(
  node[amenity=toilets](${mockQuery.bounds});
);
out geom;`;

        expect(result).toBe(expected);
    });

    it('should format multiple query parts correctly', () => {
        const queryParts = mockQuery.buildList(
            mockQuery.node('amenity=drinking_water'),
            mockQuery.way('amenity=drinking_water'),
            mockQuery.node('man_made=water_tap'),
        );
        const result = formatOSMQuery(queryParts);

        const expected = `[out:json][timeout:25];
(
  node[amenity=drinking_water](${mockQuery.bounds});
  way[amenity=drinking_water](${mockQuery.bounds});
  node[man_made=water_tap](${mockQuery.bounds});
);
out geom;`;

        expect(result).toBe(expected);
    });

    it('should handle empty query parts array', () => {
        const queryParts = mockQuery.buildList();
        const result = formatOSMQuery(queryParts);

        const expected = `[out:json][timeout:25];
(
  
);
out geom;`;

        expect(result).toBe(expected);
    });

    it('should maintain proper formatting with complex queries', () => {
        const queryParts = mockQuery.buildList(
            mockQuery.node('amenity=cafe][cuisine=italian'),
            mockQuery.way('building=yes][amenity=restaurant'),
        );
        const result = formatOSMQuery(queryParts);

        expect(result).toContain('[out:json][timeout:25];');
        expect(result).toContain('(\n  ');
        expect(result).toContain('\n);');
        expect(result).toContain('out geom;');
    });

    it('should produce valid Overpass API query structure', () => {
        const queryParts = mockQuery.buildList(
            mockQuery.node('amenity=toilets'),
        );
        const result = formatOSMQuery(queryParts);

        const lines = result.split('\n');

        expect(lines[0]).toBe('[out:json][timeout:25];');
        expect(lines[1]).toBe('(');
        expect(lines[2]).toBe(`  node[amenity=toilets](${mockQuery.bounds});`);
        expect(lines[3]).toBe(');');
        expect(lines[4]).toBe('out geom;');
    });
});
