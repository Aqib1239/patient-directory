"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 pb-4 text-gray-500">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex justify-center items-center gap-2 px-2 py-px rounded-lg border border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
      >
       <ChevronLeft size={18}/> Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-7 h-7 rounded-lg cursor-pointer ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : " hover:bg-gray-100"
          }`}
        >
          {page.toString().padStart(2, "0")}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex justify-center items-center gap-2 px-2 py-px rounded-lg border border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
      >
        Next <ChevronRight size={18}/>
      </button>
    </div>
  );
}
