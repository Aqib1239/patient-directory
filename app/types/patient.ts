export interface Contact {
    address: string;
    number: string;
    email: string;
}

export interface Patient {
    patient_id: number;
    patient_name: string;
    age: number;
    photo_url: string;
    contact: Contact[];
    medical_issue: string;
}

export interface PatientResponse {
    patients: Patient[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface FilterOptions {
    search: string;
    medicalIssue: string[];
    ageRange: [number, number];
    sortBy: 'patient_name' | 'age' | 'patient_id';
    sortOrder: 'asc' | 'desc';
}

export interface ApiQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    medicalIssue?: string[];
    minAge?: number;
    maxAge?: number;
    sortBy?: string;
    sortOrder?: string;
}