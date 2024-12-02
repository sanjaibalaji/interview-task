import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const InputField = ({ label, type, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordField = type === 'password';

  return (
    <div className="mb-6">
      <label className="block text-sm text-gray-300 mb-3">{label}</label>
      <div className="relative">
        <input
          type={isPasswordField && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-2 py-2 mr-[300px] text-left text-white bg-transparent border-2 border-white-600 rounded focus:outline-none focus:ring-2 focus:ring-white-500"

        />
        {isPasswordField && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-white  hover:text-white-600 focus:outline-none"
          >
            <div className="flex items-center">
              {/* Vertical Line */}
              <div className="h-10 border-r border-gray-500 mr-3"></div>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
         </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
