import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ViewComponent from "../../components/ViewComponent";
import Header from "../../components/Header";
import { getCountryById } from "../../api/Auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ViewCountry() {
  const { countryId } = useParams();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const response = await getCountryById(countryId);
        console.log("Full API Response:", response.data);

       
        const countryData = response.data.country;
        const { c_name, c_alt, c_code, c_status } = countryData;

        const fetchedFields = [
          { label: "Name", value: c_name },
          { label: "Alt Name", value: c_alt },
          { label: "Code", value: c_code },
          { label: "Status", value: c_status ? "Active" : "Inactive", status: c_status ? "Active" : "Inactive" },
        ];

        setFields(fetchedFields);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch country data.");
        setLoading(false);
        toast.error(err.message || "Failed to fetch country data.");
      }
    };

    fetchCountryData();
  }, [countryId]);

  const buttons = [
    { label: "Download PDF", color: "blue" },
    { label: "Submit", color: "purple" },
    { label: "Back", color: "gray", route: "/country" },
  ];

  const title = "Country Details"; 

  return (
    <div>
      <Header />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error-message">{`Error: ${error}`}</div>
      ) : (
        <ViewComponent title={title} fields={fields} buttons={buttons} />
      )}
      <ToastContainer />
    </div>
  );
}

export default ViewCountry;
