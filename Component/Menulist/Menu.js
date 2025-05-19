const BlogMenu = require('../../Schema/Menu/Menu')
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
        await BlogMenu.create({
            nameofFood,
            ingredient,
            reciept,
            timeforcook,
            Hardforwork,
            imgfile,
            nameUser
        })
            .then(result1 => {
                res.json({ res: "ทำการสร้างข้อมูลสำเร็จ", nameUser })
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
            await BlogMenu.find()
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


// exports.GetMenu = async (req, res) => {
//     const { data } = req.query
//     try {
//         await BlogMenu.find({ nameofFood: { $regex: data, $options: 'i' } }).sort({ createdAt: -1 })
//             .then(async (result) => {
//                 if (result.length == 0 && data == "") {
//                     await BlogMenu.find()
//                         .then((result1)=>res.json({ res: result1 }))
//                 }else if(result.length == 0 && data !== ""){
//                     res.json({ res: result })
//                 }else {
//                     res.json({ res: result })
//                 }

//             })
//             .catch(err => { res.json({ res: "err1" }) })

//     }
//     catch (err) {
//         res.json({ res: "err2" })
//     }
// }
exports.deleteMenu = async (req, res) => {
    const { ID } = req.body
    try {

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
        await BlogMenu.findOneAndUpdate({ _id: ID }, { nameofFood, ingredient, reciept, timeforcook, imgfile, Hardforwork }, { new: true })
            .then((result) => {
                res.json({ res: result })
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}