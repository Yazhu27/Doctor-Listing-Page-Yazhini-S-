import React from 'react';
import { Doctor } from '../types/doctor';
import DoctorCard from './DoctorCard';
import { Frown } from 'lucide-react';

interface DoctorListProps {
  doctors: Doctor[];
  isLoading: boolean;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-gray-200 animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <Frown className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
        <p className="text-gray-600 max-w-md">
          We couldn't find any doctors matching your search criteria. Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600">{doctors.length} doctors found</p>
      <div className="space-y-4">
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;