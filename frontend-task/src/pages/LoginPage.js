import React from 'react';
import '../styles/tailwind.css';
import BackgroundImage from '../assets/images/login1.jpg';
import backgroundImage1 from '../assets/images/register.jpg';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="relative bg-black h-screen w-full flex justify-center items-center">
      {/* Main Container */}
      <div className="relative flex bg-center w-4/5 max-w-5xl h-full shadow-lg rounded-lg overflow-hidden">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-center bg-cover blur-md"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        ></div>
           <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content Overlay */}
        <div className="relative flex w-full h-full z-10">
          {/* Left Section */}
          <div
            className="flex-1 relative flex flex-col h-auto w-full bg-cover bg-center rounded-lg justify-center items-center p-8 m-2"
            style={{ backgroundImage: `url(${backgroundImage1})` }}
          ></div>

          {/* Right Section */}
          <div className="flex-1 flex mb-40 flex-col justify-center items-center p-8 m-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
