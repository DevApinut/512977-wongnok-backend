const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

exports.uploadFile = async (req, res) => {

    res.json({ message: "Upload Success" })


}
exports.ReadnameFile = async (req, res) => {

    const fs = require("fs");
    const path = require("path");

    const folderPath = "./uploads";

    // read all files in the directory
    let filesArr = fs.readdirSync(folderPath);
    res.json({ message: filesArr })
}

exports.EditFilename = async (req, res) => {

    const fs = require("fs");
    const path = require("path");

    const folderPath = "./uploads";

    // read all files in the directory
    let filesArr = fs.readdirSync(folderPath);
    res.json({ message: filesArr })

    // Loop through array and rename all files 

    filesArr.forEach((file, index) => {
        let fullPath = path.join(folderPath, file);
        let fileExtension = path.extname(file);
        let fileName = path.basename(file, fileExtension);

        let newFileName = fileName + index + "." + fileExtension;
        try {
            fs.renameSync(fullPath, path.join(folderPath, newFileName));
        } catch (error) {
            console.error(error)
        }
    });
}

exports.Deletefile = (req, res) => {


    try {

        const fs = require('fs');

        const filePath = `./uploads/${req.body.nameFile}`; // Replace with the actual path to your file

        // Remove the file
        fs.unlink(filePath, (err) => {
            res.json({ res: "remove success" })
            if (err) {
                console.error(`Error removing file: ${err}`);
                return;
            }

            console.log(`File ${filePath} has been successfully removed.`);
        });
        // res.json({ res: req.body.nameFile })
    }
    catch {
        (err) => {
            res.json({ res: err })
        }
    }

}