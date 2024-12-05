import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDistrictById } from "../../api/Auth";
import ViewComponent from "../../components/ViewComponent";
import Header from "../../components/Header";

function ViewDistrict() {
  const { districtId } = useParams();
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const district = await getDistrictById(districtId);
        console.log("get district",district)
        setDistrictData(district);
      } catch (error) {
        setError(error.message || "Error fetching district data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDistrictData();
  }, [districtId]);

  const fields = districtData ? [
    { label: "Country", value: districtData.state.country.c_name },
    { label: "State", value: districtData.state.s_name },
    { label: "Name", value: districtData.d_name },
    { label: "Alt Name", value: districtData.d_alt },
    { label: "Code", value: districtData.d_code },
    { label: "Status", value: districtData.d_status ? "Active" : "Inactive", status: districtData.d_status ? "Active" : "Inactive" },
  ] : [];

  const buttons = [
    { label: "Download PDF", color: "blue" },
    { label: "Submit", color: "purple" },
    { label: "Back", color: "gray", route: "/district" },
  ];

  const title = "District Details"

  return (
    <div>
      <Header />
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <ViewComponent title={title} fields={fields} buttons={buttons} />}
    </div>
  );
}

export default ViewDistrict;
