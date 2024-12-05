import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddComponent from "../../components/AddComponent";
import Header from "../../components/Header";
import { getCountryList, getstatebycountryid, getDistrictbystateid, getTalukById, updateTaluk } from "../../api/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTaluk = () => {
  const { talukId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    district: "",
    name: "",
    altName: "",
    status: false,
  });

  const [countries, setCountries] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      console.log("Fetching initial data...");
      try {
       
        const countryData = await getCountryList();
        const countryOptions = countryData.map((country) => ({
          value: country._id,
          label: country.c_name,
        }));
        setCountries([{ value: "", label: "Select Country" }, ...countryOptions]);

        if (talukId) {
     
          const { taluk } = await getTalukById(talukId);
          console.log("Taluk fetched:", taluk);

          
          const countryId = typeof taluk.country === "string" ? taluk.country : taluk.country._id;
          const stateId = typeof taluk.state === "string" ? taluk.state : taluk.state?._id;
          const districtId = typeof taluk.district === "string" ? taluk.district : taluk.district?._id;

          setFormData({
            country: countryId || "",
            state: stateId || "",
            district: districtId || "",
            name: taluk.t_name || "",
            altName: taluk.t_alt || "",
            status: taluk.t_status || false,
          });

         
          if (countryId) {
            const stateData = await getstatebycountryid(countryId);
            const stateOptions = stateData.map((state) => ({
              value: state._id,
              label: state.s_name,
            }));
            setStateOptions([{ value: "", label: "Select State" }, ...stateOptions]);
          }

          if (stateId) {
            const districtData = await getDistrictbystateid(stateId);
            const districtOptions = districtData.map((district) => ({
              value: district._id,
              label: district.d_name,
            }));
            setDistrictOptions([{ value: "", label: "Select District" }, ...districtOptions]);
          }

          toast.success("Fetched taluk details successfully.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError(err.message || "Failed to fetch initial data.");
        setLoading(false);
        toast.error(err.message || "Failed to fetch initial data.");
      }
    };

    fetchInitialData();
  }, [talukId]);

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country: countryId,
      state: "",
      district: "",
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
      console.error("Error fetching states:", err);
      toast.error(err.message || "Failed to fetch states.");
    }
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state: stateId,
      district: "",
    }));

    try {
      const districtData = await getDistrictbystateid(stateId);
      const options = districtData.map((district) => ({
        value: district._id,
        label: district.d_name,
      }));
      setDistrictOptions([{ value: "", label: "Select District" }, ...options]);
      toast.success("Fetched districts successfully.");
    } catch (err) {
      console.error("Error fetching districts:", err);
      toast.error(err.message || "Failed to fetch districts.");
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
        district: formData.district,
        t_name: formData.name,
        t_alt: formData.altName,
        t_status: formData.status,
      };

      const response = await updateTaluk(talukId, updates);
      toast.success(response.message || "Taluk updated successfully!");
      navigate("/taluk");
    } catch (err) {
      console.error("Error updating taluk:", err);
      toast.error(err.message || "Failed to update taluk.");
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
      onChange: handleStateChange,
      value: formData.state,
    },
    {
      id: "district",
      label: "District",
      type: "dropdown",
      options: districtOptions,
      disabled: !formData.state,
      value: formData.district,
      onChange: handleChange,
    },
    { id: "name", label: "Name", placeholder: "Name", required: true, value: formData.name, onChange: handleChange },
    { id: "altName", label: "Alt Name", placeholder: "Alt Name", value: formData.altName, onChange: handleChange },
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
      onClick: () => navigate("/taluk"),
      style: { marginRight: "20px" },
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{`Error: ${error}`}</div>;

  return (
    <div>
      <Header />
      <AddComponent
        title="Edit Taluk"
        fields={fields}
        formData={formData}
        handleChange={handleChange}
        buttons={buttons}
      />
      <ToastContainer />
    </div>
  );
};

export default EditTaluk;
