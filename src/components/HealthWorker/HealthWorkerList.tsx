// src/components/HealthWorker/HealthWorkerList.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { HealthWorker } from '../../types/models';
import { exportToCSV } from '../../utils/exportutils';

const HealthWorkerList: React.FC = () => {
  const [workers, setWorkers] = useState<HealthWorker[]>([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      const response = await api.get('/health-workers');
      setWorkers(response.data);
    };
    fetchWorkers();
  }, []);

  const handleExport = () => {
    exportToCSV(workers, 'HealthWorkers');
  };

  return (
    <div>
      <button onClick={handleExport}>Export as CSV</button>
      <ul>
        {workers.map(worker => (
          <li key={worker.id}>
            {worker.name} ({worker.designation}) - {worker.linkedHealthFacility}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthWorkerList;
