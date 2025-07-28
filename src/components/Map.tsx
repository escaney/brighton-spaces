import React, { FunctionComponent } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

type WaterFountain = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

const sampleFountains: WaterFountain[] = [
  {
    id: 1,
    name: "Brighton Beach Water Fountain",
    lat: 50.8198,
    lng: -0.1371,
    description: "Near the beach promenade"
    // add postcode with open in g-maps link
    // postcode: "BN1 2FN" // Example postcode, not used in this component
  },
  {
    id: 2,
    name: "Preston Park Water Fountain", 
    lat: 50.8403,
    lng: -0.1462,
    description: "In the main park area"
  },
  {
    id: 3,
    name: "The Lanes Water Fountain",
    lat: 50.8225,
    lng: -0.1372,
    description: "Historic quarter fountain"
  }
];

const Map: FunctionComponent = () => {
  const brightonCenter: [number, number] = [50.8225, -0.1372];

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
      {sampleFountains.map((fountain) => (
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