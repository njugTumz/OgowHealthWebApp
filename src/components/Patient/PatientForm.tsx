// src/components/Patient/PatientForm.tsx

import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Patient, HealthFacility } from '../../types/models';

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<Patient>({
    id: '',
    name: '',
    gender: '',
    address: '',
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
    await api.post('/patients', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
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

export default PatientForm;
