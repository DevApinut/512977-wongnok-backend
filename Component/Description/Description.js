const BlogDescription = require('../../Schema/Description/Description')
exports.Description = async (req, res) => {
    const { Description } = req.body
    try {
        await BlogDescription.create({ Description })
            .then((result) => {
                res.json({ res: "ทำการเเก้ไขข้อมูลสำเร็จ" })
            })
            .catch(err => { res.json({ res: "err1" }) })
    }
    catch (err) {
        res.json({ res: "err2" })
    }
}
exports.GetDescription = async (req, res) => {
    try {
        await BlogDescription.findOne().sort({ createdAt: -1 })
            .then((result) => {
                res.json({ res: result })
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}