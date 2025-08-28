import React, { FunctionComponent } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useOSMAmenities } from '../hooks/useOSMAmenities'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapPage: FunctionComponent = () => {
  const [searchParams] = useSearchParams()
  
  // Get amenities from URL params (comma-separated)
  const amenitiesParam = searchParams.get('amenities') || ''
  const selectedAmenities = amenitiesParam.split(',').filter(Boolean)
  
  const { data: amenities, isLoading, error } = useOSMAmenities(selectedAmenities)
  const brightonCenter: [number, number] = [50.8225, -0.1372]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-gray-600">Loading amenities...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-red-600">Failed to load amenities</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Brighton Spaces
            </h1>
            <p className="text-gray-600 text-sm">
              Showing {amenities?.length || 0} {selectedAmenities.join(' & ')} locations
            </p>
          </div>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Categories
          </Link>
        </div>
      </header>

      <main className="h-[calc(100vh-120px)]">
        <MapContainer
          center={brightonCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {amenities?.map((amenity) => (
            <Marker key={amenity.id} position={[amenity.lat, amenity.lng]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-800 mb-1">{amenity.name}</h3>
                  {amenity.description && (
                    <p className="text-gray-600 text-sm">{amenity.description}</p>
                  )}
                  <p className="text-xs text-purple-600 mt-1">
                    {amenity.amenityType} • Source: OpenStreetMap
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
    </div>
  )
}

export default MapPage