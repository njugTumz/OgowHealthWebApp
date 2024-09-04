// src/pages/HealthWorkersPage.tsx

import React from 'react';
import HealthWorkerList from '../components/HealthWorker/HealthWorkerList';
import HealthWorkerForm from '../components/HealthWorker/HealthWorkerForm';

const HealthWorkersPage: React.FC = () => {
  return (
    <div>
      <h1>Health Workers</h1>
      <HealthWorkerForm />
      <HealthWorkerList />
    </div>
  );
};

export default HealthWorkersPage;
