const express = require('express')
const router = express.Router()
const { Web_fetch } = require('../WebScraping/Fetch_Reciept')
const { Description, GetDescription } = require('../Description/Description')
const { Personel, GetPersonel } = require('../Personel/Personel')
const {Register} = require('../Register/Register')
const {Login} = require('../Login/Login')


// Get for Router
router.get('/Reciept', Web_fetch)
router.get('/GetDescription', GetDescription)
router.get('/GetPersonel', GetPersonel)

// Post for Router
router.post('/Description', Description)
router.post('/Register', Register)
router.post('/Login', Login)
router.post('/Personel', Personel)


module.exports = router