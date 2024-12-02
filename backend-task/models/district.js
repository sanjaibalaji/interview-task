const mongoose = require("mongoose")
const Schema = mongoose.Schema

const districtSchema = new mongoose.Schema (
    {
        d_name:{type:String,required:true},
        d_alt: {type:String,required:true},
        d_code: {type:Number,required:true},
        d_status:{type:Boolean,required:true},
        country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
        state: { type: Schema.Types.ObjectId, ref: 'State' }, 
        taluks: [{ type: Schema.Types.ObjectId, ref: 'Taluk' }]
},
 {timestamp:true}
);

module.exports = mongoose.model("District",districtSchema);