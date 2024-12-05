import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';

const Dashboard = () => {
  const { auth } = useContext(AuthContext); 

 
  if (!auth.user) {
    return <p>You are not logged in. Please log in to access the dashboard.</p>;
  }

  return (
    <div className="min-h-screen font-body flex flex-col">
     
      <Header />

      
      <main className="flex flex-grow flex-col items-center bg-gray-100 p-8">
       
        <h1 className="text-6xl font-bold mb-8 mt-8 text-gray-800">Dashboard</h1>

       
        <div className="flex justify-center gap-8 w-full mt-32 max-w-5xl">
         
          <Link
            to="/country"
            className="bg-white shadow-lg rounded-lg p-6 w-1/5 text-center cursor-pointer hover:shadow-xl transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-700">Country</h2>
          </Link>

          
          <Link
            to="/state"
            className="bg-white shadow-lg rounded-lg p-6 w-1/5 text-center cursor-pointer hover:shadow-xl transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-700">State</h2>
          </Link>

          
          <Link
            to="/district"
            className="bg-white shadow-lg rounded-lg p-6 w-1/5 text-center cursor-pointer hover:shadow-xl transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-700">District</h2>
          </Link>

         
          <Link
            to="/taluk"
            className="bg-white shadow-lg rounded-lg p-6 w-1/5 text-center cursor-pointer hover:shadow-xl transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-700">Taluk</h2>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
