const express = require('express')
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const router = express.Router()

const { Description, GetDescription } = require('../Description/Description')
const { Personel, GetPersonel } = require('../Personel/Personel')
const { Register } = require('../Register/Register')
const { Login } = require('../Login/Login')
const { MenuCreate,GetMenu,deleteMenu,FineoneMenu,Updaterating,UpdateMenu } = require('../Menulist/Menu')
const { requirepersonelLogin } = require('../AuthController/authcontroller')

// Get for Router

router.get('/GetDescription', GetDescription)
router.get('/GetPersonel', GetPersonel)

router.get('/GetMenu', GetMenu)






// Post for Router
router.post('/Description', Description)
router.post('/Register', Register)
router.post('/Login', Login)
router.post('/Personel', Personel)

router.post('/MenuCreate',requirepersonelLogin, MenuCreate)
router.post('/deleteMenu',requirepersonelLogin, deleteMenu)
router.post('/FineoneMenu',requirepersonelLogin, FineoneMenu)
router.post('/Updaterating',requirepersonelLogin, Updaterating)
router.post('/UpdateMenu',requirepersonelLogin, UpdateMenu)




module.exports = router