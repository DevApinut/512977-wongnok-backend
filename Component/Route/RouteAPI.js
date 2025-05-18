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

// Get for Router

router.get('/GetDescription', GetDescription)
router.get('/GetPersonel', GetPersonel)

router.get('/GetMenu', GetMenu)






// Post for Router
router.post('/Description', Description)
router.post('/Register', Register)
router.post('/Login', Login)
router.post('/Personel', Personel)

router.post('/MenuCreate', MenuCreate)
router.post('/deleteMenu', deleteMenu)
router.post('/FineoneMenu', FineoneMenu)
router.post('/Updaterating', Updaterating)
router.post('/UpdateMenu', UpdateMenu)




module.exports = router