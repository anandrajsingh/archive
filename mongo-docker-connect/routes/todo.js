const express = require("express")
const { Todo } = require("../db")

const todoRouter = express.Router()

todoRouter.get("/", async (req, res) => {
    const todos = await Todo.find()
    console.log(todos)
    res.json(todos)
})

todoRouter.post("/addTodo", async (req, res) => {
    const body = req.body;
    try {
        const todo = await Todo.create(body)
        return res.json(todo)
    } catch (error) {
        console.error(error)
    }
})

module.exports = todoRouter