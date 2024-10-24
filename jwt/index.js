const express = require("express")
const mongoose = require("mongoose")
const mainRouter = require("./mainRoutes")

const app = express()
const router = express.Router()

app.use(express.json())
app.use("/api/v1", mainRouter)

mongoose.connect("mongodb://localhost:27017/jwt").then(() => {
    console.log("mongodb connected")
}).catch((err) => {
    console.log(err)
})

app.listen(3000, () => {
    console.log("App listening to port 3000")
})