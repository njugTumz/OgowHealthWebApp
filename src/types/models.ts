// src/types/models.ts

export interface HealthFacility {
    id?: string;
    name: string;
    district: string;
    region: string;
    state: string;
    country: string;
  }
  
  export interface HealthWorker {
    id: string;
    name: string;
    designation: string;
    email: string;
    phoneNumber: string;
    linkedHealthFacility: string; // ID of the Health Facility
  }
  
  export interface Patient {
    id: string;
    name: string;
    gender: string;
    address: string;
    linkedHealthFacility: string; // ID of the Health Facility
  }
  