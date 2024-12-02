const mongoose = require("mongoose")
const Schema = mongoose.Schema

const talukSchema = new mongoose.Schema(
    {
        t_name:{type:String,required:true},
        t_alt:{type:String,required:true},
        t_status:{type:Boolean,required:true},
        district: { type: Schema.Types.ObjectId, ref: 'District' },
        state: { type: Schema.Types.ObjectId, ref: 'State' }
},
{timestamps:true}
);

module.exports = mongoose.model("Taluk",talukSchema);