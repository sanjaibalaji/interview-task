import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "http://localhost:5000";


const isTokenValid = (token) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
};

const getAuthHeaders = () => {
    const token = getAuthToken();
    if (!isTokenValid(token)) {
        throw new Error("Authentication error: Token is invalid or expired. Please log in.");
    }
    console.log("Token included in headers:", token);
    return {
        Authorization: `Bearer ${token}`,
    };
};

const getAuthToken = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log("Auth data from localStorage:", auth);
    return auth ? auth.token : null;
};


export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/login`,
            { email, password },
            { withCredentials: true }
        );

        localStorage.setItem(
            "auth",
            JSON.stringify({
                user: response.data.user,
                token: response.data.token,
            })
        );
        console.log("token stored:", response.data.token);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
};


export const getCountryList = async () => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/getallcountry`,
            {},
            {
                headers: getAuthHeaders(),
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("API Error:", error.response.data);
            throw new Error(error.response.data.message || "Failed to fetch country list.");
        }
        console.error("Unexpected Error:", error.message);
        throw new Error("Network Error: Unable to reach the server.");
    }
};


export const createCountry = async (countryData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/createcountry`,
            countryData,
            {
                headers: getAuthHeaders(),
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("API Error:", error.response.data);
            throw new Error(error.response.data.message || "Failed to create country.");
        }
        console.error("Unexpected Error:", error.message);
        throw new Error("Network Error: Unable to reach the server.");
    }
};

export const getCountryById = async (countryId) => {
   try
    { 
      const response = await axios.post(`${API_BASE_URL}/getcountrybyid/${countryId}`, {},
         { 
        headers: getAuthHeaders(), });
        console.log("get country api response:",response)
         return response; 
        } catch (error) { 
          throw error.response ? error.response.data : new Error("Network Error"); 
        } 
      };  
      
export const updateCountry = async (countryId, updates) => { 
        try
         { 
          const response = await axios.post(`${API_BASE_URL}/updatecountry/${countryId}`, updates, {
             headers: getAuthHeaders(), });
             console.log("get country api2 response:",response)
              return response; 
            } catch (error) { 
              throw error.response ? error.response.data : new Error("Network Error"); 
            } 
          };

export const deleteCountry = async (countryId) => {
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/deletecountry/${countryId}`,
                    {},
                    {
                        headers: getAuthHeaders(),
                        withCredentials: true,
                    }
                );
                return response.data;
            } catch (error) {
                if (error.response) {
                    console.error("API Error:", error.response.data);
                    throw new Error(error.response.data.message || "Failed to delete country.");
                }
                console.error("Unexpected Error:", error.message);
                throw new Error("Network Error: Unable to reach the server.");
            }
        };
