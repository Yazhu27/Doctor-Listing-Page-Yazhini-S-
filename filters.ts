import queryString from 'query-string';
import { Doctor, ConsultationType, SortOption } from '../types/doctor';

export function filterDoctors(
  doctors: Doctor[],
  searchTerm: string = '',
  consultationType: ConsultationType = 'all',
  specialties: string[] = [],
  sortOrder: SortOption = 'fees'
): Doctor[] {
  // Filter by search term
  let filtered = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter by consultation type
  if (consultationType !== 'all') {
    filtered = filtered.filter(doctor => 
      doctor.consultationMode.includes(consultationType as 'video' | 'clinic')
    );
  }
  
  // Filter by specialties
  if (specialties.length > 0) {
    filtered = filtered.filter(doctor => 
      specialties.includes(doctor.specialty)
    );
  }
  
  // Sort doctors
  filtered.sort((a, b) => {
    if (sortOrder === 'fees') {
      return a.fee - b.fee;
    } else if (sortOrder === 'experience') {
      return b.experience - a.experience;
    }
    return 0; // Default case
  });
  
  return filtered;
}

export function getFilterFromUrl(): {
  search: string;
  consultationType: ConsultationType;
  specialties: string[];
  sortOrder: SortOption;
} {
  const params = queryString.parse(window.location.search);
  
  return {
    search: (params.search as string) || '',
    consultationType: (params.consultationType as ConsultationType) || 'all',
    specialties: params.specialties 
      ? Array.isArray(params.specialties) 
        ? params.specialties as string[] 
        : [params.specialties as string]
      : [],
    sortOrder: (params.sortOrder as SortOption) || 'fees'
  };
}

export function updateUrlWithFilters(
  search: string,
  consultationType: ConsultationType,
  specialties: string[],
  sortOrder: SortOption
): void {
  const params = queryString.stringify({
    search: search || undefined,
    consultationType: consultationType !== 'all' ? consultationType : undefined,
    specialties: specialties.length > 0 ? specialties : undefined,
    sortOrder: sortOrder !== 'fees' ? sortOrder : undefined
  }, { skipEmptyString: true, skipNull: true });
  
  const newUrl = `${window.location.pathname}${params ? `?${params}` : ''}`;
  window.history.pushState({}, '', newUrl);
}