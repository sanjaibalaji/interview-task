import React, { useState, useContext } from 'react';
import InputField from './InputField';
import { loginUser } from '../api/Auth';
import { AuthContext } from '../contexts/AuthContext';
import Logo from '../assets/images/logo.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext); // Use the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const { user, token } = await loginUser(email, password); // Call API
      login(user, token); // Update context
      alert("Login successful!");
  
      // Redirect to dashboard (common route for all roles)
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <>
      <div className="h-[120px] w-[180px] mt-16 text-center">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="mt-[100px]">
        <form onSubmit={handleSubmit} className="p-1 ml-[-20px] mt-18">
          {error && <p className="text-white text-sm">{error}</p>}
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@coderthemes.com"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-white">
              <input
                type="checkbox"
                className="mr-2 w-5 h-5 appearance-none border border-gray-300 rounded-md bg-gray-400 checked:bg-black flex justify-center items-center checked:before:content-['✔'] checked:before:text-white"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-white hover:underline border-b border-dotted font-bold">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 mt-7"
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
