const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// employee model file or structure of employee data collection
const employeeSchema = new Schema({
    empId: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    dob: {
        type: Date
    },
    city: {
        type: String
    },
    RowStatus: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('dbo.employee', employeeSchema);