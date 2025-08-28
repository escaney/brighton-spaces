import { OSMResponse, OSMElement } from '../types/osm-data'

// Generic OSM amenity type
export type OSMAmenity = {
  id: string
  source: 'osm'
  lat: number
  lng: number
  name: string
  description?: string
  amenityType: string
  tags: Record<string, string>
}

// Amenity query definitions
export type AmenityQuery = {
  type: string
  osmQuery: string
  defaultName: string
  icon?: string
}

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter'

// Brighton bounding box coordinates
const BRIGHTON_BOUNDS = {
  south: 50.8,
  west: -0.2,
  north: 50.9,
  east: -0.05
}

// Amenity type definitions
export const AMENITY_QUERIES: Record<string, AmenityQuery> = {
  'drinking-water': {
    type: 'drinking-water',
    osmQuery: 'amenity=drinking_water',
    defaultName: 'Water Fountain',
    icon: '🚰'
  },
  'toilets': {
    type: 'toilets', 
    osmQuery: 'amenity=toilets',
    defaultName: 'Public Toilet',
    icon: '🚻'
  }
}

function createOverpassQuery(amenityTypes: string[], bounds = BRIGHTON_BOUNDS): string {
  const { south, west, north, east } = bounds
  
  // Build query parts for each amenity type
  const queryParts: string[] = []
  
  amenityTypes.forEach(amenityType => {
    const amenityQuery = AMENITY_QUERIES[amenityType]
    if (amenityQuery) {
      // Add both node and way queries for each amenity
      queryParts.push(`node[${amenityQuery.osmQuery}](${south},${west},${north},${east});`)
      queryParts.push(`way[${amenityQuery.osmQuery}](${south},${west},${north},${east});`)
    }
  })
  
  // Special handling for drinking water (keep existing complex query)
  if (amenityTypes.includes('drinking-water')) {
    queryParts.push(`node["man_made"="water_tap"](${south},${west},${north},${east});`)
    queryParts.push(`node["drinking_water"="yes"](${south},${west},${north},${east});`)
    queryParts.push(`way["man_made"="water_tap"](${south},${west},${north},${east});`)
  }
  
  return `
[out:json][timeout:25];
(
  ${queryParts.join('\n  ')}
);
out geom;
`.trim()
}

function convertOSMElementToAmenity(element: OSMElement): OSMAmenity | null {
  // Skip elements without coordinates
  if (!element.lat || !element.lon) {
    return null
  }

  const tags = element.tags || {}
  
  // Generate a consistent ID from OSM data
  const id = `osm-${element.type}-${element.id}`
  
  // Determine amenity type
  let amenityType = 'unknown'
  let defaultName = 'Unknown Amenity'
  
  if (tags.amenity === 'drinking_water' || tags.man_made === 'water_tap' || tags.drinking_water === 'yes') {
    amenityType = 'drinking-water'
    defaultName = 'Water Fountain'
  } else if (tags.amenity === 'toilets') {
    amenityType = 'toilets'
    defaultName = 'Public Toilet'
  } else if (tags.amenity) {
    // Try to find matching amenity type
    const foundAmenity = Object.values(AMENITY_QUERIES).find(
      query => query.osmQuery === `amenity=${tags.amenity}`
    )
    if (foundAmenity) {
      amenityType = foundAmenity.type
      defaultName = foundAmenity.defaultName
    }
  }
  
  // Extract name from various possible tag combinations
  const name = tags.name || 
               tags['name:en'] || 
               tags.description ||
               defaultName

  // Create description from available tags
  const descriptionParts = []
  if (tags.operator) descriptionParts.push(`Operated by ${tags.operator}`)
  if (tags.fee === 'yes') descriptionParts.push('Fee required')
  if (tags.fee === 'no') descriptionParts.push('Free')
  if (tags.wheelchair === 'yes') descriptionParts.push('Wheelchair accessible')
  if (tags.bottle === 'yes') descriptionParts.push('Suitable for bottles')
  if (tags.opening_hours) descriptionParts.push(`Hours: ${tags.opening_hours}`)
  
  const description = descriptionParts.length > 0 
    ? descriptionParts.join(' • ')
    : `OSM ${tags.amenity || tags.man_made || 'amenity'}`

  return {
    id,
    source: 'osm',
    lat: element.lat,
    lng: element.lon,
    name,
    description,
    amenityType,
    tags
  }
}

// Generic function to fetch amenities by type
export async function fetchOSMAmenities(amenityTypes: string[], bounds = BRIGHTON_BOUNDS): Promise<OSMAmenity[]> {
  try {
    const query = createOverpassQuery(amenityTypes, bounds)
    
    const response = await fetch(OVERPASS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`
    })

    if (!response.ok) {
      throw new Error(`OSM API request failed: ${response.status} ${response.statusText}`)
    }

    const data: OSMResponse = await response.json()
    
    // Convert OSM elements to our amenity format
    const amenities = data.elements
      .map(convertOSMElementToAmenity)
      .filter((amenity): amenity is OSMAmenity => amenity !== null)

    console.log(`Found ${amenities.length} amenities from OSM:`, 
      amenityTypes.map(type => 
        `${type}: ${amenities.filter(a => a.amenityType === type).length}`
      ).join(', ')
    )
    
    return amenities
  } catch (error) {
    console.error('Error fetching OSM amenities:', error)
    throw new Error(`Failed to fetch OSM data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Backward compatibility - keep existing water fountain function
export async function fetchOSMWaterFountains(bounds = BRIGHTON_BOUNDS): Promise<OSMAmenity[]> {
  return fetchOSMAmenities(['drinking-water'], bounds)
}
