import React from "react";
import Header from '../../components/Header';
import Table from '../../components/Table';
import Footer from '../../components/Footer';


function TalukListPage() {
  



  // Ensure that the data is correct and formatted properly
  const countryData = [
    { id: 1, country: "Australia",state:"Austria",district:"Aust",taluk:"Aus", altName: "Aus", code: 316, status: "Active" },
    { id: 2, country: "India",state:"Austria", district:"Aust",taluk:"Aus",altName: "IND", code: 356, status: "Active" },
    { id: 3, country: "Japan", state:"Austria",district:"Aust",taluk:"Aus",altName: "Jap", code: 889, status: "Active" },
  ];

  const routes = {
    add:`/addtaluk`,
    edit: (id) => `/edittaluk/`,
    view: (id) => `/viewtaluk/`,
    delete: (id) => `/deletetaluk/`,
    confirm: (id) => `/confirmtaluk/`,
  };

  const columns = ["S.No", "Country","State","District","Taluk", "Alt Name", "Code", "Status","Actions"];

  console.log("Country Data:", countryData); // Debugging output to check the data structure

  return (
    <div>
      <Header />
      <Table
        title="District Master"
        tableData={countryData} // Pass the tableData here
        columns={columns}
        routes={routes}
      
      />
      <Footer />
    </div>
  );
}

export default TalukListPage;
