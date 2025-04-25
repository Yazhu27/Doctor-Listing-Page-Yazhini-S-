import React, { useState, useEffect } from 'react';
import { Stethoscope } from 'lucide-react';
import AutocompleteSearch from './components/AutocompleteSearch';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { fetchDoctors } from './utils/api';
import { filterDoctors, getFilterFromUrl, updateUrlWithFilters } from './utils/filters';
import { Doctor, ConsultationType, SortOption, SPECIALTIES } from './types/doctor';

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get initial filters from URL
  const initialFilters = getFilterFromUrl();
  const [searchTerm, setSearchTerm] = useState(initialFilters.search);
  const [consultationType, setConsultationType] = useState(initialFilters.consultationType);
  const [selectedSpecialties, setSelectedSpecialties] = useState(initialFilters.specialties);
  const [sortOrder, setSortOrder] = useState(initialFilters.sortOrder);

  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        
        // Apply initial filters
        const filtered = filterDoctors(
          data,
          searchTerm,
          consultationType,
          selectedSpecialties,
          sortOrder
        );
        setFilteredDoctors(filtered);
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadDoctors();
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    if (doctors.length > 0) {
      const filtered = filterDoctors(
        doctors,
        searchTerm,
        consultationType,
        selectedSpecialties,
        sortOrder
      );
      setFilteredDoctors(filtered);
      
      // Update URL with current filters
      updateUrlWithFilters(
        searchTerm,
        consultationType,
        selectedSpecialties,
        sortOrder
      );
    }
  }, [doctors, searchTerm, consultationType, selectedSpecialties, sortOrder]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (
    type: ConsultationType,
    specs: string[],
    sort: SortOption
  ) => {
    setConsultationType(type);
    setSelectedSpecialties(specs);
    setSortOrder(sort);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">HealthConnect</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Find the Right Doctor</h2>
              <p className="text-gray-600">Search for specialists, read reviews, and book appointments online</p>
            </div>
            
            <div className="mb-6">
              <AutocompleteSearch 
                initialSearch={searchTerm} 
                onSearch={handleSearch}
                doctors={doctors}
              />
            </div>
            
            <FilterPanel 
              initialFilters={{
                consultationType,
                specialties: selectedSpecialties,
                sortOrder
              }}
              allSpecialties={SPECIALTIES}
              onFilterChange={handleFilterChange}
            />
            
            <DoctorList 
              doctors={filteredDoctors} 
              isLoading={loading} 
            />
          </>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Stethoscope className="h-6 w-6" />
              <span className="font-bold text-lg">HealthConnect</span>
            </div>
            
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} HealthConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;