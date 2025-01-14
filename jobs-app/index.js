const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./routes/auth")
const jobsRouter = require("./routes/jobs")

const app = express()

app.use(express.json())

app.use("/api/v1/", authRouter)
app.use("/api/v1/jobs/", jobsRouter)

mongoose.connect("mongodb://localhost:27017/jobs-app").then(() => {
    console.log("mongo connected")
}).catch((err) => {
    console.log(err)
})

app.listen(3000, () => {
    console.log("App listening on port 3000")
})