// const puppeteer = require('puppeteer')
// const scrape = async() =>{
//     const browser = await puppeteer.launch({})
//     const page = await browser.newPage()

//     await page.goto('https://www.amazon.com/BENGOO-G9000-Controller-Cancelling-Headphones/dp/B01H6GUCCQ/ref=sr_1_1?_encoding=UTF8&content-id=amzn1.sym.12129333-2117-4490-9c17-6d31baf0582a&dib=eyJ2IjoiMSJ9.utUccbotzS-1LxUPRWzJM0bttM4RzIzInIHvIExYHQaaKI0nOe3ZtLvvFhUgFwVAKbvUDTA80L0NRWbox00d_nSdKuDFV8Jdxz7XIkmvidoxBRm124noZdVDA7-9G2zTceJIxPEIjQ8sZZdSU2pYddobRUJvkdfmA6Dc3pLdEl-ACD9FsIWIh7hxryZBKochq3d4XGDFNi1ouYibsgdx_h1AR3NrmWxZTJR0LZFQGzg.9fI6TDZRhNJNvLPXEUPCYKNRC-PBCMroxAleCpgJe2k&dib_tag=se&keywords=gaming%2Bheadsets&pd_rd_r=0587ca02-90d2-44eb-80e4-98b5cfa12188&pd_rd_w=dp6Ua&pd_rd_wg=DNpli&pf_rd_p=12129333-2117-4490-9c17-6d31baf0582a&pf_rd_r=0FY855ZP3J0GRGTFT19B&qid=1710516006&sr=8-1&th=1')
//     var element = await page.waitForSelector("#productTitle")
//     var text = await page.evaluate(element=>element.textContent,element)
//     console.log(text)
//     browser.close
// }
// scrape()

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const RouteAPI = require('./Component/Route/RouteAPI')

const app = express()


//For middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//For set /api/....
app.use('/api', RouteAPI)

const port = 9000
app.listen(port, () => { console.log(`Success for connect to Server at port ${port}`) })

//connect to mongo dB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})
    .then(() => console.log("เชื่อมต่อข้อมูลสำเร็จ"))
    .catch((err) => console.log("การเชื่อมต่อมีปัญหา"))