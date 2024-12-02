const Country = require("../models/Country");
const State = require("../models/State");
const District = require("../models/District");
const Taluk = require("../models/Taluk")

exports.createTaluk = async (req, res) => {
    try {
        const { countryId, stateId, districtId } = req.params; // Extract countryId and stateId from params
        const { t_name, t_code, t_alt, t_status } = req.body;
        
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
      
        const district = await District.findOne({ _id: districtId,  country: countryId, state: stateId});
        if (!district) {
           
            return res.status(404).json({ message: "District not found for the given state." });
        }
        
        const existingTaluk = await Taluk.findOne({$or: [{t_name, district: districtId },{t_code, district: districtId }]});
        if (existingTaluk) {
            
            return res.status(400).json({ message: "Taluk or code already exists in this District." });
        }

        // Create the district
        const taluk = await Taluk.create({
            t_name,
            t_code,
            t_alt,
            t_status,
            state: stateId,
            country: countryId,
            district: districtId
        });

        res.status(201).json({
            message: "Taluk created successfully.",
            taluk,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.getTalukById = async (req, res) => {
    try {
        const { talukId } = req.params; // Extract districtId from the request parameters

        // Find the district by ID and populate state and country details
        const taluk = await Taluk.findById(talukId)
            .populate({
                path: "state", // Populate state details
                select: "s_name", // Only fetch the state name
                populate: {
                    path: "country", // Populate the country details within state
                    select: "c_name", // Only fetch the country name
                },
            })
            .exec();

        if (!taluk) {
            return res.status(404).json({ message: "District not found." });
        }

        res.status(200).json({
            message: "District fetched successfully.",
            taluk,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};


exports.getAllTaluks = async (req, res) => {
    try {
        // Find all districts and populate the related state and country fields
        const taluks = await Taluk.find()
            .populate({
                path: "state", // Populate state details
                select: "s_name", // Only fetch the state name
                populate: {
                    path: "country", // Populate the country details within state
                    select: "c_name", // Only fetch the country name
                },
                  populate:{
                    path: "district",
                    select: "d_name"
                  },
            })
            .exec();

        res.status(200).json({
            message: "Taluks fetched successfully.",
            taluks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.getTalukById = async (req, res) => {
    try {
        const { talukId } = req.params; // Extract talukId from the request parameters

        // Find the taluk by ID and populate relationships
        const taluk = await Taluk.findById(talukId)
            .populate({
                path: "district", // Populate district details
                select: "d_name", // Only fetch the district name
                populate: {
                    path: "state", // Populate state details within district
                    select: "s_name", // Only fetch the state name
                    populate: {
                        path: "country", // Populate country details within state
                        select: "c_name", // Only fetch the country name
                    },
                },
            })
            .exec();

        if (!taluk) {
            return res.status(404).json({ message: "Taluk not found." });
        }

        res.status(200).json({
            message: "Taluk fetched successfully.",
            taluk,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};


exports.updateTalukById = async (req, res) => {
    try {
   
        const { talukId } = req.params;

   
        const updates = req.body;

        
        const updatedTaluk = await Taluk.findByIdAndUpdate(talukId, updates, { 
            new: true, 
            runValidators: true 
        });

      
        if (!updatedTaluk) {
            return res.status(404).json({ message: "Taluk not found." });
        }

        res.status(200).json({
            message: "State updated successfully.",
            country: updatedTaluk,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};

exports.deleteTalukById = async (req, res) => {
    try {
        // Extract country ID from the request parameters
        const { talukId } = req.params;

        // Find and delete the country
        const deletedTaluk = await Taluk.findByIdAndDelete(talukId);

        // If the country does not exist
        if (!deletedTaluk) {
            return res.status(404).json({ message: "Taluk not found." });
        }

        res.status(200).json({
            message: "Taluk deleted successfully.",
            state: deletedTaluk, // Optionally return the deleted document
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};
