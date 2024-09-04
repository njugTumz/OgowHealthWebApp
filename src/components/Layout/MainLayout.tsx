// src/components/Layout/MainLayout.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height of the viewport */
  width: 100vw;  /* Full width of the viewport */
  margin: 0;     /* Remove any margin */
`;

const NavBar = styled.nav`
  background-color: #007bff;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  width: 100%;  /* Ensure the NavBar spans the full width */
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 4px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ContentWrapper = styled.div`
  flex: 1; /* Take up remaining space after NavBar */
  overflow-y: auto;
  padding: 20px;
  background-color: #f4f4f4; /* Background color for the content area */
  width: 100%; /* Ensure the content spans the full width */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
`;

const MainLayout: React.FC = () => {
  return (
    <LayoutWrapper>
      <NavBar>
        <NavLink to="/health-facilities">Health Facilities</NavLink>
        <NavLink to="/patients">Patients</NavLink>
        <NavLink to="/health-workers">Health Workers</NavLink>
      </NavBar>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default MainLayout;
