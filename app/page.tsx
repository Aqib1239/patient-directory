"use client";

import { useState, useEffect, useCallback } from "react";
import { Patient, PatientResponse, FilterOptions } from "./types/patient";
import CardView from "./components/CardView";
import TableView from "./components/TableView";
import Pagination from "./components/Pagination";
import LoadingSpinner from "./components/LoadingSpinner";
import { ArrowDown, ArrowUp, ChevronDown, Download, ListFilter, SearchIcon, X } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [view, setView] = useState<"table" | "card">("table");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    medicalIssue: [],
    ageRange: [0, 120],
    sortBy: "patient_name",
    sortOrder: "asc",
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const medicalIssueOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const sortOptions = [
    {
      label: "Name",
      value: "patient_name-desc",
      icon: <ArrowDown size={16} className="text-gray-400" />,
    },
    {
      label: "Age",
      value: "age-asc",
      icon: <ArrowUp size={16} className="text-gray-400" />,
    },
    {
      label: "Age",
      value: "age-desc",
      icon: <ArrowDown size={16} className="text-gray-400" />,
    },
  ];

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // Fetch patients
  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        search: debouncedSearch,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      filters.medicalIssue.forEach((issue) => {
        params.append("medicalIssue", issue);
      });

      if (filters.ageRange[0] > 0) {
        params.append("minAge", filters.ageRange[0].toString());
      }
      if (filters.ageRange[1] < 120) {
        params.append("maxAge", filters.ageRange[1].toString());
      }

      const response = await fetch(`/api/patients?${params}`);

      if (!response.ok) throw new Error("Failed to fetch patients");

      const data: PatientResponse = await response.json();

      setPatients(data.patients);
      setTotalPages(data.totalPages);
      setTotalPatients(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, filters]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Active filters
  useEffect(() => {
    const active: string[] = [];

    if (filters.medicalIssue.length) active.push(...filters.medicalIssue);

    if (filters.ageRange[0] > 0 || filters.ageRange[1] < 120)
      active.push("Age Range");

    if (filters.sortBy !== "patient_name" || filters.sortOrder !== "asc")
      active.push("Sorted");

    setActiveFilters(active);
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const toggleMedicalIssue = (issue: string) => {
    const exists = filters.medicalIssue.includes(issue);

    if (exists) {
      handleFilterChange({
        medicalIssue: filters.medicalIssue.filter((i) => i !== issue),
      });
    } else {
      handleFilterChange({
        medicalIssue: [...filters.medicalIssue, issue],
      });
    }
  };

  const handleRemoveFilter = (filter: string) => {
    if (filter === "Age Range") {
      handleFilterChange({ ageRange: [0, 120] });
    } else if (filter === "Sorted") {
      handleFilterChange({ sortBy: "patient_name", sortOrder: "asc" });
    } else {
      handleFilterChange({
        medicalIssue: filters.medicalIssue.filter((f) => f !== filter),
      });
    }
  };

  const handleClearAllFilters = () => {
    setFilters({
      search: "",
      medicalIssue: [],
      ageRange: [0, 120],
      sortBy: "patient_name",
      sortOrder: "asc",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#3B82F6] flex justify-between mb-4">
        <div>
          <h1 className="w-[170px] lg:w-full sm:w-[170px] px-4 pt-4 lg:text-3xl sm:text-xl font-bold text-gray-100">
            Patient Directory
          </h1>
          <p className="px-4 pb-2 text-gray-200 text-sm">
            {totalPatients} Patients Found
          </p>
        </div>
        <div className="relative w-[300px] sm:w-[350px] md:w-[380px] lg:w-[533px] h-full">
          <Image
            src="/header_plus.png"
            alt="Patient Directory Logo"
            width={200}
            height={50}
            sizes="100vw"
            className="w-full object-fit"
            priority
            quality={85}
          />
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto sm:p-4 p-6">
        {/* Toolbar */}
        <div className="bg-white text-gray-700 mb-6 ">
          <div className="flex flex-col items-center justify-between gap-4 flex-wrap">
            {/* View Toggle */}
            <div className="flex justify-between w-full">
              <div className="flex">
                <button
                  onClick={() => setView("table")}
                  className={`pb-1 px-2 border-b-2 ${
                    view === "table"
                      ? "border-b-[3px] border-[#3B82F6]"
                      : "border-gray-500 text-gray-400"
                  }`}
                >
                  Table View
                </button>

                <button
                  onClick={() => setView("card")}
                  className={`pb-1 px-2 border-b-2 ${
                    view === "card"
                      ? "border-b-[3px] border-[#3B82F6]"
                      : "border-gray-500 text-gray-400"
                  }`}
                >
                  Card View
                </button>
              </div>

              <span className="flex text-sm text-gray-500">
                <ListFilter size={18} className="mr-1 text-[#3B82F6]" /> Active
                Filters: {activeFilters.length}
              </span>
            </div>

            <div className="flex items-center justify-between w-full gap-5">
              {/* Search */}
              <div className="flex-1 w-full relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) =>
                    handleFilterChange({ search: e.target.value })
                  }
                  placeholder="Search"
                  className="w-full border rounded-lg pl-10 pr-10 py-2 text-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <SearchIcon
                  size={18}
                  className="absolute left-3 top-2.5 text-[#3B82F6]"
                />

                <span
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="absolute right-3 top-2.5 cursor-pointer"
                >
                  <ListFilter size={18} className="text-[#3B82F6]" />
                </span>

                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-md p-3 z-20">
                    <p className="text-sm font-semibold mb-2">Filters</p>

                    {medicalIssueOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 py-1 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.medicalIssue.includes(option)}
                          onChange={() => toggleMedicalIssue(option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-blue-600">
                  Sort by:
                </span>

                <div className="relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-50"
                  >
                    Sort
                    <ChevronDown size={16} />
                  </button>

                  {showSortMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-20">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            const [sortBy, sortOrder] = option.value.split(
                              "-"
                            ) as [
                              "patient_name" | "age" | "patient_id",
                              "asc" | "desc"
                            ];
                            handleFilterChange({ sortBy, sortOrder });
                            setShowSortMenu(false);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
                        >
                          {option.label}
                          {option.icon}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 border rounded-md"
                >
                  {filter}
                  <button onClick={() => handleRemoveFilter(filter)}>
                    <X
                      size={16}
                      className="text-gray-600 hover:text-gray-800"
                    />
                  </button>
                </span>
              ))}

              <button
                onClick={handleClearAllFilters}
                className="text-sm text-blue-500 ml-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end mb-4">
          <button className="flex items-center gap-1 text-sm text-[#3B82F6] border border-[#3B82F6] px-3 py-1 rounded-md">
            PDF <Download size={18} />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {view === "table" ? (
              <TableView patients={patients} />
            ) : (
              <CardView patients={patients} />
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
