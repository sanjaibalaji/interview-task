import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';

const Dashboard = () => {
  const { auth } = useContext(AuthContext); // Access the auth state

  // If not logged in, show a message
  if (!auth.user) {
    return <p>You are not logged in. Please log in to access the dashboard.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-grow flex-col items-center bg-gray-100 p-8">
        {/* Dashboard Title */}
        <h1 className="text-6xl font-bold mb-8 mt-8 text-gray-800">Dashboard</h1>

        {/* Row of Tiles */}
        <div className="flex justify-center gap-8 w-full mt-32 max-w-5xl">
          {/* Tile 1: Country */}
          <Link
            to="/country"
            className="bg-white shadow-lg rounded-lg p-6 w-1/5 text-center cursor-pointer hover:shadow-xl transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-700">Country</h2>
          </Link>

          {/* Tile 2: State */}
          <Link
            to="/state"
            className="bg-white shadow-lg rounded-lg p-6 w-1/5 text-center cursor-pointer hover:shadow-xl transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-700">State</h2>
          </Link>

          {/* Tile 3: District */}
          <Link
            to="/district"
            className="bg-white shadow-lg rounded-lg p-6 w-1/5 text-center cursor-pointer hover:shadow-xl transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-700">District</h2>
          </Link>

          {/* Tile 4: Taluk */}
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
