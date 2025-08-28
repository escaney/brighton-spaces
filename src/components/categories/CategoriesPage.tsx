import React, { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../data/categories'
 

const CategoriesPage: FunctionComponent = () => {
  const navigate = useNavigate()
  
  // Track selected amenities by category
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, string[]>>({})

  const toggleAmenity = (categoryId: string, amenityId: string) => {
    setSelectedAmenities(prev => {
      const categorySelections = prev[categoryId] || []
      const isSelected = categorySelections.includes(amenityId)
      
      if (isSelected) {
        // Remove amenity
        return {
          ...prev,
          [categoryId]: categorySelections.filter(id => id !== amenityId)
        }
      } else {
        // Add amenity
        return {
          ...prev,
          [categoryId]: [...categorySelections, amenityId]
        }
      }
    })
  }

  const isAmenitySelected = (categoryId: string, amenityId: string) => {
    return selectedAmenities[categoryId]?.includes(amenityId) || false
  }

  const handleViewOnMap = (categoryId: string) => {
    const selectedForCategory = selectedAmenities[categoryId] || []
    if (selectedForCategory.length > 0) {
      const amenitiesParam = selectedForCategory.join(',')
      navigate(`/map?amenities=${amenitiesParam}`)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Brighton Spaces
          </h1>
          <p className="text-gray-600 text-center">
            Discover what Brighton & Hove has to offer
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            What are you looking for?
          </h2>
          <p className="text-gray-600">
            Select a category to find places and facilities around Brighton & Hove
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {            
            return (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {category.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700 text-sm">
                      Select what you're looking for:
                    </h4>
                    <div className="space-y-2">
                      {category.amenities.map((amenity) => (
                        <label
                          key={amenity.id}
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={isAmenitySelected(category.id, amenity.id)}
                            onChange={() => toggleAmenity(category.id, amenity.id)}
                            className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="mr-2 text-lg">{amenity.icon}</span>
                          <div className="flex-1">
                            <span className="text-gray-800 font-medium text-sm">{amenity.name}</span>
                            <p className="text-gray-600 text-xs">{amenity.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      className='w-full py-3 px-4 rounded-lg font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      onClick={() => handleViewOnMap(category.id)}
                    >
                      View on map
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default CategoriesPage