const Country = require("../models/Country");
const State = require("../models/State");
const District = require("../models/District");

exports.createDistrict = async (req, res) => {
    try {
        const { countryId, stateId } = req.params; 
        const { d_name, d_code, d_alt, d_status } = req.body;

    
        const country = await Country.findById(countryId);
        if (!country) {
            return res.status(404).json({ message: "Country not found." });
        }

   
        const state = await State.findOne({ _id: stateId, country: countryId });
        if (!state) {
            return res.status(404).json({ message: "State not found for the given country." });
        }

        const existingDistrict = await District.findOne({$or: [{d_name, state: stateId},{d_code, state:stateId}] });
        if (existingDistrict) {
            return res.status(400).json({ message: "District or code already exists in this country." });
        }

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
        const { districtId } = req.params; 

      
        const district = await District.findById(districtId)
            .populate("country", "c_name")
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
       
        const districts = await District.find()
            .populate({
                path: "state", 
                select: "s_name", 
                populate: {
                    path: "country", 
                    select: "c_name", 
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
        const { districtId } = req.params; 

       
        const district = await District.findById(districtId)
            .populate({
                path: "state", 
                select: "s_name",
                populate: {
                    path: "country", 
                    select: "c_name", 
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
        
        const { districtId } = req.params;

       
        const deletedDistrict = await District.findByIdAndDelete(districtId);

       
        if (!deletedDistrict) {
            return res.status(404).json({ message: "District not found." });
        }

        res.status(200).json({
            message: "District deleted successfully.",
            state: deletedDistrict,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};
