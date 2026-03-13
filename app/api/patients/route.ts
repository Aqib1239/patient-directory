import { NextRequest, NextResponse } from 'next/server';
import patientsData from '@/public/MOCK_DATA.json';
import { Patient } from '@/app/types/patient';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Parse query parameters
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const search = searchParams.get('search') || '';
        const medicalIssues = searchParams.getAll('medicalIssue');
        const minAge = searchParams.get('minAge') ? parseInt(searchParams.get('minAge')!) : undefined;
        const maxAge = searchParams.get('maxAge') ? parseInt(searchParams.get('maxAge')!) : undefined;
        const sortBy = searchParams.get('sortBy') || 'patient_name';
        const sortOrder = searchParams.get('sortOrder') || 'asc';

        // Start with all patients
        let patients = [...patientsData] as Patient[];

        // Apply search filter (search in name, email, address)
        if (search) {
            patients = patients.filter(patient =>
                patient.patient_name.toLowerCase().includes(search.toLowerCase()) ||
                patient.contact.some(c =>
                    c.email.toLowerCase().includes(search.toLowerCase()) ||
                    c.address.toLowerCase().includes(search.toLowerCase())
                ) ||
                patient.patient_id.toString().includes(search)
            );
        }

        // Apply medical issue filter
        if (medicalIssues.length > 0) {
            patients = patients.filter(patient =>
                medicalIssues.some(issue =>
                    patient.medical_issue.toLowerCase().includes(issue.toLowerCase())
                )
            );
        }

        // Apply age filter
        if (minAge !== undefined) {
            patients = patients.filter(patient => patient.age >= minAge);
        }
        if (maxAge !== undefined) {
            patients = patients.filter(patient => patient.age <= maxAge);
        }

        // Apply sorting
        patients.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case 'patient_name':
                    comparison = a.patient_name.localeCompare(b.patient_name);
                    break;
                case 'age':
                    comparison = a.age - b.age;
                    break;
                case 'patient_id':
                    comparison = a.patient_id - b.patient_id;
                    break;
                default:
                    comparison = a.patient_name.localeCompare(b.patient_name);
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        // Calculate pagination
        const total = patients.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedPatients = patients.slice(start, end);
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            patients: paginatedPatients,
            total,
            page,
            limit,
            totalPages
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch patients' },
            { status: 500 }
        );
    }
}