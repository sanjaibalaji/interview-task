import React from "react";
import ViewComponent from "../../components/ViewComponent";
import Header from "../../components/Header";

function ViewDistrict() {
  const fields = [
    { label: "Country", value: "India" },
    { label: "State", value: "IND" },
    { label: "Name", value: "India" },
    { label: "Alt Name", value: "IND" },
    { label: "Code", value: "356" },
    { label: "Status", value: "Active", status: "Active" },
  ];

  const buttons = [
    { label: "Download PDF", color: "blue" },
    { label: "Submit", color: "purple" },
    { label: "Back", color: "gray", route: "/district" },
  ];
   
  const title = "District Details"

  return (
    <div>
         <Header />
      <ViewComponent title={title} fields={fields} buttons={buttons} />
    </div>
  );
}

export default ViewDistrict;
