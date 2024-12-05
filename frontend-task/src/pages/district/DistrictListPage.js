import React, { useEffect, useState } from "react";
import Header from '../../components/Header';
import Table from '../../components/Table';
import Footer from '../../components/Footer';
import { getAllDistricts, deleteDistrict } from "../../api/Auth"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ConfirmDeleteToast = ({ onConfirm, onCancel }) => ( 
  <div> 
    <p>Are you sure you want to delete this district?</p> 
    <button onClick={onConfirm} 
    className="bg-green-500 text-white p-1 rounded">Yes</button>
     <button onClick={onCancel} 
     className="bg-red-500 text-white p-1 rounded ml-2">No</button> 
     </div> 
     );

function DistrictListPage() {
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistrictData = async () => {
      setLoading(true);
      try {
        const data = await getAllDistricts();
        console.log("API Response:", data); 

        
        if (Array.isArray(data)) {
          const transformedData = data.map((item, index) => ({
            id: index + 1, 
            country: item?.state?.country?.c_name || 'Unknown Country',
            state: item?.state?.s_name || 'Unknown State',
            district: item.d_name,
            altName: item.d_alt,
            code: item.d_code,
            status: item.d_status ? "Active" : "Inactive",
            actions: item._id 
          }));
          setDistrictData(transformedData);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        setError(err.message); 
        console.error("Error fetching district data:", err);
        toast.error(err.message || "Failed to fetch district data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchDistrictData();
  }, []);

  const handleDelete = async (districtId) => { 
    try 
    { 
      await deleteDistrict(districtId);
       toast.success("District deleted successfully!");
        setDistrictData((prevData) => prevData.filter((item) => item.actions !== districtId));
       } catch (error) { 
        toast.error(error.message || "Failed to delete district.");
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
    add: `/adddistrict`,
    edit: (id) => `/editdistrict/${id}`,
    view: (id) => `/viewdistrict/${id}`,
    delete: confirmDelete,
    confirm: (id) => `/confirmdistrict/${id}`,
  };

  const columns = ["S.No", "Country", "State", "District", "Alt Name", "Code", "Status", "Actions"];

  console.log("District Data:", districtData); 

  return (
    <div>
      <Header />
      <Table
        title="District Master"
        tableData={districtData} 
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

export default DistrictListPage;
