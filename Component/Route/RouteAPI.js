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
const { Web_fetch } = require('../WebScraping/Fetch_Reciept')
const { Description, GetDescription } = require('../Description/Description')
const { Personel, GetPersonel } = require('../Personel/Personel')
const { Register } = require('../Register/Register')
const { Login } = require('../Login/Login')
const { uploadFile,ReadnameFile,Deletefile } = require('../Dowload/dowload')


// Get for Router
router.post('/Reciept', Web_fetch)
router.get('/GetDescription', GetDescription)
router.get('/GetPersonel', GetPersonel)
router.get('/ReadnameFile', ReadnameFile)

// Post for Router
router.post('/Description', Description)
router.post('/Register', Register)
router.post('/Login', Login)
router.post('/Personel', Personel)
router.post('/uploadFile', upload.single('file'), uploadFile)
router.post('/Deletefile', Deletefile)



module.exports = router