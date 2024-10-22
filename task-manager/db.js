const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title should be given"]
    },
    
    description: String,
    done: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model("Task", TaskSchema)

module.exports = {
    Task
}