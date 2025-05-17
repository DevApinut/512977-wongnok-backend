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
                res.json({ res: "ทำการสร้างข้อมูลสำเร็จ",nameUser })
            })
            .catch(err => res.json({ res: err }))
    }
    catch (err) {
        res.json({ res: "err2" })
    }
}
exports.GetMenu = async (req, res) => {
    try {

        await BlogMenu.find().sort({ createdAt: -1 })
            .then((result) => {
                res.json({ res: result })
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}
exports.deleteMenu = async (req, res) => {
    const {ID} = req.body
    try {

        await BlogMenu.findByIdAndDelete({_id:ID})
            .then((result) => {
                res.json({ res: result })
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}