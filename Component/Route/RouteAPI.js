const express = require('express')
const multer = require('multer')

// const upload = multer({ dest: 'uploads/' })



const storage = multer.memoryStorage(); // <--- use memoryStorage
const upload = multer({ storage });


const router = express.Router()

const { Register } = require('../Register/Register')
const { Login } = require('../Login/Login')
const { MenuCreate, GetMenu, deleteMenu, FineoneMenu, Updaterating, UpdateMenu, GetMenuRating } = require('../Menulist/Menu')
const { requirepersonelLogin } = require('../AuthController/authcontroller')
const { multerupload,deletemulter } = require('../Multer/uploadbynuter')







// Get for Router
router.get('/GetMenu', GetMenu)
router.get('/GetMenuRating', GetMenuRating)


// Post for Router
router.post('/Register', Register)
router.post('/Login', Login)
router.post('/MenuCreate', requirepersonelLogin, MenuCreate)
router.post('/deleteMenu', requirepersonelLogin, deleteMenu)
router.post('/FineoneMenu', FineoneMenu)
router.post('/Updaterating', requirepersonelLogin, Updaterating)
router.post('/UpdateMenu', requirepersonelLogin, UpdateMenu)

// Multer
router.post('/upload', upload.single('image'), multerupload);
router.post('/deletemulter', deletemulter);



module.exports = router