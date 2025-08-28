export type OSMElement = {
  type: 'node' | 'way' | 'relation'
  id: number
  lat?: number
  lon?: number
  tags?: Record<string, string>
  nodes?: number[]
  members?: Array<{
    type: string
    ref: number
    role: string
  }>
}

export type OSMResponse = {
  version: number
  generator: string
  osm3s: {
    timestamp_osm_base: string
    copyright: string
  }
  elements: OSMElement[]
}

export type OSMWaterFountain = {
  id: string
  source: 'osm'
  lat: number
  lng: number
  name?: string
  description?: string
  amenity?: string
  tags: Record<string, string>
}