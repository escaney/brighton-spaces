import React from 'react';
import Map from './features/map/Map';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50" data-testid="app-container">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Brighton Spaces
          </h1>
          <p className="text-gray-600 text-center">
            Find free water fountains around Brighton & Hove
          </p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Map />
        </div>
      </main>
    </div>
  );
}

export default App;
