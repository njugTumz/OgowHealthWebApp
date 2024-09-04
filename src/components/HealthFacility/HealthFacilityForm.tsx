// src/components/HealthFacility/HealthFacilityForm.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { HealthFacility } from '../../types/models';
import { api } from '../../services/api';

interface HealthFacilityFormProps {
  healthFacility?: HealthFacility;
  onSuccess?: () => void;
}

const FormWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  margin-bottom: 40px; /* Added spacing between the form and the list */
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const HealthFacilityForm: React.FC<HealthFacilityFormProps> = ({ healthFacility, onSuccess }) => {
  const [formData, setFormData] = useState<HealthFacility>({
    name: healthFacility?.name || '',
    district: healthFacility?.district || '',
    region: healthFacility?.region || '',
    state: healthFacility?.state || '',
    country: healthFacility?.country || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/HealthFacility/${formData.id}`, formData);
      } else {
        await api.post('/HealthFacility', formData);
      }

      if (onSuccess) {
        onSuccess();
      }

      setFormData({
        name: '',
        district: '',
        region: '',
        state: '',
        country: '',
      });
    } catch (error) {
      console.error('Error saving health facility:', error);
    }
  };

  return (
    <FormWrapper>
      <FormTitle>{healthFacility ? 'Edit Health Facility' : 'Add Health Facility'}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="district">District</Label>
          <Input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="region">Region</Label>
          <Input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="state">State</Label>
          <Input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="country">Country</Label>
          <Input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </FormField>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormWrapper>
  );
};

export default HealthFacilityForm;
