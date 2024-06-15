const mongoose = require('mongoose');

const BlogPersonel = mongoose.Schema({
    data: [{
        name: { type: String, default: "ไม่มีข้อมูล" },
        position: { type: String, default: "ไม่มีข้อมูล" },
        contact: { type: String, default: "ไม่มีข้อมูล" },
        img: { type: String, default: "ไม่มีข้อมูล" },
        Cropimg: { type: String, default: "ไม่มีข้อมูล" },        
    }]
},
    // name: {
    //     type: String,
    //     required: true,
    // },
    // position: {
    //     type: String,
    //     required: true,
    // },
    // contact: {
    //     type: String,
    //     required: true,
    // },
    // img: {
    //     type: String,
    //     required: true,        
    // },
    // Cropimg: {
    //     type: String,
    //     required: true,
    // },   

    { timestamps: true })

module.exports = mongoose.model("Personel", BlogPersonel)