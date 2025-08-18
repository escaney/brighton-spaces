import { WaterFountain } from '../types/water-fountains'

export const seedWaterFountains: Omit<WaterFountain, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'Brighton Pavilion Gardens',
    lat: 50.8226,
    lng: -0.1372,
    description: 'Public water fountain in the historic Royal Pavilion Gardens',
    address: 'Royal Pavilion Gardens, Brighton',
    postcode: 'BN1 1EE'
  },
  {
    name: 'The Level Playground',
    lat: 50.8289,
    lng: -0.1395,
    description: 'Family-friendly water fountain near the playground',
    address: 'The Level, Brighton',
    postcode: 'BN1 2RA'
  },
  {
    name: 'Brighton Beach Promenade',
    lat: 50.8169,
    lng: -0.1370,
    description: 'Seafront water fountain near the pier',
    address: 'Kings Road, Brighton',
    postcode: 'BN1 2FN'
  },
  {
    name: 'Valley Gardens',
    lat: 50.8266,
    lng: -0.1294,
    description: 'Water fountain in the beautiful Valley Gardens park',
    address: 'Valley Gardens, Brighton',
    postcode: 'BN2 0AC'
  },
  {
    name: 'Preston Park',
    lat: 50.8420,
    lng: -0.1469,
    description: 'Popular water fountain in Preston Park near the tennis courts',
    address: 'Preston Park, Brighton',
    postcode: 'BN1 6SD'
  },
  {
    name: 'Hove Lawns',
    lat: 50.8178,
    lng: -0.1738,
    description: 'Coastal water fountain on Hove seafront',
    address: 'Hove Lawns, Hove',
    postcode: 'BN3 2WB'
  },
  {
    name: 'Queen\'s Park',
    lat: 50.8319,
    lng: -0.1184,
    description: 'Victorian park water fountain near the café',
    address: 'Queen\'s Park Road, Brighton',
    postcode: 'BN2 0GJ'
  },
  {
    name: 'Stanmer Park',
    lat: 50.8662,
    lng: -0.0833,
    description: 'Countryside water fountain in Stanmer village',
    address: 'Stanmer Park, Brighton',
    postcode: 'BN1 9SE'
  },
  {
    name: 'Brighton Marina',
    lat: 50.8087,
    lng: -0.1035,
    description: 'Marina water fountain near the shopping outlets',
    address: 'Brighton Marina Village',
    postcode: 'BN2 5UF'
  },
  {
    name: 'Churchill Square',
    lat: 50.8211,
    lng: -0.1406,
    description: 'Shopping center water fountain - indoor location',
    address: 'Churchill Square, Brighton',
    postcode: 'BN1 2RG'
  },
  {
    name: 'West Pier Arches',
    lat: 50.8175,
    lng: -0.1542,
    description: 'Historic seafront location with water fountain',
    address: 'West Street, Brighton',
    postcode: 'BN1 2RE'
  },
  {
    name: 'Withdean Park',
    lat: 50.8531,
    lng: -0.1542,
    description: 'Local park water fountain in residential area',
    address: 'Withdean Park, Brighton',
    postcode: 'BN1 5JQ'
  }
]