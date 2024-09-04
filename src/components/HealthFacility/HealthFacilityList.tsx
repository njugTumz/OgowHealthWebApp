// src/components/HealthFacility/HealthFacilityList.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HealthFacility } from '../../types/models';
import { api } from '../../services/api';

const ListWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
`;

const ListTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const HealthFacilityList: React.FC = () => {
  const [healthFacilities, setHealthFacilities] = useState<HealthFacility[]>([]);

  useEffect(() => {
    const fetchHealthFacilities = async () => {
      try {
        const response = await api.get('/health-facilities');
        setHealthFacilities(response.data);
      } catch (error) {
        console.error('Error fetching health facilities:', error);
      }
    };

    fetchHealthFacilities();
  }, []);

  return (
    <ListWrapper>
      <ListTitle>Health Facilities</ListTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>District</TableHeader>
            <TableHeader>Region</TableHeader>
            <TableHeader>State</TableHeader>
            <TableHeader>Country</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {healthFacilities.map((facility) => (
            <TableRow key={facility.id}>
              <TableCell>{facility.name}</TableCell>
              <TableCell>{facility.district}</TableCell>
              <TableCell>{facility.region}</TableCell>
              <TableCell>{facility.state}</TableCell>
              <TableCell>{facility.country}</TableCell>
              <TableCell>
                <ActionButton>Edit</ActionButton>
                <ActionButton>Delete</ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ListWrapper>
  );
};

export default HealthFacilityList;
