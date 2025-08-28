import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoriesPage from './components/categories/CategoriesPage';
import MapPage from './components/MapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
