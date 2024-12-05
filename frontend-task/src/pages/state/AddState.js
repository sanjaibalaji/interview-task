import React, { useState, useEffect } from "react";
import AddComponent from "../../components/AddComponent";
import Header from "../../components/Header";
import { getCountryList, createState } from "../../api/Auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddState = () => {
  const [formData, setFormData] = useState({
    country: "",
    name: "",
    altName: "",
    code: "",
    status: false,
  });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountryList();
        console.log("API Response:", data);

        if (Array.isArray(data)) {
          const countryOptions = [ ...data.map((country) => ({
            value: country._id,
            label: country.c_name,
          }))];
          setCountries(countryOptions);
        } else {
          throw new Error("Unexpected data format");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching country list:", err);
        setLoading(false);
        toast.error(err.message || "Failed to fetch country list.");
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const fields = [
    {
      id: "country",
      label: "Country",
      type: "dropdown",
      options: countries,
    },
    { id: "name", label: "Name", placeholder: "Name", required: true },
    { id: "altName", label: "Alt Name", placeholder: "Alt Name" },
    { id: "code", label: "Code", placeholder: "Code" },
    { id: "status", label: "Status", type: "checkbox" },
  ];

  const buttons = [
    {
      label: "Reset",
      className: "bg-gray-600 hover:bg-gray-700",
      onClick: () => setFormData({ country: "", name: "", altName: "", code: "", status: false }),
    },
    {
      label: "Submit",
      className: "bg-green-600 hover:bg-green-700",
      onClick: async () => {
        try {
          const { country, name, altName, code, status } = formData;
          if (!country) {
            toast.error("Please select a country.");
            return;
          }
          const stateData = {
            s_name: name,
            s_alt: altName,
            s_code: code,
            s_status: status,
          };
          const response = await createState(country, stateData);
          toast.success(response.message || "State created successfully!");
          setFormData({ country: "", name: "", altName: "", code: "", status: false });
        } catch (error) {
          console.error("Error creating state:", error);
          toast.error(error.message || "Failed to create state.");
        }
      },
    },
    {
      label: "Back",
      className: "bg-red-600 hover:bg-red-700 mr-5",
      onClick: () => window.location.href = "/state",
      style: { marginRight: "20px" },
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{`Error: ${error}`}</div>;

  return (
    <div>
      <Header />
      <AddComponent 
        title="Add State" 
        fields={fields} 
        formData={formData} 
        handleChange={handleChange}
        buttons={buttons} 
      />
      <ToastContainer />
    </div>
  );
};

export default AddState;
