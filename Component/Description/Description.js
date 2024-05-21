const BlogDescription = require('../../Schema/Description/Description')
exports.Description = async (req, res) => {
    const {Description} = req.body
    try {
        await BlogDescription.create({Description})
        .then((result)=>{
            res.json({res:"ทำการเเก้ไขข้อมูลสำเร็จ"})
        })
        .catch(err=>{res.json({res:"err1"})})
    }
    catch (err) {
        res.json({ res: "err2"})
    }
}