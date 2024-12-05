import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import Dashboard from './pages/Dashboard';
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
    <AuthProvider> 
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
            <Route path="/editcountry/:countryId" element={<EditCountry/>} />
            <Route path="/editstate/:stateId" element={<EditState/>} />
            <Route path="/editdistrict/:districtId" element={<EditDistrict/>} />
            <Route path="/edittaluk/:talukId" element={<EditTaluk/>} />
            <Route path="/viewcountry/:countryId" element={<ViewCountry/>} />
            <Route path="/viewstate/:stateId" element={<ViewState/>} />
            <Route path="/viewdistrict/:districtId" element={<ViewDistrict/>} />
            <Route path="/viewtaluk/:talukId" element={<ViewTaluk/>} />
           </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
