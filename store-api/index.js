const express = require("express")
const mongoose = require("mongoose")
const productRouter = require("./routes/products")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to ecom-store")
})

app.use("/api/v1/", productRouter)

mongoose.connect("mongodb://localhost:27017/ecom").then(() => {
    console.log("DB connected")
})

const port = 3000
app.listen(port, () => {
    console.log(`Server listening at ${port}`)
})