const mongoose = require('mongoose');

const BlogDescription = mongoose.Schema({
    Description: {
        type: String,
        required: true,
        default:"ไม่มีข้อมูลแสดง"
    },    
}, { timestamps: true })

module.exports = mongoose.model("Description", BlogDescription)