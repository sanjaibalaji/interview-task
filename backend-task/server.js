const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const connectDB = require ("./config/db")
const cors = require('cors')

dotenv.config();


const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Allowed origin (Frontend URL)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies to be included in the requests
};

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true // Allow cookies and headers
  }));

  app.use(cors(corsOptions));
app.use(express.json());


app.use("/", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB(); 
});
