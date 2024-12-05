import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTalukById } from "../../api/Auth";
import ViewComponent from "../../components/ViewComponent";
import Header from "../../components/Header";

function ViewTaluk() {
  const { talukId } = useParams(); 
  const [talukData, setTalukData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTalukData = async () => {
      try {
        const data = await getTalukById(talukId);
        setTalukData(data.taluk);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTalukData();
  }, [talukId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const fields = [
    { label: "Country", value: talukData?.district?.state?.country?.c_name || "N/A" },
    { label: "State", value: talukData?.district?.state?.s_name || "N/A" },
    { label: "District", value: talukData?.district?.d_name || "N/A" },
    { label: "Name", value: talukData?.t_name || "N/A" },
    { label: "Alt Name", value: talukData?.t_alt || "N/A" },
    { label: "Status", value: talukData.t_status ? "Active" : "Inactive", status: talukData.t_status ? "Active" : "Inactive" },
  ];

  const buttons = [
    { label: "Download PDF", color: "blue" },
    { label: "Submit", color: "purple" },
    { label: "Back", color: "gray", route: "/taluk" },
  ];

  const title = "Taluk Details";

  return (
    <div>
      <Header />
      <ViewComponent title={title} fields={fields} buttons={buttons} />
    </div>
  );
}

export default ViewTaluk;
