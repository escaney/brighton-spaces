import { Category } from '../types/categories'

export const CATEGORIES: Category[] = [
  {
    id: 'amenities',
    name: 'Essential Amenities',
    description: 'Find basic facilities around Brighton & Hove',
    icon: '🏢',
    color: '#3B82F6', // Blue
    amenities: [
      {
        id: 'drinking-water',
        name: 'Water Fountains',
        description: 'Free drinking water fountains and taps',
        osmQuery: 'amenity=drinking_water',
        icon: '🚰',
        color: '#3B82F6'
      },
      {
        id: 'toilets',
        name: 'Public Toilets',
        description: 'Public toilet facilities',
        osmQuery: 'amenity=toilets',
        icon: '🚻',
        color: '#06B6D4'
      }
    ]
  }
]

// Helper functions
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(category => category.id === id)
}

export function getAmenityById(categoryId: string, amenityId: string) {
  const category = getCategoryById(categoryId)
  return category?.amenities.find(amenity => amenity.id === amenityId)
}