const Country = require("../models/Country");
const jwt = require('jsonwebtoken');

exports.createCountry = async (req, res) => {
    try {
        console.log("initialted")
        const { c_name, c_alt, c_code, c_status } = req.body;
        console.log("received data:", req.body);
        const existingCountry = await Country.findOne({ $or: [{ c_name }, { c_code }] });

        if (existingCountry) {

            return res.status(400).json({ message: "Country or code already exists." });
        }
        const country = new Country({ c_name, c_alt, c_code, c_status });
        await country.save();

        res.status(201).json({ message: "Country created successfully.", country });
    } catch (error) {
        res.status(500).json({ message: "server error.", error: error.message });
    }

};

exports.getAllCountries = async (req, res) => {

    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        console.log(error); res.status(401).json({ message: "Invalid or expired token." });
        res.status(500).json({ message: "Failed to fetch countries." });
    }
};

exports.getCountryById = async (req, res) => {
    try {
        const { countryId } = req.params;

        const country = await Country.findById(countryId);

        if (!country) {
            return res.status(404).json({ message: "Country not found." });
        }

        res.status(200).json({
            message: "Country fetched successfully.",
            country,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};


exports.updateCountryById = async (req, res) => {
    try {

        const { countryId } = req.params;


        const updates = req.body;


        const updatedCountry = await Country.findByIdAndUpdate(countryId, updates, {
            new: true,
            runValidators: true
        });


        if (!updatedCountry) {
            return res.status(404).json({ message: "Country not found." });
        }

        res.status(200).json({
            message: "Country updated successfully.",
            country: updatedCountry,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};


exports.deleteCountryById = async (req, res) => {
    try {

        const { countryId } = req.params;


        const deletedCountry = await Country.findByIdAndDelete(countryId);


        if (!deletedCountry) {
            return res.status(404).json({ message: "Country not found." });
        }

        res.status(200).json({
            message: "Country deleted successfully.",
            country: deletedCountry,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};