const Country = require("../models/Country");
const State = require("../models/State");
const District = require("../models/District");
const Taluk = require("../models/Taluk")

exports.createTaluk = async (req, res) => {
    try {
        const { countryId, stateId, districtId } = req.params; 
        const { t_name, t_code, t_alt, t_status } = req.body;
        
        
        const country = await Country.findById(countryId);
        if (!country) {
            return res.status(404).json({ message: "Country not found." });
        }
       
       
        const state = await State.findOne({ _id: stateId, country: countryId });
        if (!state) {
            
            return res.status(404).json({ message: "State not found for the given country." });
        }
      
        const district = await District.findOne({ _id: districtId,  country: countryId, state: stateId});
        if (!district) {
           
            return res.status(404).json({ message: "District not found for the given state." });
        }
        
        const existingTaluk = await Taluk.findOne({$or: [{t_name  }]});
        if (existingTaluk) {
            
            return res.status(400).json({ message: "Taluk or code already exists in this District." });
        }

        
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

exports.getDistrictsByStateId = async (req, res) => {
    try {
        const { stateId } = req.params; 
        console.log("getDistrictsByStateId called with stateId:", req.params.stateId);

       
        const districts = await District.find({ state: stateId })
            .populate({
                path: "state", 
                select: "s_name", 
                populate: {
                    path: "country", 
                    select: "c_name", 
                },
            })
            .exec();

        
        if (!districts || districts.length === 0) {
            return res.status(404).json({ message: "No districts found for the given state." });
        }

        
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


exports.getTalukById = async (req, res) => {
    try {
        const { talukId } = req.params; 

        
        const taluk = await Taluk.findById(talukId)
            .populate({
                path: "state", 
                select: "s_name", 
                populate: {
                    path: "country", 
                    select: "c_name", 
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
        
        const taluks = await Taluk.find()
            .populate({
                path: "district", 
                select: "d_name", 
                populate: {
                    path: "state", 
                    select: "s_name", 
                    populate: {
                        path: "country", 
                        select: "c_name", 
                    },
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
        const { talukId } = req.params; 

        
        const taluk = await Taluk.findById(talukId)
            .populate({
                path: "district", 
                select: "d_name", 
                populate: {
                    path: "state", 
                    select: "s_name",
                    populate: {
                        path: "country", 
                        select: "c_name", 
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
       
        const { talukId } = req.params;

       
        const deletedTaluk = await Taluk.findByIdAndDelete(talukId);

        
        if (!deletedTaluk) {
            return res.status(404).json({ message: "Taluk not found." });
        }

        res.status(200).json({
            message: "Taluk deleted successfully.",
            state: deletedTaluk, 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};
