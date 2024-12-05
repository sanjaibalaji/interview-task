import React, { useState } from "react";
import AddComponent from "../../components/AddComponent";
import Header from "../../components/Header";
import { createCountry } from "../../api/Auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddCountry = () => {
    const [formData, setFormData] = useState({
        c_name: "",
        c_alt: "",
        c_code: "",
        c_status: false,
    });

    const navigate = useNavigate();

    const fields = [
        { id: "c_name", label: "Name", placeholder: "Name", required: true },
        { id: "c_alt", label: "Alt Name", placeholder: "Alt Name" },
        { id: "c_code", label: "Code", placeholder: "Code" },
        { id: "c_status", label: "Status", type: "checkbox" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting form data:", formData);
            const response = await createCountry(formData);
            console.log("Country created successfully:", response);
            toast.success("Country created successfully!");
        } catch (error) {
            console.error("Error creating country:", error);
            toast.error("Error creating country. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleReset = () => {
        setFormData({ c_name: "", c_alt: "", c_code: "", c_status: false });
        toast.info("Form reset successfully.");
    };

    const handleBack = () => {
        navigate("/country");
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <AddComponent
                    title="Add Country"
                    fields={fields}
                    formData={formData}
                    handleChange={handleChange}
                    buttons={[
                        {
                            label: "Reset",
                            className: "bg-gray-600 hover:bg-gray-700",
                            onClick: handleReset,
                        },
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
            <ToastContainer />
        </div>
    );
};

export default AddCountry;
