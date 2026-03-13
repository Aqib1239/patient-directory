import { ChevronRight } from "lucide-react";
import { Patient } from "../types/patient";

interface TableViewProps {
  patients: Patient[];
}

// Color mapping for medical issues
const medicalIssueColors: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  fever: {
    bg: "bg-[#DC262666]",
    border: "border border-[#ff0000]",
    text: "text-gray-800",
  },
  headache: {
    bg: "bg-[#F57C0B66]",
    border: "border border-[#ea7100]",
    text: "text-gray-800",
  },
  "sore throat": {
    bg: "bg-[#EAB30866]",
    border: "border border-[#ba8d00]",
    text: "text-gray-800",
  },
  "sprained ankle": {
    bg: "bg-[#10B98166]",
    border: "border border-[#03A972]",
    text: "text-gray-800",
  },
  rash: {
    bg: "bg-[#EC489966]",
    border: "border border-[#EC4899]",
    text: "text-gray-800",
  },
  "ear infection": {
    bg: "bg-[#06B6D480]",
    border: "border border-[#00A2BD]",
    text: "text-gray-800",
  },
  sinusitis: {
    bg: "bg-teal-100",
    text: "text-teal-700",
    border: "border border-teal-700",
  },
  cough: {
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    border: "border border-cyan-700",
  },
  cold: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border border-blue-700",
  },
  allergy: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-700",
  },
  flu: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    border: "border border-rose-700",
  },
  migraine: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border border-violet-700",
  },
  asthma: {
    bg: "bg-sky-100",
    text: "text-sky-700",
    border: "border border-sky-700",
  },
  diabetes: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border border-amber-700",
  },
  hypertension: {
    bg: "bg-lime-100",
    text: "text-lime-700",
    border: "border border-lime-700",
  },
  default: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border border-gray-700",
  },
};

const getMedicalIssueColors = (issue: string) => {
  const normalizedIssue = issue.toLowerCase().trim();
  return medicalIssueColors[normalizedIssue] || medicalIssueColors.default;
};

export default function TableView({ patients }: TableViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                Medical Issue
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => {
              const colors = getMedicalIssueColors(patient.medical_issue);

              return (
                <tr key={patient.patient_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden">
                      {patient.photo_url ? (
                        <img
                          width={100}
                          height={100}
                          src={patient.photo_url}
                          alt={patient.patient_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/40";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white font-semibold">
                          {patient.patient_name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ID-{patient.patient_id.toString().padStart(4, "0")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.patient_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 ${colors.bg} ${colors.text} ${colors.border} rounded-full text-xs capitalize font-semibold inline-block`}
                    >
                      {patient.medical_issue}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {patient.contact.map((c, idx) => (
                      <div key={idx}>{c.address}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.contact.map((c, idx) => (
                      <div key={idx}>{c.number}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.contact.map((c, idx) => (
                      <div key={idx}>{c.email}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">
                    <ChevronRight size={17} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {patients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No patients found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
