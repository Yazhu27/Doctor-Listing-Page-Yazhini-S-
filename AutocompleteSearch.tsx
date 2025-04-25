import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { Doctor } from '../types/doctor';

interface AutocompleteSearchProps {
  initialSearch: string;
  onSearch: (term: string) => void;
  doctors: Doctor[];
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ 
  initialSearch, 
  onSearch,
  doctors
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const debouncedSearch = debounce((term: string) => {
    onSearch(term);
  }, 500);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
    
    // Get suggestions
    if (term.trim()) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    setSearchTerm(doctor.name);
    onSearch(doctor.name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };
  
  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          data-testid="autocomplete-input"
          className="w-full pl-10 pr-4 py-3 text-sm md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Search doctors by name or specialty..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          {suggestions.map((doctor) => (
            <button
              key={doctor.id}
              data-testid="suggestion-item"
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              onClick={() => handleSuggestionClick(doctor)}
            >
              <div className="font-medium text-gray-900">{doctor.name}</div>
              <div className="text-sm text-gray-500">{doctor.specialty}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;