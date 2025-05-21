const BlogMenu = require('../../Schema/Menu/Menu')
const cloudinary = require('../Multer/cloudinary');
const streamifier = require('streamifier');


// function for multer delete
const getPublicIdFromUrl = (url) => {
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.\w+$/;
    const match = url.match(regex);
    if (!match) throw new Error('Invalid Cloudinary URL format');
    return match[1]; // e.g. "folder/image"
}


exports.MenuCreate = async (req, res) => {
    let { nameofFood,
        ingredient,
        reciept,
        timeforcook,
        Hardforwork,
        imgfile,
        nameUser
    } = req.body


    try {
        if (nameUser == false) nameUser = 'ไม่ระบุตัวตน'

        //path of multer save
        const uploadResult = await cloudinary.uploader.upload(imgfile, {
            folder: 'uploads'
        });


        await BlogMenu.create({
            nameofFood,
            ingredient,
            reciept,
            timeforcook,
            Hardforwork,
            imgfile: uploadResult.url,
            nameUser
        })
            .then(result1 => {
                res.json({ res: "ทำการสร้างข้อมูลสำเร็จ" })
            })
            .catch(err => res.json({ res: err }))
    }
    catch (err) {
        res.json({ res: "err2" })
    }
}
exports.GetMenu = async (req, res) => {
    const { data, rating } = req.query
    let ratingtonumber = Number(rating)
    try {
        if (data === "" && ratingtonumber === 0) {
            await BlogMenu.find().sort({ createdAt: -1 })
                .then((result1) => res.json({ res: result1 }))
                .catch(err => { res.json({ res: "Error Case1" }) })
        } else if (data !== "" && ratingtonumber === 0) {
            await BlogMenu.find({
                $or: [

                    { nameofFood: { $regex: data, $options: 'i' } },
                    { nameUser: { $regex: data, $options: 'i' } }

                ]
            }
            ).sort({ createdAt: -1 })
                .then((result1) => res.json({ res: result1 }))
                .catch(err => { res.json({ res: "Error Case2" }) })
        } else if (data !== "" && ratingtonumber !== 0) {
            await BlogMenu.find({
                $or: [

                    { nameofFood: { $regex: data, $options: 'i' } },
                    { nameUser: { $regex: data, $options: 'i' } }

                ]
                , SuumratingofFood: { $gte: Number(ratingtonumber), $lt: Number(ratingtonumber) + 1 }
            }).sort({ createdAt: -1 })
                .then((result1) => res.json({ res: result1 }))
                .catch(err => { res.json({ res: "Error Case3" }) })
        } else if (data === "" && ratingtonumber !== 0) {
            await BlogMenu.find({
                SuumratingofFood: { $gte: Number(ratingtonumber), $lt: Number(ratingtonumber) + 1 }
            }).sort({ createdAt: -1 })
                .then((result1) => res.json({ res: result1 }))
                .catch(err => { res.json({ res: Math.floor(ratingtonumber) }) })
        }
    }
    catch (err) {
        res.json({ res: "Can not try main function" })
    }
}
exports.GetMenuRating = async (req, res) => {
    try {
        await BlogMenu.find({}).sort({ SuumratingofFood: -1 })
            .then((result1) => res.json({ res: result1 }))
            .catch(err => { res.json({ res: "Error Case2" }) })
    }

    catch (err) {
        res.json({ res: "Can not try main function" })
    }
}

exports.deleteMenu = async (req, res) => {
    const { ID } = req.body
    try {

        await BlogMenu.findById({ _id: ID })
            .then((result) => {
                if (result.data !== "") {
                    const publicId = getPublicIdFromUrl(result.imgfile);
                    cloudinary.uploader.destroy(publicId, (error, result) => {
                        if (error) {
                            // return res.status(500).json({ error: error.message });
                        }
                        if (result.result === 'not found') {
                            // return res.status(404).json({ message: 'Image not found on Cloudinary' });
                        }
                        // res.json({ message: 'Image deleted successfully', result });
                    });
                }

            })
            .catch(err => { res.json({ res: "err1" }) })


        await BlogMenu.findByIdAndDelete({ _id: ID })
            .then((result) => {
                res.json({ res: result })
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}

exports.FineoneMenu = async (req, res) => {
    const { ID } = req.body
    try {
        await BlogMenu.findById({ _id: ID })
            .then((result) => {
                res.json({ res: result })
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}

exports.Updaterating = async (req, res) => {
    const { ID, ratingofFood, SuumratingofFood } = req.body
    try {
        await BlogMenu.findOneAndUpdate({ _id: ID }, { ratingofFood, SuumratingofFood }, { new: true })
            .then((result) => {
                res.json({ res: result })
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}
exports.UpdateMenu = async (req, res) => {

    const { ID, nameofFood, ingredient, reciept, timeforcook, imgfile, Hardforwork } = req.body
    try {
        await BlogMenu.findById({ _id: ID })
            .then((result) => {
                if (result.imgfile !== "") {
                    const publicId = getPublicIdFromUrl(result.imgfile);
                    cloudinary.uploader.destroy(publicId, (error, result) => {
                        if (error) {
                            // return res.status(500).json({ error: error.message });
                        }
                        if (result.result === 'not found') {
                            // return res.status(404).json({ message: 'Image not found on Cloudinary' });
                        }
                        // res.json({ message: 'Image deleted successfully', result });
                    });

                }

            })
            .catch(err => { res.json({ res: "err1" }) })

        //path of multer save
        const uploadResult = await cloudinary.uploader.upload(imgfile, {
            folder: 'uploads'
        });


        await BlogMenu.findOneAndUpdate({ _id: ID }, { nameofFood, ingredient, reciept, timeforcook, imgfile: uploadResult.url, Hardforwork }, { new: true })
            .then((result) => {
                res.json({ res: result })
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}