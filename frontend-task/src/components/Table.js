import React from "react";
import "../styles/tailwind.css";
import { useNavigate } from "react-router-dom";
import filterIcon from "../assets/images/filter.png";
import addIcon from "../assets/images/add.png";
import editIcon from "../assets/images/edit.png";
import viewIcon from "../assets/images/view.png";
import deleteIcon from "../assets/images/delete.png";
import confirmIcon from "../assets/images/tick.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


function Table({ title, tableData, columns, routes }) {
  const navigate = useNavigate();

  // Ensure tableData is an array, defaulting to an empty array if it's undefined or null
  const safeTableData = Array.isArray(tableData) ? tableData : [];

  const handleActionClick = (route) => {
    navigate(route); // Navigate to the route passed
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search 'Name'"
              className="w-54 px-4 py-2 ml-4 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
           <span className="absolute left-3 ml-5 top-1/2 transform -translate-y-1/2 text-gray-500"> <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500"/> </span>
          </div>
        </div>
        <div className="flex gap-4">
          {/* Filter Button */}
          <button className="p-2 bg-indigo-100 rounded-md hover:bg-indigo-200">
            <img src={filterIcon} alt="Filter" className="w-5 h-5" />
          </button>

          {/* Add Button */}
          <button
            onClick={() => handleActionClick(routes.add)}
            className="p-2 bg-indigo-100 rounded-md hover:bg-indigo-200"
          >
            <img src={addIcon} alt="Add" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left border border-gray-300"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeTableData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  No data available
                </td>
              </tr>
            ) : (
              safeTableData.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b even:bg-gray-100 hover:bg-gray-200"
                >
                  <td className="px-6 py-4 text-left">{index + 1}</td>
                  <td className="px-6 py-4 text-left">{row.country}</td>
                  {columns.includes("State") && (
                    <td className="px-6 py-4 text-left">{row.state}</td>
                  )}
                  {columns.includes("District") && (
                    <td className="px-6 py-4 text-left">{row.district}</td>
                  )}
                  {columns.includes("Taluk") && (
                    <td className="px-6 py-4 text-left">{row.taluk}</td>
                  )}
                  <td className="px-6 py-4 text-left">{row.altName}</td>
                  <td className="px-6 py-4 text-left">{row.code}</td>
                  <td className="px-6 py-4 text-left">
                    <span className="px-3 py-1 text-green-700 bg-green-100 rounded-full">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left flex items-center gap-2">
                    <button
                      className="hover:text-green-500"
                      onClick={() => handleActionClick(routes.edit(row.id))}
                    >
                      <img src={editIcon} alt="Edit" className="w-5 h-5" />
                    </button>
                    <button
                      className="hover:text-blue-500"
                      onClick={() => handleActionClick(routes.view(row.id))}
                    >
                      <img src={viewIcon} alt="View" className="w-5 h-5" />
                    </button>
                    <button
                      className="hover:text-red-500"
                      onClick={() => handleActionClick(routes.delete(row.id))}
                    >
                      <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                    </button>
                    <button
                      className="hover:text-purple-500"
                      onClick={() => handleActionClick(routes.confirm(row.id))}
                    >
                      <img src={confirmIcon} alt="Confirm" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
