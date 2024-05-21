const express = require('express')
const router = express.Router()
const { Web_fetch } = require('../WebScraping/Fetch_Reciept')
const { Description, GetDescription } = require('../Description/Description')

const puppeteer = require('puppeteer')

// Get for Router
router.get('/Reciept', Web_fetch)
router.get('/GetDescription', GetDescription)

// Post for Router
router.post('/Description', Description)


module.exports = router