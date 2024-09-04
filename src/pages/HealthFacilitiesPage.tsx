// src/pages/HealthFacilitiesPage.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import HealthFacilityList from '../components/HealthFacility/HealthFacilityList';
import HealthFacilityForm from '../components/HealthFacility/HealthFacilityForm';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #eef2f7; /* Subtle background color */
  padding: 20px;
`;

const PageTitle = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const HealthFacilitiesPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleFormSuccess = () => {
    setRefresh(prev => !prev); // Toggle the refresh state
  };

  return (
    <PageWrapper>
      <PageTitle>Health Facilities</PageTitle>
      <HealthFacilityForm onSuccess={handleFormSuccess} />
      <HealthFacilityList refresh={refresh} />
    </PageWrapper>
  );
};

export default HealthFacilitiesPage;
