import React, { FunctionComponent } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useWaterFountains } from './hooks/useWaterFountains';

const Map: FunctionComponent = () => {
  const { data: fountains, isLoading, error } = useWaterFountains();
  
  const brightonCenter: [number, number] = [50.8225, -0.1372];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">Loading water fountains...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-600">Failed to load water fountains</div>
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
      {fountains?.map((fountain) => (
        <Marker key={fountain.id} position={[fountain.lat, fountain.lng]}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-gray-800 mb-1">{fountain.name}</h3>
              {fountain.description && (
                <p className="text-gray-600 text-sm">{fountain.description}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;