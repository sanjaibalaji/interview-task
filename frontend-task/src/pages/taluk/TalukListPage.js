import React, { useState, useEffect } from "react";
import { getAllTaluks, deleteTaluk } from "../../api/Auth"; 
import Header from '../../components/Header';
import Table from '../../components/Table';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ConfirmDeleteToast = ({ onConfirm, onCancel }) => ( 
    <div> 
      <p>Are you sure you want to delete this Taluk?</p> 
      <button onClick={onConfirm} 
      className="bg-green-500 text-white p-1 rounded">Yes</button>
       <button onClick={onCancel} 
       className="bg-red-500 text-white p-1 rounded ml-2">No</button> 
       </div> 
       );

function TalukListPage() {
    const [talukData, setTalukData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTalukData = async () => {
            setLoading(true); 
            try {
                const taluks = await getAllTaluks();
                console.log("Backend Response:", taluks); 

               
                taluks.forEach((taluk, index) => {
                    console.log(`Taluk ${index + 1}:`, taluk);
                });

               
                if (Array.isArray(taluks)) {
                    const formattedData = taluks.map((taluk, index) => ({
                        id: index + 1,
                        country: taluk.district?.state?.country?.c_name || 'Unknown Country',
                        state: taluk.district?.state?.s_name || 'Unknown State',
                        district: taluk.district?.d_name || 'Unknown District',
                        taluk: taluk.t_name || 'Unknown Taluk',
                        altName: taluk.t_alt || 'N/A',
                        status: taluk.t_status ? "Active" : "Inactive",
                        actions: taluk._id, 
                    }));
                    setTalukData(formattedData);
                } else {
                    throw new Error("Unexpected data format");
                }
            } catch (error) {
                setError(error.message || "Error fetching taluk data.");
                console.error("Error fetching taluk data:", error);
                toast.error(error.message || "Failed to fetch taluk data.");
            } finally {
                setLoading(false);
            }
        };
        fetchTalukData();
    }, []);

    const handleDelete = async (talukId) => { 
        try 
        { 
          await deleteTaluk(talukId);
           toast.success("Taluk deleted successfully!");
            setTalukData((prevData) => prevData.filter((item) => item.actions !== talukId));
           } catch (error) { 
            toast.error(error.message || "Failed to delete taluk.");
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
        add: `/addtaluk`,
        edit: (id) => `/edittaluk/${id}`,
        view: (id) => `/viewtaluk/${id}`,
        delete: confirmDelete,
        confirm: (id) => `/confirmtaluk/${id}`,
    };

    const columns = ["S.No", "Country", "State", "District", "Taluk", "Alt Name", "Status", "Actions"];

    return (
        <div>
            <Header />
            
                <Table
                    title="Taluk Master"
                    tableData={talukData}
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

export default TalukListPage;
