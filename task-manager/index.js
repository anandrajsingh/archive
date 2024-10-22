const express = require("express")
const taskRouter = require("./routes/tasks")
const { default: mongoose } = require("mongoose")
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.json({"message": "Welcome to task manager"})
})
app.use("/api/v1/tasks",taskRouter)

mongoose.connect("mongodb://localhost:27017/tasks").then(() => {
    console.log("mongodb connected")
}).catch((error) => {
    console.log(error)
})

const port = "3000"
app.listen(port, () => [
    console.log(`Server listening on port ${port}`)
])