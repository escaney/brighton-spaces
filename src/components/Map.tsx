import React, { useState, useEffect, FunctionComponent } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getWaterFountains } from '../services/water-fountain';
import { WaterFountain } from '../types/water-fountains';

// todo add react query to handle fetching and caching
const Map: FunctionComponent = () => {
  const [fountains, setFountains] = useState<WaterFountain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const brightonCenter: [number, number] = [50.8225, -0.1372];

  useEffect(() => {
    const fetchFountains = async () => {
      try {
        setLoading(true);
        const data = await getWaterFountains();
        setFountains(data);
      } catch (err) {
        setError('Failed to load water fountains');
        console.error('Error fetching fountains:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFountains();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">Loading water fountains...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-600">{error}</div>
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
      {fountains.map((fountain) => (
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