/** @format */

import React, { FunctionComponent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useOSMAmenities } from '../hooks/useOSMAmenities';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { AMENITY_QUERIES } from '../config/osm-queries';

const createCustomIcon = (emoji: string, color: string) => {
    return L.divIcon({
        html: `<div style="
      background: ${color}; 
      border-radius: 50%; 
      width: 35px; 
      height: 35px; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      border: 3px solid white; 
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      font-size: 18px;
      cursor: pointer;
    ">${emoji}</div>`,
        className: 'custom-marker',
        iconSize: [35, 35],
        iconAnchor: [17, 17],
    });
};

const MapPage: FunctionComponent = () => {
    const [searchParams] = useSearchParams();

    const amenitiesParam = searchParams.get('amenities') || '';
    const selectedAmenities = amenitiesParam.split(',').filter(Boolean);

    const {
        data: amenities,
        isLoading,
        error,
    } = useOSMAmenities(selectedAmenities);
    const brightonCenter: [number, number] = [50.8225, -0.1372];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                <div className="text-gray-600">Loading amenities...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                <div className="text-red-600">Failed to load amenities</div>
            </div>
        );
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
                            Showing {amenities?.length || 0}{' '}
                            {selectedAmenities.join(' & ')} locations
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
                    {/* todo refactor */}
                    {amenities?.map((amenity) => {
                        const amenityConfig =
                            AMENITY_QUERIES[amenity.amenityType];
                        let color = '#6B7280';

                        if (amenity.amenityType === 'drinking-water') {
                            color = '#3B82F6';
                        } else if (amenity.amenityType === 'toilets') {
                            color = '#06B6D4';
                        }

                        const icon = amenityConfig
                            ? createCustomIcon(
                                  amenityConfig.icon || '📍',
                                  color,
                              )
                            : createCustomIcon('📍', color);

                        return (
                            <Marker
                                key={amenity.id}
                                position={[amenity.lat, amenity.lng]}
                                icon={icon}
                            >
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            {amenity.name}
                                        </h3>
                                        {amenity.description && (
                                            <p className="text-gray-600 text-sm">
                                                {amenity.description}
                                            </p>
                                        )}
                                        <p className="text-xs text-purple-600 mt-1">
                                            {amenity.amenityType} • Source:
                                            OpenStreetMap
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </main>
        </div>
    );
};

export default MapPage;
