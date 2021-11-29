const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// manager model file or structure of manager data collection
const managerSchema = new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    address:{
        type:String
    },
    email:{
        type:String
    },
    dob:{
        type:Date
    },
    password:{
        type:String,
        require:true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    company:{
        type:String
    },

}, { timestamps: true });

module.exports = mongoose.model('dbo.manager', managerSchema);