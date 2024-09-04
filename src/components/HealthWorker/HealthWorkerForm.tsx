// src/components/HealthWorker/HealthWorkerForm.tsx

import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { HealthWorker, HealthFacility } from '../../types/models';

const HealthWorkerForm: React.FC = () => {
  const [formData, setFormData] = useState<HealthWorker>({
    id: '',
    name: '',
    designation: '',
    email: '',
    phoneNumber: '',
    linkedHealthFacility: '',
  });
  const [facilities, setFacilities] = useState<HealthFacility[]>([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      const response = await api.get('/health-facilities');
      setFacilities(response.data);
    };
    fetchFacilities();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await api.post('/health-workers', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
      <select name="linkedHealthFacility" value={formData.linkedHealthFacility} onChange={handleChange}>
        <option value="">Select Health Facility</option>
        {facilities.map(facility => (
          <option key={facility.id} value={facility.id}>{facility.name}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default HealthWorkerForm;
