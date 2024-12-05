import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddComponent from "../../components/AddComponent";
import Header from "../../components/Header";
import { getCountryList, getstatebycountryid, getDistrictById, updateDistrict } from "../../api/Auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditDistrict = () => {
  const { districtId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    name: "",
    altName: "",
    code: "",
    status: false,
  });
  const [countries, setCountries] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const countryData = await getCountryList();
        const countryOptions = countryData.map((country) => ({
          value: country._id,
          label: country.c_name,
        }));
        setCountries([{ value: "", label: "Select Country" }, ...countryOptions]);
        toast.success("Fetched country list successfully.");

        if (districtId) {
          const district = await getDistrictById(districtId);
          if (district && district.country && district.state) {
            const countryId = district.country._id || district.country;
            const stateId = district.state._id || district.state;

            setFormData({
              country: countryId,
              state: stateId,
              name: district.d_name || "",
              altName: district.d_alt || "",
              code: district.d_code || "",
              status: district.d_status || false,
            });

          
            const stateData = await getstatebycountryid(countryId);
            const stateOptions = stateData.map((state) => ({
              value: state._id,
              label: state.s_name,
            }));
            setStateOptions([{ value: "", label: "Select State" }, ...stateOptions]);

           
            setFormData((prevData) => ({
              ...prevData,
              state: stateId,
            }));
            toast.success("Fetched district details successfully.");
          }
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching initial data:", err);
        setLoading(false);
        toast.error(err.message || "Failed to fetch initial data.");
      }
    };

    fetchInitialData();
  }, [districtId]);

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country: countryId,
      state: "", 
    }));

    try {
      const stateData = await getstatebycountryid(countryId);
      const options = stateData.map((state) => ({
        value: state._id,
        label: state.s_name,
      }));
      setStateOptions([{ value: "", label: "Select State" }, ...options]);
      toast.success("Fetched states successfully.");
    } catch (err) {
      setError(err.message);
      console.error("Error fetching states:", err);
      toast.error(err.message || "Failed to fetch states.");
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const updates = { 
        country: formData.country,
        state: formData.state,
        d_name: formData.name,
        d_alt: formData.altName,
        d_code: formData.code,
        d_status: formData.status
      };
      const response = await updateDistrict(districtId, updates);
      toast.success(response.message || "District updated successfully!");
      navigate("/district");
    } catch (error) {
      console.error("Error updating district:", error);
      toast.error(error.message || "Failed to update district.");
    }
  };

  const fields = [
    {
      id: "country",
      label: "Country",
      type: "dropdown",
      options: countries,
      onChange: handleCountryChange,
      value: formData.country,
    },
    {
      id: "state",
      label: "State",
      type: "dropdown",
      options: stateOptions,
      disabled: !formData.country,
      value: formData.state,
    },
    { id: "name", label: "Name", placeholder: "Name", required: true, value: formData.name, onChange: handleChange },
    { id: "altName", label: "Alt Name", placeholder: "Alt Name", value: formData.altName, onChange: handleChange },
    { id: "code", label: "Code", placeholder: "Code", value: formData.code, onChange: handleChange },
    { id: "status", label: "Status", type: "checkbox", checked: formData.status, onChange: handleChange },
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
      onClick: () => navigate("/district"),
      style: { marginRight: "20px" },
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{`Error: ${error}`}</div>;

  return (
    <div>
      <Header />
      <AddComponent 
        title="Edit District" 
        fields={fields} 
        formData={formData} 
        handleChange={handleChange}
        buttons={buttons} 
      />
      <ToastContainer />
    </div>
  );
};

export default EditDistrict;
