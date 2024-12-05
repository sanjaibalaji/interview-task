import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { getCountryList, getstatebycountryid, createTaluk, getDistrictbystateid } from "../../api/Auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddDistrict = () => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    district: "",
    name: "",
    altName: "",
    code: "",
    status: false,
  });
  const [countries, setCountries] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions,setDistrictOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        console.log("Fetching countries...");
        const countryData = await getCountryList();
        const countryOptions = countryData.map((country) => ({
          value: country._id,
          label: country.c_name,
        }));
        setCountries(countryOptions);
        setLoading(false);
        console.log("Fetched countries:", countryOptions);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching countries:", err);
        toast.error(err.message || "Failed to fetch countries.");
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    console.log("Event triggered on country selection");
    const countryId = e.target.value;
    
    setFormData((prevData) => ({
      ...prevData,
      country: countryId,
      state: "", 
    }));

    console.log(`handleCountryChange called with countryId: ${countryId}`);

    try {
      console.log(`API Call: Fetching states for country ID: ${countryId}`);
      const stateData = await getstatebycountryid(countryId);
      console.log("Fetched states:", stateData);
      const options = stateData.map((state) => ({
        value: state._id,
        label: state.s_name,
      }));
      setStateOptions(options);
      console.log("State options set:", options);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching states:", err);
      toast.error(err.message || "Failed to fetch states.");
    }
  };

  const handleStateChange = async (e) => {
    console.log("Event triggered on country selection");
    const stateId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state: stateId,
      district: "", 
    }));

    console.log(`handleCountryChange called with countryId: ${stateId}`);

    try {
      console.log(`API Call: Fetching states for country ID: ${stateId}`);
      const districtData = await getDistrictbystateid(stateId);
      console.log("Fetched states:", districtData);
      const districtOptions = districtData.map((district) => ({
        value: district._id,
        label: district.d_name,
      }));
      setDistrictOptions(districtOptions);
      console.log("State options set:", districtOptions);
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

  const handleSubmit = async (e) => {
     e.preventDefault();
      const { country, state, district, name, altName } = formData;
       const t_status = true;
        try {
           console.log("Submitting taluk data:", { country, state, district, name, altName });
            const response = await createTaluk(country, state, district, {
               t_name: name,
                t_alt: altName,
                 t_status,
                 });
                  console.log("Taluk added successfully. Response:", response);
                   toast.success("Taluk added successfully!");
                    setFormData({ country: "", state: "", district: "", name: "", altName: "", }); 
                  } catch (error) {
                     console.error("Error adding taluk:", error); console.log("Full Error Object:", error); 
                      toast.error(error.message || "Failed to add taluk."); 
                    }
                  }
  const renderFields = () => {
    return [
      {
        id: "country",
        label: "Country",
        type: "dropdown",
        options: countries,
        onChange: handleCountryChange,
      },
      {
        id: "state",
        label: "State",
        type: "dropdown",
        options: stateOptions,
        onChange: handleStateChange,
        disabled: !formData.country,
      },
      {
        id: "district",
        label: "District",
        type: "dropdown",
        options: districtOptions,
        onChange: (e) => {
          console.log("State dropdown changed");
          handleChange(e);
        },
        disabled: !formData.country,
      },
      { id: "name", label: "Name", placeholder: "Name", required: true },
      { id: "altName", label: "Alt Name", placeholder: "Alt Name" },
      { id: "status", label: "Status", type: "checkbox" },
    ];
  };

  const renderButtons = () => {
    return [
      {
        label: "Reset",
        className: "bg-gray-600 hover:bg-gray-700",
        onClick: () => setFormData({ country: "", state: "", name: "", altName: "", code: "", status: false }),
      },
      {
        label: "Submit",
        className: "bg-green-600 hover:bg-green-700",
        onClick: handleSubmit,
      },
      {
        label: "Back",
        className: "bg-red-600 hover:bg-red-700",
        onClick: () => window.location.href = "/taluk",
        style: { marginRight: "20px" },
      },
    ];
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{`Error: ${error}`}</div>;

  return (
    <div>
      <Header />
      <div className="bg-white font-body rounded-md">
        <div className="mb-6">
          <h2 className="ml-6 mt-6 mb-6 text-xl font-semibold">Add Taluk</h2>
          <hr className="mt-2 border-gray-300" />
        </div>
        <div className="grid ml-6 grid-cols-4 gap-4 mr-6 items-center mb-6">
          {renderFields().map((field, index) => (
            <div key={index} className="flex flex-col col-span-1">
              <label
                className="text-sm font-medium text-gray-700 mb-1"
                htmlFor={field.id}
              >
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === "checkbox" ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={field.id}
                    checked={formData[field.id] || false}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{field.checkboxLabel || "isActive"}</span>
                </div>
              ) : field.type === "dropdown" ? (
                <select
                  id={field.id}
                  value={formData[field.id] || ""}
                  onChange={field.onChange}
                  className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>Select an option</option>
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  id={field.id}
                  value={formData[field.id] || ""}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={field.disabled || false}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          {renderButtons().map((button, index) => (
            <button
              key={index}
              type={button.type || "button"}
              onClick={button.onClick}
              className={`px-4 py-2 text-white rounded-md ${button.className}`}
              style={button.style}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddDistrict;
