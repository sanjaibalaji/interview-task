const Country = require("../models/Country");
const State = require("../models/State");
const District = require("../models/District");

exports.createDistrict = async (req, res) => {
    try {
        const { countryId, stateId } = req.params; // Extract countryId and stateId from params
        const { d_name, d_code, d_alt, d_status } = req.body;

        // Validate if the country exists
        const country = await Country.findById(countryId);
        if (!country) {
            return res.status(404).json({ message: "Country not found." });
        }

        // Validate if the state exists and belongs to the given country
        const state = await State.findOne({ _id: stateId, country: countryId });
        if (!state) {
            return res.status(404).json({ message: "State not found for the given country." });
        }

        const existingDistrict = await District.findOne({$or: [{d_name, state: stateId},{d_code, state:stateId}] });
        if (existingDistrict) {
            return res.status(400).json({ message: "District or code already exists in this country." });
        }

        // Create the district
        const district = await District.create({
            d_name,
            d_code,
            d_alt,
            d_status,
            state: stateId,
            country: countryId,
        });

        res.status(201).json({
            message: "District created successfully.",
            district,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.getDistrictById = async (req, res) => {
    try {
        const { districtId } = req.params; // Extract stateId from the request parameters

        // Find the state by ID and populate the related country field
        const district = await District.findById(districtId)
            .populate("country", "c_name") // Populate country name only
            .exec();

        if (!district) {
            return res.status(404).json({ message: "District not found." });
        }

        res.status(200).json({
            message: "District fetched successfully.",
            district,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.getAllDistricts = async (req, res) => {
    try {
        // Find all districts and populate the related state and country fields
        const districts = await District.find()
            .populate({
                path: "state", // Populate state details
                select: "s_name", // Only fetch the state name
                populate: {
                    path: "country", // Populate the country details within state
                    select: "c_name", // Only fetch the country name
                },
            })
            .exec();

        res.status(200).json({
            message: "Districts fetched successfully.",
            districts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.getDistrictById = async (req, res) => {
    try {
        const { districtId } = req.params; // Extract districtId from the request parameters

        // Find the district by ID and populate state and country details
        const district = await District.findById(districtId)
            .populate({
                path: "state", // Populate state details
                select: "s_name", // Only fetch the state name
                populate: {
                    path: "country", // Populate the country details within state
                    select: "c_name", // Only fetch the country name
                },
            })
            .exec();

        if (!district) {
            return res.status(404).json({ message: "District not found." });
        }

        res.status(200).json({
            message: "District fetched successfully.",
            district,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};


exports.updateDistrictById = async (req, res) => {
    try {
   
        const { districtId } = req.params;

   
        const updates = req.body;

        
        const updatedDistrict = await District.findByIdAndUpdate(districtId, updates, { 
            new: true, 
            runValidators: true 
        });

      
        if (!updatedDistrict) {
            return res.status(404).json({ message: "District not found." });
        }

        res.status(200).json({
            message: "District updated successfully.",
            country: updatedDistrict,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.deleteDistrictById = async (req, res) => {
    try {
        // Extract country ID from the request parameters
        const { districtId } = req.params;

        // Find and delete the country
        const deletedDistrict = await District.findByIdAndDelete(districtId);

        // If the country does not exist
        if (!deletedDistrict) {
            return res.status(404).json({ message: "District not found." });
        }

        res.status(200).json({
            message: "District deleted successfully.",
            state: deletedDistrict, // Optionally return the deleted document
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};
