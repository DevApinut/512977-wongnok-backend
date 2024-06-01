

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
var bodyParser = require('body-parser');

require("dotenv").config()




const RouteAPI = require('./Component/Route/RouteAPI')

const app = express()



//For middleware
// app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
// 
// Save file mord than 50 mb
// 
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
// 
//For set /api/....{API Router}
// 
app.use('/api', RouteAPI)
//
// Open port at 9000
// 
const port = 9000
app.listen(port, () => { console.log(`Success for connect to Server at port ${port}`) })
// 
// connect to mongo dB
// 
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})
    .then(() => console.log("เชื่อมต่อข้อมูลสำเร็จ"))
    .catch((err) => console.log(err))



