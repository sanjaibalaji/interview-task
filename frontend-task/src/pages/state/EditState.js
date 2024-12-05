import React, { useState, useEffect } from "react";
import AddComponent from "../../components/AddComponent";
import Header from "../../components/Header";
import { getCountryList, getStateById, updateState } from "../../api/Auth";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditState = () => {
  const { stateId } = useParams();
  const navigate = useNavigate();
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
    const fetchData = async () => {
      try {
        const countryData = await getCountryList();
        const stateData = await getStateById(stateId);
        const countryOptions = countryData.map((country) => ({
          value: country._id,
          label: country.c_name,
        }));

        setCountries(countryOptions);

        if (stateData && stateData.country && stateData.country._id) {
          setFormData({
            country: stateData.country._id,
            name: stateData.s_name,
            altName: stateData.s_alt,
            code: stateData.s_code,
            status: stateData.s_status,
          });
          console.log("statedataaa:",stateData)
        } else {
          console.error("Country data is missing in the state data response");
          toast.error("Failed to fetch country data for the state.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
        toast.error(err.message || "Failed to fetch data.");
      }
    };

    fetchData();
  }, [stateId]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
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
      const response = await updateState(stateId, stateData);
      toast.success(response.message || "State updated successfully!");
      navigate("/state");
    } catch (error) {
      console.error("Error updating state:", error);
      toast.error(error.message || "Failed to update state.");
    }
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
      label: "Submit",
      className: "bg-green-600 hover:bg-green-700",
      onClick: handleSubmit,
    },
    {
      label: "Back",
      className: "bg-red-600 hover:bg-red-700 mr-5",
      onClick: () => navigate("/state"),
      style: { marginRight: "20px" },
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{`Error: ${error}`}</div>;

  return (
    <div>
      <Header />
      <AddComponent 
        title="Edit State" 
        fields={fields} 
        formData={formData} 
        handleChange={handleChange}
        buttons={buttons} 
      />
      <ToastContainer />
    </div>
  );
};

export default EditState;
