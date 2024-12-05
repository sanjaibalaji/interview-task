import React from "react";
import "../styles/tailwind.css";
import { useNavigate } from "react-router-dom";
import Submit from "../assets/images/submit.png";
import Download from "../assets/images/download.png";

const ViewComponent = ({ title, fields, buttons }) => {
  const navigate = useNavigate();
  

  console.log("Download icon path:", Download);
  
  return (
    <div className="w-full font-body mt-5">
      <div className="flex justify-between items-center ml-6 mr-6 mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex space-x-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => navigate(button.route)}
              className={`flex items-center px-4 py-2 border rounded-lg transition ${
                button.color === "blue"
                  ? "border-blue-500 text-blue-500 hover:bg-blue-100"
                  : button.color === "purple"
                  ? "bg-purple-500 text-white hover:bg-purple-100"
                  : "bg-purple-500 text-white hover:bg-purple-100"
              }`}
            >
         
              {button.label === "Download PDF" && (
                <img src={Download} alt="Download" className="w-5 h-5 mr-2" />
              )}
            
              {button.label === "Submit" && (
                <img src={Submit} alt="Submit" className="w-5 h-5 mr-2" />
              )}
              <span>{button.label}</span>
            </button>
          ))}
        </div>
      </div>

     
      <hr className="border-t border-gray-300 mb-6" />

    
      <div className="space-y-8 px-48">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium w-28">{field.label}</span>
            <span className="text-gray-600">:</span>
            <span
              className={`text-gray-800 w-20 ${
                field.status
                  ? `px-5 py-2 rounded-full text-sm ${
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
