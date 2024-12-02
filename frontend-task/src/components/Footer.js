import React, { useState } from "react";
import '../styles/tailwind.css'

function TableFooter() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowsChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white">
      {/* Rows Per Page */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Rows Per Page</span>
        <select
          value={rowsPerPage}
          onChange={handleRowsChange}
          className="text-sm text-gray-600 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Page {currentPage}</span>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className={`p-1 text-gray-500 rounded-md border border-gray-300 ${
              currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            «
          </button>
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className={`p-1 text-gray-500 rounded-md border border-gray-300 ${
              currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            ‹
          </button>
          <button
            onClick={() => handlePageChange("next")}
            className="p-1 text-gray-500 rounded-md border border-gray-300 hover:bg-gray-200"
          >
            ›
          </button>
          <button
            onClick={() => handlePageChange("next")}
            className="p-1 text-gray-500 rounded-md border border-gray-300 hover:bg-gray-200"
          >
            »
          </button>
        </div>
      </div>
      </div>

     
      
    </div>
  );
}

export default TableFooter;
