"use client";

import { FilterOptions } from "../types/patient";

interface FiltersProps {
  filters: FilterOptions;
  onChange: (filters: Partial<FilterOptions>) => void;
}

// Extract unique medical issues from your data
const medicalIssues = [
  "fever",
  "headache",
  "sore throat",
  "sprained ankle",
  "rash",
  "ear infection",
  "sinusitis",
  "cough",
  "cold",
  "allergy",
];

export default function Filters({ filters, onChange }: FiltersProps) {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium text-gray-700 block mb-2">
        Filter by Medical Condition:
      </label>
      <div className="flex flex-wrap gap-2">
        {medicalIssues.map((issue) => (
          <button
            key={issue}
            onClick={() => {
              const newIssues = filters.medicalIssue.includes(issue)
                ? filters.medicalIssue.filter((i) => i !== issue)
                : [...filters.medicalIssue, issue];
              onChange({ medicalIssue: newIssues });
            }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
              filters.medicalIssue.includes(issue)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {issue}
          </button>
        ))}
      </div>

      {/* Age Range Filter */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Age Range:
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Min:</span>
            <input
              type="number"
              value={filters.ageRange[0]}
              onChange={(e) =>
                onChange({
                  ageRange: [
                    parseInt(e.target.value) || 0,
                    filters.ageRange[1],
                  ],
                })
              }
              min="0"
              max={filters.ageRange[1]}
              className="w-20 px-2 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Max:</span>
            <input
              type="number"
              value={filters.ageRange[1]}
              onChange={(e) =>
                onChange({
                  ageRange: [
                    filters.ageRange[0],
                    parseInt(e.target.value) || 120,
                  ],
                })
              }
              min={filters.ageRange[0]}
              max="120"
              className="w-20 px-2 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
