// src/components/Patient/PatientList.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Patient } from '../../types/models';
import { exportToCSV } from '../../utils/exportutils';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await api.get('/patients');
      setPatients(response.data);
    };
    fetchPatients();
  }, []);

  const handleExport = () => {
    exportToCSV(patients, 'Patients');
  };

  return (
    <div>
      <button onClick={handleExport}>Export as CSV</button>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            {patient.name} ({patient.gender}) - {patient.linkedHealthFacility}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
