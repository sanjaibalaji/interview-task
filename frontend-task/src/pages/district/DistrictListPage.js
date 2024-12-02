import React from "react";
import Header from '../../components/Header';
import Table from '../../components/Table';
import Footer from '../../components/Footer';


function DistrictListPage() {


  
  // Ensure that the data is correct and formatted properly
  const countryData = [
    { id: 1, country: "Australia",state:"Austria",district:"Aust", altName: "Aus", code: 316, status: "Active" },
    { id: 2, country: "India",state:"Austria", district:"Aust",altName: "IND", code: 356, status: "Active" },
    { id: 3, country: "Japan", state:"Austria",district:"Aust",altName: "Jap", code: 889, status: "Active" },
  ];

  const routes = {
    add:`/adddistrict`,
    edit: (id) => `/editdistrict/`,
    view: (id) => `/viewdistrict/`,
    delete: (id) => `/deletedistrict/`,
    confirm: (id) => `/confirmdistrict/`,
  };

  const columns = ["S.No", "Country","State","District", "Alt Name", "Code", "Status","Actions"];

  console.log("Country Data:", countryData); // Debugging output to check the data structure

  return (
    <div>
      <Header />
      <Table
        title="District Master"
        routes={routes}
        tableData={countryData} // Pass the tableData here
        columns={columns}
       
      />
      <Footer />
    </div>
  );
}

export default DistrictListPage;
