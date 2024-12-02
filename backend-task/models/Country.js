const mongoose = require("mongoose");
const Schema = mongoose.Schema

const countrySchema = new mongoose.Schema(
    {
        c_name: { type: String, required: true },
        c_alt: { type: String, required: true },
        c_code: { type: Number, required: true },
        c_status: { type: Boolean, required: true },
        state: [{ type: Schema.Types.ObjectId, ref: 'State' }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Country", countrySchema);
