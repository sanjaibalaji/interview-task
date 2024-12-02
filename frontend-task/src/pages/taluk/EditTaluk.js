// ExampleUsage.jsx
import React from "react";
import AddComponent from "../../components/AddComponent";
import Header from "../../components/Header"


const AddTaluk = () => {
  const fields = [
    {
        id: "region",
        label: "Country",
        type: "dropdown",
        options: [
          { value: "", label: "Select Country" },
          { value: "asia", label: "Asia" },
          { value: "europe", label: "Europe" },
          { value: "america", label: "America" },
        ],
      },
      {
        id: "region",
        label: "State",
        type: "dropdown",
        options: [
          { value: "", label: "Select State" },
          { value: "asia", label: "Asia" },
          { value: "europe", label: "Europe" },
          { value: "america", label: "America" },
        ],
      },
      {
        id: "region",
        label: "District",
        type: "dropdown",
        options: [
          { value: "", label: "Select District" },
          { value: "asia", label: "Asia" },
          { value: "europe", label: "Europe" },
          { value: "america", label: "America" },
        ],
      },
    { id: "name", label: "Name", placeholder: "Name", required: true },
    { id: "altName", label: "Alt Name", placeholder: "Alt Name" },
    // { id: "code", label: "Code", placeholder: "Code" },
    { id: "status", label: "Status", type: "checkbox" },
  ];

  const buttons = [

    {
      label: "Submit",
      className: "bg-green-600 hover:bg-green-700",
      onClick: () => console.log("Submit clicked!"),
    },
    {
      label: "Back",
      className: "bg-red-600 hover:bg-red-700 mr-5",
      onClick: () => console.log("Back clicked!"),
      style: { marginRight: "20px" },
      route: "/taluk"
      
      
    },
  ];
  return (
    <div>
      <Header />
      <AddComponent title="Edit Taluk" fields={fields} buttons={buttons} />;
    </div>
  );
 
};

export default AddTaluk;
