const BlogRegister = require('../../Schema/Register/Register')
const bcrypt = require('bcrypt');
exports.Register = async (req, res) => {
    const { username, firstname, lastname, password, email, personel_number } = req.body
    const user = await BlogRegister.findOne({'username': {$regex: new RegExp('^' + username, 'i')}}) 
    try {
        const validEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        const validPassword = new RegExp(/^(?=.*[0-9])(?=.*[.!@#$%^&*])[A-z0-9!@#$%^&*]/);
        const validusername = new RegExp(/^(?=.{4,20}$)[A-Za-z_][A-Za-z0-9_]*$/);

        if (validusername.test(username) && validPassword.test(password) && validEmail.test(email) && !user) {
            /* for has password */
            bcrypt.hash(password, 10)
                .then(hash => {
                    BlogRegister.create({ username, password: hash, firstname, lastname, email, personel_number })
                        .then((result) => res.json({ res: "สมัครสมาชิกเรียบร้อย" }))/**result for lastest data from save on data base */
                        .catch((error) => res.json({ error }))
                })
                .catch(err => console.error(err.message))
        } else if (!validusername.test(username) || !validPassword.test(password) || !validEmail.test(email)) {
            res.json({ res: "ไม่สำเร็จ" })
        }
    }
    catch (err) {
        res.json({ res: err })
    }
}