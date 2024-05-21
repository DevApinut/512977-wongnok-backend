const express = require('express')
const router = express.Router()
const {Web_fetch} = require('../WebScraping/Fetch_Reciept')
const {Description} = require('../Description/Description')

const puppeteer = require('puppeteer')

router.get('/Reciept',Web_fetch )   
router.post('/Description',Description )   


module.exports = router