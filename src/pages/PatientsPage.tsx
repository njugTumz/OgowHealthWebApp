// src/pages/PatientsPage.tsx

import React from 'react';
import PatientList from '../components/Patient/PatientList';
import PatientForm from '../components/Patient/PatientForm';

const PatientsPage: React.FC = () => {
  return (
    <div>
      <h1>Patients</h1>
      <PatientForm />
      <PatientList />
    </div>
  );
};

export default PatientsPage;
