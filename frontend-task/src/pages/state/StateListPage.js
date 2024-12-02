import React from "react";
import Header from '../../components/Header';
import Table from '../../components/Table';
import Footer from '../../components/Footer';


function StateListPage() {




  // Ensure that the data is correct and formatted properly
  const countryData = [
    { id: 1, country: "Australia",state:"Austria", altName: "Aus", code: 316, status: "Active" },
    { id: 2, country: "India",state:"Austria", altName: "IND", code: 356, status: "Active" },
    { id: 3, country: "Japan", state:"Austria",altName: "Jap", code: 889, status: "Active" },
  ];

  const routes = {
    add:`/addstate`,
    edit: (id) => `/editstate/`,
    view: (id) => `/viewstate/`,
    delete: (id) => `/deletestate/`,
    confirm: (id) => `/confirmstate/`,
  };

  const columns = ["S.No", "Country","State", "Alt Name", "Code", "Status","Actions"];

  console.log("Country Data:", countryData); // Debugging output to check the data structure

  return (
    <div>
      <Header />
      <Table
        title="State Master"
        tableData={countryData} // Pass the tableData here
        columns={columns}
        routes={routes}
      />
      <Footer />
    </div>
  );
}

export default StateListPage;
