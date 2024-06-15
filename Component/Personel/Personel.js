const BlogPersonel = require('../../Schema/Personel/Personel')
exports.Personel = async (req, res) => {
    const { data } = req.body
    try {
        await BlogPersonel.findOne().sort({ createdAt: -1 })
            .then(async (result) => {
                if (result == null) {
                    await BlogPersonel.create({ data })
                        .then(result1 => {
                            res.json({ res: "ทำการสร้างข้อมูลสำเร็จ" })
                        })
                        .catch(err => res.json({ res: err }))
                } else {
                    // res.json({ res: result ,test:result._id})
                    await BlogPersonel.findOneAndUpdate(result._id, {data})
                        .then(result1 => {
                            res.json({ res: "อัพเดทข้อมูลสำเร็จ" })
                        })
                        .catch(err => res.json({ res: "err" }))
                }
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}
exports.GetPersonel = async (req, res) => {
    try {

        await BlogPersonel.findOne().sort({ createdAt: -1 })
            .then((result) => {
                res.json({ res: result })
            })
            .catch(err => { res.json({ res: "err1" }) })

    }
    catch (err) {
        res.json({ res: "err2" })
    }
}