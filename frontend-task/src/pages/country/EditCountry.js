import React, { useState, useEffect } from "react";
import AddComponent from "../../components/AddComponent";
import Header from "../../components/Header";
import { updateCountry, getCountryById } from "../../api/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditCountry = () => {
    const [formData, setFormData] = useState({
        country: "",
        altName: "",
        code: "",
        status: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { countryId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                setLoading(true);
                const response = await getCountryById(countryId);
                const countryData = response.data.country;

                const { c_name, c_alt, c_code, c_status } = countryData;

                const updatedFormData = {
                    country: c_name || "",
                    altName: c_alt || "",
                    code: c_code || "",
                    status: c_status !== undefined ? c_status : false,
                };

                setFormData(updatedFormData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                toast.error("Error fetching country data.");
            }
        };

        fetchCountry();
    }, [countryId]);

    const fields = [
        { id: "country", label: "Country", placeholder: "Country", required: true },
        { id: "altName", label: "Alt Name", placeholder: "Alt Name" },
        { id: "code", label: "Code", placeholder: "Code" },
        { id: "status", label: "Status", type: "checkbox" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.country) {
            toast.error("Country is required!");
            return;
        }

        try {
            const response = await updateCountry(countryId, {
                c_name: formData.country,
                c_alt: formData.altName,
                c_code: formData.code,
                c_status: formData.status,
            });

            if (response.status === 200) {
                toast.success("Country data updated successfully!");
                setTimeout(() => navigate("/country"), 2000);
            } else {
                toast.error("Unexpected server response. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error("Country or code already exists.");
                } else if (error.response.status === 404) {
                    toast.error("Country not found.");
                } else if (error.response.status === 500) {
                    toast.error("Server error. Please try again.");
                } else {
                    toast.error("Unexpected server response. Please try again.");
                }
            } else {
                toast.error("Network error. Please check your connection.");
            }
        }
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleBack = () => {
        navigate("/country");
    };

    return (
        <div>
            <Header />
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <AddComponent
                        title="Edit Country"
                        fields={fields}
                        formData={formData}
                        handleChange={handleChange}
                        buttons={[
                            {
                                label: "Submit",
                                className: "bg-green-600 hover:bg-green-700",
                                type: "submit",
                            },
                            {
                                label: "Back",
                                className: "bg-red-600 hover:bg-red-700",
                                onClick: handleBack,
                                style: { marginRight: "20px" },
                            },
                        ]}
                    />
                </form>
            )}
            <ToastContainer />
        </div>
    );
};

export default EditCountry;
