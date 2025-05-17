const mongoose = require('mongoose');

const BlogMenu = mongoose.Schema({
    
        nameofFood: { type: String, default: "ไม่มีข้อมูล" },
        ingredient: { type: String, default: "ไม่มีข้อมูล" },
        reciept: { type: String, default: "ไม่มีข้อมูล" },
        timeforcook: { type: String, default: "ไม่มีข้อมูล" },
        Hardforwork: { type: String, default: "ไม่มีข้อมูล" }, 
        imgfile: { type: String, default: "ไม่มีข้อมูล" },  
        nameUser: { type: String, default: "ไม่มีข้อมูล" },  
    
},
    

    { timestamps: true })

module.exports = mongoose.model("Menu", BlogMenu)