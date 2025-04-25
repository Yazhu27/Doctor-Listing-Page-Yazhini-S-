import React from 'react';

export interface Doctor {
  id: string;
  name: string;
  image?: string;
  specialty: string;
  experience: number;
  fee: number;
  rating: number;
  consultationMode: ('video' | 'clinic')[];
  location?: string;
  available: boolean;
  nextAvailable?: string;
  education?: string;
  languages?: string[];
  reviews?: number;
}

export type ConsultationType = 'video' | 'clinic' | 'all';
export type SortOption = 'fees' | 'experience' | 'rating';

export const SPECIALTIES = [
  'General Physician',
  'Dentist',
  'Dermatologist',
  'Paediatrician',
  'Gynaecologist',
  'ENT',
  'Diabetologist',
  'Cardiologist',
  'Physiotherapist',
  'Endocrinologist',
  'Orthopaedic',
  'Ophthalmologist',
  'Gastroenterologist',
  'Pulmonologist',
  'Psychiatrist',
  'Urologist',
  'Dietitian/Nutritionist',
  'Psychologist',
  'Sexologist',
  'Nephrologist',
  'Neurologist',
  'Oncologist',
  'Ayurveda',
  'Homeopath'
] as const;

export type Specialty = typeof SPECIALTIES[number];