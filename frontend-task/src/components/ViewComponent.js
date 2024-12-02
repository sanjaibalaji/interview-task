import React from "react";
import "../styles/tailwind.css";
import { useNavigate } from "react-router-dom";

const ViewComponent = ({ title, fields, buttons }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full mt-5">
      <div className="flex justify-between items-center ml-6 mr-6 mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex space-x-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={ (() => navigate(button.route))}
              className={`px-4 py-2 border rounded-lg transition ${
                button.color === "blue"
                  ? "border-blue-500 text-blue-500 hover:bg-blue-100"
                  : button.color === "purple"
                  ? "border-purple-500 text-purple-500 hover:bg-purple-100"
                  : "border-gray-300 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal line after heading */}
      <hr className="border-t border-gray-300 mb-6" />

      {/* Flexbox layout for aligned fields */}
      <div className="space-y-6 px-48">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium w-28">{field.label}</span>
            <span className="text-gray-600">:</span>
            <span
              className={`text-gray-800 w-16 ${
                field.status
                  ? `px-3 py-1 rounded-full text-sm ${
                      field.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`
                  : ""
              }`}
            >
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewComponent;
