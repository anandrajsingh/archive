const express = require("express")
const mongoose = require("mongoose")
const mainRouter = require("./routes")
const testRouter = require("./routes/test")
const todoRouter = require("./routes/todo")

const app = express()
const router = express.Router()
app.use(express.json())


app.use("/", mainRouter)
app.use("/test", testRouter)
app.use("/todos", todoRouter)

mongoose.connect("mongodb://localhost:27017/test").then(() => {
    console.log("mongo is connected")
}).catch((e)=> console.error(e))

app.listen(3000, () => {
    console.log("App listening on port 3000")
})