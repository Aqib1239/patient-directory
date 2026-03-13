import { MailIcon, MapPin, Phone } from "lucide-react";
import { Patient } from "../types/patient";

interface CardViewProps {
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

export default function CardView({ patients }: CardViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {patients.map((patient) => {
        const colors = getMedicalIssueColors(patient.medical_issue);

        return (
          <div
            key={patient.patient_id}
            className="bg-white rounded-xl shadow-lg p-0 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-0 p-2 bg-[#B5D1FE] rounded-t-xl">
              {/* Patient Photo */}
              <div className="w-12 h-12 rounded-full bg-indigo-50 overflow-hidden shrink-0">
                {patient.photo_url ? (
                  <img
                    width={100}
                    height={100}
                    src={patient.photo_url}
                    alt={patient.patient_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/64";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-green-500 flex items-center justify-center text-white text-xl font-semibold">
                    {patient.patient_name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Patient Info */}
              <div className="flex-1 relative">
                <h3 className="font-semibold text-md text-gray-900">
                  {patient.patient_name}
                </h3>
                <p className="text-xs text-gray-700 font-semibold">
                  ID-{patient.patient_id.toString().padStart(4, "0")}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="absolute right-2 top-3 px-2 py-2 bg-[#3B82F6] text-white rounded-full text-xs">
                    Age: {patient.age}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 border-t p-3">
              {/* Medical Issue with dynamic color */}
              <span
                className={`px-2 py-0.5 ${colors.bg} ${colors.text} ${colors.border} rounded-full text-xs capitalize font-semibold inline-block`}
              >
                {patient.medical_issue}
              </span>

              {patient.contact.map((contact, idx) => (
                <div key={idx} className="space-y-2 pt-3">
                  <p className="text-sm text-gray-800 flex items-start gap-2">
                    <span className="text-gray-700">
                      <MapPin size={16} />
                    </span>
                    {contact.address}
                  </p>
                  <p className="text-sm text-gray-800 flex items-center gap-2">
                    <span className="text-gray-700">
                      <Phone size={16} />
                    </span>
                    {contact.number}
                  </p>
                  <p className="text-sm text-gray-800 flex items-center gap-2">
                    <span className="text-gray-700">
                      <MailIcon size={16} />
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-gray-800 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
