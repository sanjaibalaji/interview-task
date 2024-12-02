// ExampleUsage.jsx
import React from "react";
import AddComponent from "../../components/AddComponent";
import Header from "../../components/Header"


const EditCountry = () => {
  const fields = [
    { id: "name", label: "Name", placeholder: "Name", required: true },
    { id: "altName", label: "Alt Name", placeholder: "Alt Name" },
    { id: "code", label: "Code", placeholder: "Code" },
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
      route: "/country"
      
      
    },
  ];
  return (
    <div>
      <Header />
      <AddComponent title="Edit Country" fields={fields} buttons={buttons} />;
    </div>
  );
 
};

export default EditCountry;
