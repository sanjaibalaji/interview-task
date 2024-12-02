import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Import the provider
import Dashboard from './pages/Dashboard'; // Your dashboard component
import LoginPage from './pages/LoginPage';
import CountryListPage from './pages/country/CountryListPage';
import StateListPage from './pages/state/StateListPage';
import DistrictListPage from './pages/district/DistrictListPage'
import TalukListPage from './pages/taluk/TalukListPage'
import AddCountry from './pages/country/AddCountry'
import AddState from './pages/state/AddState';
import AddDistrict from './pages/district/AddDistrict';
import AddTaluk from './pages/taluk/AddTaluk';
import EditCountry from './pages/country/EditCountry'
import EditState from './pages/state/EditState'
import EditDistrict from './pages/district/EditDistrict'
import EditTaluk from './pages/taluk/EditTaluk'
import ViewCountry from './pages/country/ViewCountry';
import ViewState from './pages/state/ViewState';
import ViewDistrict from './pages/district/ViewDistrict';
import ViewTaluk from './pages/taluk/ViewTaluk';


function App() {
  return (
    <AuthProvider> {/* Wrap your app in the AuthProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/country" element={<CountryListPage />} />
            <Route path="/state" element={<StateListPage />} />
            <Route path="/district" element={<DistrictListPage />} />
            <Route path="/taluk" element={<TalukListPage />} />
            <Route path="/addcountry" element={<AddCountry/>} />
            <Route path="/addstate" element={<AddState/>} />
            <Route path="/adddistrict" element={<AddDistrict/>} />
            <Route path="/addtaluk" element={<AddTaluk/>} />
            <Route path="/editcountry" element={<EditCountry/>} />
            <Route path="/editstate" element={<EditState/>} />
            <Route path="/editdistrict" element={<EditDistrict/>} />
            <Route path="/edittaluk" element={<EditTaluk/>} />
            <Route path="/viewcountry" element={<ViewCountry/>} />
            <Route path="/viewstate" element={<ViewState/>} />
            <Route path="/viewdistrict" element={<ViewDistrict/>} />
            <Route path="/viewtaluk" element={<ViewTaluk/>} />
           </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
