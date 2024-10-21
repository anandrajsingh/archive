const mongoose = require("mongoose")

const TestSchema = mongoose.Schema({
    test1: String,
    test2: String
})

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    done: {
        type: Boolean,
        required: true
    }
})

const Test = mongoose.model("Test", TestSchema);
const Todo = mongoose.model("Todo", TodoSchema)

module.exports = {
    Test,
    Todo
}