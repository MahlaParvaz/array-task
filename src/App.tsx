import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
