const mongoose = require("mongoose")
const Schema = mongoose.Schema

const stateSchema = new mongoose.Schema (
    {
        s_name:{type:String,required:true},
        s_alt :{type:String,required:true},
        s_code:{type:Number,required:true},
        s_status:{type:Boolean,required:true},
        country: { type: Schema.Types.ObjectId, ref: 'Country' }, 
        districts: [{ type: Schema.Types.ObjectId, ref: 'District' }]
},
      {timestamps:true}
);
module.exports = mongoose.model("State",stateSchema)