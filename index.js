

const express = require("express")
// const morgan = require("morgan")
// const cors = require("cors")
// const mongoose = require("mongoose")

// require("dotenv").config()

// const RouteAPI = require('./Component/Route/RouteAPI')

const app = express()


//For middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//For set /api/....
app.get('/', (req, res) => {
    res.send('ทดสอบระบบ Backend')
})
// app.use('/api', RouteAPI)

const port = 9000
app.listen(port, () => { console.log(`Success for connect to Server at port ${port}`) })

//connect to mongo dB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})
    .then(() => console.log("เชื่อมต่อข้อมูลสำเร็จ"))
    .catch((err) => console.log("การเชื่อมต่อมีปัญหา"))



