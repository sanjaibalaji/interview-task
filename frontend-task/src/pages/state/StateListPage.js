import React, { useEffect, useState } from "react";
import Header from '../../components/Header';
import Table from '../../components/Table';
import Footer from '../../components/Footer';
import { getStateList,deleteStateById } from "../../api/Auth"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ConfirmDeleteToast = ({ onConfirm, onCancel }) => ( 
  <div> 
    <p>Are you sure you want to delete this State?</p> 
    <button onClick={onConfirm} 
    className="bg-green-500 text-white p-1 rounded">Yes</button>
     <button onClick={onCancel} 
     className="bg-red-500 text-white p-1 rounded ml-2">No</button> 
     </div> 
     );

function StateListPage() {
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStateData = async () => {
      setLoading(true); 
      try {
        const data = await getStateList();
        console.log("API Response:", data); 

        
        if (Array.isArray(data.states)) {
          const transformedData = data.states.map((item, index) => ({
            id: index + 1, 
            country: item.country.c_name,
            state: item.s_name,
            altName: item.s_alt,
            code: item.s_code,
            status: item.s_status ? "Active" : "Inactive",
            actions: item._id 
          }));
          setStateData(transformedData);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        setError(err.message); 
        console.error("Error fetching state data:", err);
        toast.error(err.message || "Failed to fetch state data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchStateData();
  }, []);

  const handleDelete = async (stateId) => { 
    try 
    { 
      await deleteStateById(stateId);
       toast.success("State deleted successfully!");
        setStateData((prevData) => prevData.filter((item) => item.actions !== stateId));
       } catch (error) { 
        toast.error(error.message || "Failed to delete state.");
       } 
      };
       const confirmDelete = (stateId) => { 
        const handleConfirm = () => { toast.dismiss(); 
          handleDelete(stateId); };
           const handleCancel = () => { toast.dismiss(); };
            toast( <ConfirmDeleteToast onConfirm={handleConfirm} onCancel={handleCancel} />,
               { closeOnClick: false, autoClose: false, }
               );
               };

  const routes = {
    add: `/addstate`,
    edit: (id) => `/editstate/${id}`,
    view: (id) => `/viewstate/${id}`,
    delete: confirmDelete,
    confirm: (id) => `/confirmstate/${id}`,
  };

  const columns = ["S.No", "Country", "State", "Alt Name", "Code", "Status", "Actions"];

  console.log("State Data:", stateData); 

  return (
    <div>
      <Header />
      
        <Table
          title="State Master"
          tableData={stateData} 
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

export default StateListPage;
