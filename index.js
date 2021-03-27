const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const path = require("path");
const cors = require('cors')

require(`dotenv`).config()

mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology : true,
    useNewUrlParser: true
})

const db = mongoose.connection

db.on("error", (error) => console.log(error))
db.once("open", () => console.log(`connected to db`))

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.use(cors())
app.options('*', cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/api", require("./routes"))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`)
})
