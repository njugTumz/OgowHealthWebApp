// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HealthFacilitiesPage from './pages/HealthFacilitiesPage';
import PatientsPage from './pages/PatientsPage';
import HealthWorkersPage from './pages/HealthWorkersPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="health-facilities" element={<HealthFacilitiesPage />} />
              <Route path="patients" element={<PatientsPage />} />
              <Route path="health-workers" element={<HealthWorkersPage />} />
           
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
