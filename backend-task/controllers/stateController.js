const Country = require("../models/Country");
const State = require("../models/State");

exports.createState = async (req, res) => {
    try {
        const { countryId } = req.params; 
        const { s_name,s_alt,s_code,s_status } = req.body;
        const country = await Country.findById(countryId);
        if (!country) {
            return res.status(404).json({ message: "Country not found." });
        }
         
        const existingState = await State.findOne({$or: [{s_name, country: countryId},{s_code, country:countryId}] });
        if (existingState) {
            return res.status(400).json({ message: "State or code already exists in this country." });
        }

        const state = await State.create({ s_name,s_alt,s_code,s_status, country: countryId });

        res.status(201).json({
            message: "State created successfully.",
            state,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.getStateById = async (req, res) => {
    try {
        const { stateId } = req.params; // Extract countryId from the request parameters

        const state = await State.findById(stateId);

        if (!state) {
            return res.status(404).json({ message: "Country not found." });
        }

        res.status(200).json({
            message: "Country fetched successfully.",
            state,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};




exports.getAllStates = async (req, res) => {
    try {
       
        const states = await State.find()
            .populate("country", "c_name")
            .exec();

        res.status(200).json({
            message: "States fetched successfully.",
            states,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.getStateById = async (req, res) => {
    try {
        const { stateId } = req.params; // Extract stateId from the request parameters

        // Find the state by ID and populate the related country field
        const state = await State.findById(stateId)
            .populate("country", "c_name") // Populate country name only
            .exec();

        if (!state) {
            return res.status(404).json({ message: "State not found." });
        }

        res.status(200).json({
            message: "State fetched successfully.",
            state,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.updateStatesById = async (req, res) => {
    try {
   
        const { stateId } = req.params;

   
        const updates = req.body;

        
        const updatedState = await State.findByIdAndUpdate(stateId, updates, { 
            new: true, 
            runValidators: true 
        });

      
        if (!updatedState) {
            return res.status(404).json({ message: "State not found." });
        }

        res.status(200).json({
            message: "State updated successfully.",
            country: updatedState,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};
exports.deleteStateById = async (req, res) => {
    try {
        // Extract country ID from the request parameters
        const { stateId } = req.params;

        // Find and delete the country
        const deletedState = await State.findByIdAndDelete(stateId);

        // If the country does not exist
        if (!deletedState) {
            return res.status(404).json({ message: "State not found." });
        }

        res.status(200).json({
            message: "State deleted successfully.",
            state: deletedState, // Optionally return the deleted document
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};