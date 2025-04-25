import React from 'react';
import { Star, Video, Building2, Clock, MapPin, GraduationCap, Languages } from 'lucide-react';
import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card"
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Doctor Image */}
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
            {doctor.image ? (
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-2xl font-bold text-blue-600">
                {doctor.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          
          {/* Doctor Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h2 data-testid="doctor-name" className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
              <p data-testid="doctor-specialty" className="text-blue-600 font-medium">{doctor.specialty}</p>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              {doctor.rating != null && (
                <span className="font-medium">{doctor.rating.toFixed(1)}</span>
              )}
              {doctor.reviews && (
                <span className="text-gray-500 text-sm">({doctor.reviews} reviews)</span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-1 text-gray-700">
                <GraduationCap className="h-4 w-4 text-gray-500" />
                <span data-testid="doctor-experience">{doctor.experience} years exp</span>
              </div>
              
              {doctor.location && (
                <div className="flex items-center gap-1 text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{doctor.location}</span>
                </div>
              )}
              
              {doctor.languages && (
                <div className="flex items-center gap-1 text-gray-700">
                  <Languages className="h-4 w-4 text-gray-500" />
                  <span>{doctor.languages.join(', ')}</span>
                </div>
              )}
            </div>
            
            {doctor.education && (
              <div className="text-sm text-gray-600">
                {doctor.education}
              </div>
            )}
          </div>
          
          {/* Consultation Info */}
          <div className="w-full md:w-48 flex flex-col gap-3 border-t pt-3 md:pt-0 md:border-t-0 md:border-l md:pl-4 mt-3 md:mt-0">
            <div className="space-y-2">
              <div className="flex flex-col">
                <span data-testid="doctor-fee" className="text-2xl font-semibold text-gray-800">₹{doctor.fee}</span>
                <span className="text-xs text-gray-500">Consultation fee</span>
              </div>
              
              <div className="space-y-1">
                {(doctor.consultationMode ?? []).includes('video') && (
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <Video className="h-4 w-4" />
                    <span>Video Consult</span>
                  </div>
                )}
                
                {(doctor.consultationMode ?? []).includes('clinic') && (
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Building2 className="h-4 w-4" />
                    <span>In Clinic</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              {doctor.available ? (
                <span className="text-green-600 font-medium">Available Today</span>
              ) : (
                <span>Next: {doctor.nextAvailable || 'Tomorrow'}</span>
              )}
            </div>
            
            <button className="mt-auto w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;