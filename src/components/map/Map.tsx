/** @format */

import React, { FunctionComponent } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useOSMAmenities } from '../../hooks/useOSMAmenities';

const Map: FunctionComponent = () => {
    const {
        data: amenities,
        isLoading,
        error,
    } = useOSMAmenities(['drinking-water', 'toilets']);

    const brightonCenter: [number, number] = [50.8225, -0.1372];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-gray-600">Loading amenities...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-red-600">Failed to load amenities</div>
            </div>
        );
    }

    return (
        <MapContainer
            center={brightonCenter}
            zoom={13}
            style={{ height: '600px', width: '100%' }}
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
                            <h3 className="font-semibold text-gray-800 mb-1">
                                {amenity.name}
                            </h3>
                            {amenity.description && (
                                <p className="text-gray-600 text-sm">
                                    {amenity.description}
                                </p>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
