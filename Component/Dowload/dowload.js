const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

exports.Dowload = async (req, res) => {
    // const file = "./Component/Dowload/FM0.docx";
    res.json({message:"success"})
}