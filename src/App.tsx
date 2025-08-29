import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Categories from './pages/Categories';
import Map from './pages/Map';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
