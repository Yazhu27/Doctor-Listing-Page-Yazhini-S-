import React, { useEffect, useState } from 'react';
import { Filter, X } from 'lucide-react';
import { ConsultationType, SortOption } from '../types/doctor';

interface FilterPanelProps {
  initialFilters: {
    consultationType: ConsultationType;
    specialties: string[];
    sortOrder: SortOption;
  };
  allSpecialties: string[];
  onFilterChange: (consultationType: ConsultationType, specialties: string[], sortOrder: SortOption) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  initialFilters,
  allSpecialties,
  onFilterChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [consultationType, setConsultationType] = useState<ConsultationType>(initialFilters.consultationType);
  const [specialties, setSpecialties] = useState<string[]>(initialFilters.specialties);
  const [sortOrder, setSortOrder] = useState<SortOption>(initialFilters.sortOrder);

  useEffect(() => {
    setConsultationType(initialFilters.consultationType);
    setSpecialties(initialFilters.specialties);
    setSortOrder(initialFilters.sortOrder);
  }, [initialFilters]);

  const handleConsultationChange = (type: ConsultationType) => {
    setConsultationType(type);
    onFilterChange(type, specialties, sortOrder);
  };

  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = specialties.includes(specialty)
      ? specialties.filter(s => s !== specialty)
      : [...specialties, specialty];
    
    setSpecialties(updatedSpecialties);
    onFilterChange(consultationType, updatedSpecialties, sortOrder);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOrder(sort);
    onFilterChange(consultationType, specialties, sort);
  };

  const clearFilters = () => {
    setConsultationType('all');
    setSpecialties([]);
    setSortOrder('fees');
    onFilterChange('all', [], 'fees');
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-blue-600 font-medium"
        >
          <Filter className="h-5 w-5" />
          <span>{isOpen ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
        
        {(consultationType !== 'all' || specialties.length > 0 || sortOrder !== 'fees') && (
          <button 
            onClick={clearFilters}
            className="flex items-center gap-1 text-gray-600 text-sm"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
          {/* Consultation Mode */}
          <div>
            <h3 data-testid="filter-header-moc" className="font-medium text-gray-800 mb-3">Consultation Mode</h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  data-testid="filter-video-consult"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={consultationType === 'video'}
                  onChange={() => handleConsultationChange('video')}
                />
                <span className="ml-2 text-gray-700">Video Consult</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  data-testid="filter-in-clinic"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={consultationType === 'clinic'}
                  onChange={() => handleConsultationChange('clinic')}
                />
                <span className="ml-2 text-gray-700">In Clinic</span>
              </label>
            </div>
          </div>
          
          {/* Specialties */}
          <div>
            <h3 data-testid="filter-header-speciality" className="font-medium text-gray-800 mb-3">Specialties</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allSpecialties.map(specialty => (
                <label key={specialty} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    data-testid={`filter-specialty-${String(specialty).replace('/', '-')}`}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    checked={specialties.includes(specialty)}
                    onChange={() => handleSpecialtyChange(specialty)}
                  />
                  <span className="ml-2 text-gray-700">{specialty}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Sort By */}
          <div>
            <h3 data-testid="filter-header-sort" className="font-medium text-gray-800 mb-3">Sort By</h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  data-testid="sort-fees"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={sortOrder === 'fees'}
                  onChange={() => handleSortChange('fees')}
                />
                <span className="ml-2 text-gray-700">Fees (Low to High)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  data-testid="sort-experience"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={sortOrder === 'experience'}
                  onChange={() => handleSortChange('experience')}
                />
                <span className="ml-2 text-gray-700">Experience (High to Low)</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;