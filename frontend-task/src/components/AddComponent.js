import React from "react";
import "../styles/tailwind.css";
import { useNavigate } from "react-router-dom";

const AddComponent = ({ title, fields, buttons }) => {
    const navigate = useNavigate();
  return (
    <div className="bg-white rounded-md">
      {/* Title with Horizontal Line */}
      <div className="mb-6">
        <h2 className="ml-6 mt-6 text-xl font-semibold">{title}</h2>
        <hr className="mt-2 border-gray-300" />
      </div>

      {/* Field Grid */}
      <div className="grid ml-6 grid-cols-4 gap-4 mr-6 items-center mb-6">
        {fields.map((field, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              field.type === "checkbox" || field.type === "dropdown" ? "col-span-1" : "col-span-1"
            }`}
          >
            <label
              className={`text-sm font-medium text-gray-700 mb-1 ${
                field.type === "checkbox" || field.type === "dropdown" ? "inline-flex items-center" : ""
              }`}
              htmlFor={field.id}
            >
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "checkbox" ? (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={field.id}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{field.checkboxLabel || "isActive"}</span>
              </div>
            ) : field.type === "dropdown" ? (
              <select
                id={field.id}
                className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              >
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                id={field.id}
                placeholder={field.placeholder}
                className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                disabled={field.disabled || false}
              />
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        {buttons.map((button, index) => (
          <button
            key={index}
            type={button.type || "button"}
            // onClick={button.onClick}
            className={`px-4 py-2 text-white rounded-md ${button.className}`}
            
            style={button.style}
            onClick={ (() => navigate(button.route))}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddComponent;