export const getStateList = async () => { 
          try 
          { 
            const response = await axios.post( `${API_BASE_URL}/getallstate`, {}, { 
              headers: getAuthHeaders(),
               withCredentials: true,
               } );
                return response.data; 
              } catch (error) {
                 if (error.response) {
                   console.error("API Error:", error.response.data);
                    throw new Error(error.response.data.message || "Failed to fetch state list."); }
                     console.error("Unexpected Error:", error.message);
                      throw new Error("Network Error: Unable to reach the server.");
                     } };       
                     export const createState = async (countryId, stateData) => {
                      try {
                          const response = await axios.post(
                              `${API_BASE_URL}/createstate/${countryId}`,
                              stateData,
                              {
                                  headers: getAuthHeaders(),
                                  withCredentials: true,
                              }
                          );
                          return response.data;
                      } catch (error) {
                          if (error.response) {
                              console.error("API Error:", error.response.data);
                              throw new Error(error.response.data.message || "Failed to create state.");
                          }
                          console.error("Unexpected Error:", error.message);
                          throw new Error("Network Error: Unable to reach the server.");
                      }
                  };
                  export const updateState = async (stateId, stateData) => {
                    try {
                        const response = await axios.post(
                            `${API_BASE_URL}/updatestate/${stateId}`,
                            stateData,
                            {
                                headers: getAuthHeaders(),
                                withCredentials: true,
                            }
                        );
                        return response.data;
                    } catch (error) {
                        if (error.response) {
                            console.error("API Error:", error.response.data);
                            throw new Error(error.response.data.message || "Failed to update state.");
                        }
                        console.error("Unexpected Error:", error.message);
                        throw new Error("Network Error: Unable to reach the server.");
                    }
                };
                export const getStateById = async (stateId) => {
                  try {
                      const response = await axios.post(
                          `${API_BASE_URL}/getstatebyid/${stateId}`,
                          {},
                          {
                              headers: getAuthHeaders(),
                              withCredentials: true,
                          }
                      );
                      return response.data.state; 
                  } catch (error) {
                      if (error.response) {
                          console.error("API Error:", error.response.data);
                          throw new Error(error.response.data.message || "Failed to fetch state.");
                      }
                      console.error("Unexpected Error:", error.message);
                      throw new Error("Network Error: Unable to reach the server.");
                  }
              };

              export const getstatebycountryid = async (countryId) => {
                try {
                    console.log(`API Call: Fetching states for country ID: ${countryId}`); 
                    const response = await axios.post(
                        `${API_BASE_URL}/getstatebycountryid/${countryId}`,
                        {}, 
                        {
                            headers: getAuthHeaders(),
                            withCredentials: true,
                        }
                    );
                    console.log("API Response:", response.data.states); 
                    return response.data.states;
                } catch (error) {
                    console.error("API Error:", error.response ? error.response.data : error.message);
                    throw new Error(error.response ? error.response.data.message : "Failed to fetch states.");
                }
            };
            
            

              export const deleteStateById = async (stateId) => {
                try {
                    const response = await axios.post(
                        `${API_BASE_URL}/deletestate/${stateId}`,
                        {},
                        {
                            headers: getAuthHeaders(),
                            withCredentials: true,
                        }
                    );
                    return response.data;
                } catch (error) {
                    if (error.response) {
                        console.error("API Error:", error.response.data);
                        throw new Error(error.response.data.message || "Failed to delete state.");
                    }
                    console.error("Unexpected Error:", error.message);
                    throw new Error("Network Error: Unable to reach the server.");
                }
            };
            
            export const getAllDistricts = async () => {
              try {
                  const response = await axios.post(
                      `${API_BASE_URL}/getalldistrict`,
                      {},
                      {
                          headers: getAuthHeaders(),
                          withCredentials: true,
                      }
                  );
                  return response.data.districts;
              } catch (error) {
                  if (error.response) {
                      console.error("API Error:", error.response.data);
                      throw new Error(error.response.data.message || "Failed to fetch districts.");
                  }
                  console.error("Unexpected Error:", error.message);
                  throw new Error("Network Error: Unable to reach the server.");
              }
          };
          export const createDistrict = async (countryId, stateId, districtData) => {
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/createdistrict/${countryId}/${stateId}`,
                    districtData,
                    {
                        headers: getAuthHeaders(),
                        withCredentials: true,
                    }
                );
                return response.data;
            } catch (error) {
                if (error.response) {
                    console.error("API Error:", error.response.data);
                    throw new Error(error.response.data.message || "Failed to create district.");
                }
                console.error("Unexpected Error:", error.message);
                throw new Error("Network Error: Unable to reach the server.");
            }
        };
        
                
        

        
        export const getDistrictById = async (districtId) => {
          try {
              const response = await axios.post(
                  `${API_BASE_URL}/getdistrictbyid/${districtId}`,
                  {},
                  {
                      headers: getAuthHeaders(),
                      withCredentials: true,
                  }
              );
              return response.data.district; 
          } catch (error) {
              if (error.response) {
                  console.error("API Error:", error.response.data);
                  throw new Error(error.response.data.message || "Failed to fetch state.");
              }
              console.error("Unexpected Error:", error.message);
              throw new Error("Network Error: Unable to reach the server.");
          }
      };

      export const updateDistrict = async (districtId, districtData) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/updatedistrict/${districtId}`,
                districtData,
                {
                    headers: getAuthHeaders(),
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("API Error:", error.response.data);
                throw new Error(error.response.data.message || "Failed to update district.");
            }
            console.error("Unexpected Error:", error.message);
            throw new Error("Network Error: Unable to reach the server.");
        }
    };

    export const deleteDistrict = async (districtId) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/deletedistrict/${districtId}`,
                {},
                {
                    headers: getAuthHeaders(),
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("API Error:", error.response.data);
                throw new Error(error.response.data.message || "Failed to delete country.");
            }
            console.error("Unexpected Error:", error.message);
            throw new Error("Network Error: Unable to reach the server.");
        }
    };


export const getAllTaluks = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/getalltaluk`, {}, {
            headers: getAuthHeaders(),
            withCredentials: true,
        });
        return response.data.taluks;
    } catch (error) {
        if (error.response) {
            console.error("API Error:", error.response.data);
            throw new Error(error.response.data.message || "Failed to fetch taluks.");
        }
        console.error("Unexpected Error:", error.message);
        throw new Error("Network Error: Unable to reach the server.");
    }
};

export const deleteTaluk = async (talukId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/deletetaluk/${talukId}`,
            {},
            {
                headers: getAuthHeaders(),
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("API Error:", error.response.data);
            throw new Error(error.response.data.message || "Failed to delete Taluk.");
        }
        console.error("Unexpected Error:", error.message);
        throw new Error("Network Error: Unable to reach the server.");
    }
};


export const createTaluk = async (countryId, stateId, districtId, talukData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/createtaluk/${countryId}/${stateId}/${districtId}`,
            talukData,
            {
                headers: getAuthHeaders(),
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("API Error:", error.response.data);
            throw new Error(error.response.data.message || "Failed to create district.");
        }
        console.error("Unexpected Error:", error.message);
        throw new Error("Network Error: Unable to reach the server.");
    }
};


export const getDistrictbystateid = async (stateId) => {
    try {
        console.log(`API Call: Fetching states for state ID: ${stateId}`); 
        const response = await axios.post(
            `${API_BASE_URL}/getdistrictbystate/${stateId}`,
            {}, 
            {
                headers: getAuthHeaders(),
                withCredentials: true,
            }
        );
        console.log("API Response:", response.data.districts); 
        return response.data.districts; 
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : "Failed to fetch states.");
    }
};



export const updateTaluk = async (talukId, talukData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/updatetaluk/${talukId}`,
            talukData,
            {
                headers: getAuthHeaders(),
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to update taluk.");
    }
};



export const getTalukById = async (talukId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/gettalukbyid/${talukId}`, 
            {}, 
            {
                headers: getAuthHeaders(), 
                withCredentials: true, 
            }
        );
        console.log("API response for getTalukById:", response.data); 
        return response.data;
    } catch (error) {
        console.error("Full API Error:", error); 
        throw new Error(error.response?.data?.message || "Failed to fetch taluk.");
    }
};