import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";

// Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`, 
      { email, password },
      { withCredentials: true } // Make sure cookies are sent with the request
    );
    
    // Save the token and user data in localStorage under the correct key
    localStorage.setItem("auth", JSON.stringify({
      user: response.data.user,
      token: response.data.token
    }));
    
    return response.data; // Return the response data (message, user, token)
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// Get Country List API
export const getCountryList = async () => {
  console.log("function called");

  try {
    // Retrieve the token from localStorage
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth ? auth.token : null;
    console.log("JWT TOKEN:", token); // Check if token is retrieved correctly

    // Check if the token is available, if not throw an error
    if (!token) {
      console.log("No token found");
      throw new Error("Authentication error: Token not found. Please log in.");
    }

    // Make the API call to fetch the country list (using GET instead of POST)
    const response = await axios.post(`${API_BASE_URL}/getallcountry`,{}, {
      header: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
      withCredentials: true, // Include cookies if necessary
    });

    console.log("API Response:", response.data); // Log API response for debugging
    return response.data; // Return the fetched country data

  } catch (error) {
    // Log error details to debug
    if (error.response) {
      console.log("API error:", error.response);
      const errorMessage = error.response.data?.message || "Failed to fetch country list.";
      console.error("API Error:", errorMessage);
      throw new Error(errorMessage);
    }
    console.error("Unexpected Error:", error.message);
    throw new Error("Network Error: Unable to reach the server. Please try again later.");
  }
};
