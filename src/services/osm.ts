import { OSMResponse, OSMElement, OSMWaterFountain } from '../types/osm-data'

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter'

// Brighton bounding box coordinates
const BRIGHTON_BOUNDS = {
  south: 50.8,
  west: -0.2,
  north: 50.9,
  east: -0.05
}

function createOverpassQuery(bounds = BRIGHTON_BOUNDS): string {
  const { south, west, north, east } = bounds
  
  return `
[out:json][timeout:25];
(
  node["amenity"="drinking_water"](${south},${west},${north},${east});
  node["man_made"="water_tap"](${south},${west},${north},${east});
  node["drinking_water"="yes"](${south},${west},${north},${east});
  way["amenity"="drinking_water"](${south},${west},${north},${east});
  way["man_made"="water_tap"](${south},${west},${north},${east});
);
out geom;
`.trim()
}

function convertOSMElementToWaterFountain(element: OSMElement): OSMWaterFountain | null {
  // Skip elements without coordinates
  if (!element.lat || !element.lon) {
    return null
  }

  const tags = element.tags || {}
  
  // Generate a consistent ID from OSM data
  const id = `osm-${element.type}-${element.id}`
  
  // Extract name from various possible tag combinations
  const name = tags.name || 
               tags['name:en'] || 
               tags.description ||
               tags.amenity === 'drinking_water' ? 'Drinking Water' :
               tags.man_made === 'water_tap' ? 'Water Tap' :
               'Water Fountain'

  // Create description from available tags
  const descriptionParts = []
  if (tags.operator) descriptionParts.push(`Operated by ${tags.operator}`)
  if (tags.fee === 'yes') descriptionParts.push('Fee required')
  if (tags.fee === 'no') descriptionParts.push('Free')
  if (tags.wheelchair === 'yes') descriptionParts.push('Wheelchair accessible')
  if (tags.bottle === 'yes') descriptionParts.push('Suitable for bottles')
  
  const description = descriptionParts.length > 0 
    ? descriptionParts.join(' • ')
    : `OSM ${tags.amenity || tags.man_made || 'water feature'}`

  return {
    id,
    source: 'osm',
    lat: element.lat,
    lng: element.lon,
    name,
    description,
    amenity: tags.amenity,
    tags
  }
}

export async function fetchOSMWaterFountains(bounds = BRIGHTON_BOUNDS): Promise<OSMWaterFountain[]> {
  try {
    const query = createOverpassQuery(bounds)
    
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
    
    // Convert OSM elements to our water fountain format
    const waterFountains = data.elements
      .map(convertOSMElementToWaterFountain)
      .filter((fountain): fountain is OSMWaterFountain => fountain !== null)

    console.log(`Found ${waterFountains.length} water fountains from OSM`)
    
    return waterFountains
  } catch (error) {
    console.error('Error fetching OSM water fountains:', error)
    throw new Error(`Failed to fetch OSM data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function fetchOSMWaterFountainsNearLocation(
  lat: number, 
  lng: number, 
  radiusKm: number = 2
): Promise<OSMWaterFountain[]> {
  // Convert radius to approximate bounding box
  const latDelta = radiusKm / 111 // Rough conversion: 1 degree ≈ 111km
  const lngDelta = radiusKm / (111 * Math.cos(lat * Math.PI / 180))
  
  const bounds = {
    south: lat - latDelta,
    west: lng - lngDelta,
    north: lat + latDelta,
    east: lng + lngDelta
  }
  
  return fetchOSMWaterFountains(bounds)
}