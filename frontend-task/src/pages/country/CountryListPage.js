import React, { useEffect, useState } from "react";
import { getCountryList } from "../../api/Auth"; // Ensure correct import path
import Table from "../../components/Table";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function CountryListPage() {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true); // Set loading to true when starting the API call
      try {
        const data = await getCountryList();
        console.log("API Response:", data); // Log the response to confirm it's being fetched

        // Check if data is in the expected format (array of countries)
        if (Array.isArray(data)) {
          const transformedData = data.map((item, index) => ({
            id: index + 1, // S.No
            country: item.c_name,
            altName: item.c_alt,
            code: item.c_code,
            status: item.c_status ? "Active" : "Inactive",
            actions: item._id // Placeholder for actions (Edit, Delete, etc.)
          }));
          setCountryData(transformedData);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        setError(err.message); // Handle any error
        console.error("Error fetching country data:", err);
      } finally {
        setLoading(false); // Set loading to false when the request finishes
      }
    };

    fetchCountryData();
  }, []);

  const routes = {
    add: `/addcountry`,
    edit: (id) => `/editcountry/${id}`,
    view: (id) => `/viewcountry/${id}`,
    delete: (id) => `/deletecountry/${id}`,
    confirm: (id) => `/confirmcountry/${id}`,
  };

  const columns = ["S.No", "Country", "Alt Name", "Code", "Status", "Actions"];

  return (
    <div>
      <Header />
      {loading ? (
        <div>Loading...</div> // Display loading text while fetching data
      ) : error ? (
        <div className="error-message">{`Error: ${error}`}</div> // Display error if any
      ) : countryData.length === 0 ? (
        <div>No data available</div> // Handle empty data case
      ) : (
        <Table
          title="Country Master"
          tableData={countryData} // Pass the mapped data to the Table component
          columns={columns}
          routes={routes}
        />
      )}
      <Footer />
    </div>
  );
}

export default CountryListPage;
