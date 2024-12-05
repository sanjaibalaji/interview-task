import React, { useEffect, useState } from "react";
import { getCountryList, deleteCountry } from "../../api/Auth"; 
import Table from "../../components/Table";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ConfirmDeleteToast = ({ onConfirm, onCancel }) => ( 
<div> 
  <p>Are you sure you want to delete this country?</p> 
  <button onClick={onConfirm} 
  className="bg-green-500 text-white p-1 rounded">Yes</button>
   <button onClick={onCancel} 
   className="bg-red-500 text-white p-1 rounded ml-2">No</button> 
   </div> 
   );

function CountryListPage() {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true); 
      try {
        const data = await getCountryList();
        console.log("API Response:", data); 

        
        if (Array.isArray(data)) {
          const transformedData = data.map((item, index) => ({
            id: index + 1, 
            country: item.c_name,
            altName: item.c_alt,
            code: item.c_code,
            status: item.c_status ? "Active" : "Inactive",
            actions: item._id 
          }));
          setCountryData(transformedData);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        setError(err.message); 
        console.error("Error fetching country data:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchCountryData();
  }, []);

  const handleDelete = async (countryId) => { 
    try 
    { 
      await deleteCountry(countryId);
       toast.success("Country deleted successfully!");
        setCountryData((prevData) => prevData.filter((item) => item.actions !== countryId));
       } catch (error) { 
        toast.error(error.message || "Failed to delete country.");
       } 
      };
       const confirmDelete = (countryId) => { 
        const handleConfirm = () => { toast.dismiss(); 
          handleDelete(countryId); };
           const handleCancel = () => { toast.dismiss(); };
            toast( <ConfirmDeleteToast onConfirm={handleConfirm} onCancel={handleCancel} />,
               { closeOnClick: false, autoClose: false, }
               );
               };
  const routes = {
    add: `/addcountry`,
    edit: (countryId) => `/editcountry/${countryId}`,
    view: (countryId) => `/viewcountry/${countryId}`,
    delete: confirmDelete,
    confirm: (id) => `/confirmcountry/${id}`,
  };

  const columns = ["S.No", "Country", "Alt Name", "Code", "Status", "Actions"];

  return (
    <div>
      <Header />
      
        <Table
          title="Country Master"
          tableData={countryData} 
          columns={columns}
          routes={routes}
          loading={loading}
                error={error}


        />
      
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default CountryListPage;
