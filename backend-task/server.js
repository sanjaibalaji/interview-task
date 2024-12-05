const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const connectDB = require ("./config/db")
const cors = require('cors')
const bodyParser = require('body-parser');
 


dotenv.config();


const app = express();
const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true, 
  allowedHeaders: ["Authorization", "Content-Type"], 
  methods: ["GET", "POST", "PUT", "DELETE"], 
};

app.use(bodyParser.json());
  app.use(cors(corsOptions));
  app.use(express.json());


app.use("/", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB(); 
});
