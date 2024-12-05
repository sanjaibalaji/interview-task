import React, { useState, useEffect } from "react";
import ViewComponent from "../../components/ViewComponent";
import Header from "../../components/Header";
import { getStateById } from "../../api/Auth";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ViewState() {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStateData = async () => {
      setLoading(true);
      try {
        const data = await getStateById(stateId);
        console.log("API Response:", data);
        setStateData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching state data:", err);
        toast.error(err.message || "Failed to fetch state data.");
        setLoading(false);
      }
    };

    fetchStateData();
  }, [stateId]);

  const fields = stateData ? [
    { label: "Country", value: stateData.country.c_name },
    { label: "Name", value: stateData.s_name },
    { label: "Alt Name", value: stateData.s_alt },
    { label: "Code", value: stateData.s_code },
    { label: "Status", value: stateData.s_status ? "Active" : "Inactive", status: stateData.s_status ? "Active" : "Inactive" },
  ] : [];

  const buttons = [
    { label: "Download PDF", color: "blue" },
    { label: "Submit", color: "purple" },
    { label: "Back", color: "gray", route: "/state" },
  ];

  const title = "State Details";

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{`Error: ${error}`}</div>;

  return (
    <div>
      <Header />
      <ViewComponent title={title} fields={fields} buttons={buttons} />
      <ToastContainer />
    </div>
  );
}

export default ViewState;
