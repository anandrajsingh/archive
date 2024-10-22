const express = require("express")
const taskRouter = express.Router()
const {Task} = require("../db")

taskRouter.route('/').get(async(req, res) => {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
})
taskRouter.route("/").post(async(req, res) => {
    const body = req.body;
    const task = await Task.create(body)
    res.status(200).json(task) 
})

taskRouter.route("/:id").get(async(req, res) => {
    const id = req.params.id;
    const task = await Task.findOne({_id:id})
    if(!task){
        res.send("No task found with this id")
    }
    res.send(task)
})
taskRouter.patch("/:id", async(req, res) => {
    const id = req.params.id;
    const task = await Task.findOneAndUpdate({_id:id}, req.body, {
        new: true,
        runValidators: true
    })
    res.send(task)
})
taskRouter.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const deleted = await Task.findOneAndDelete({_id:id})
    console.log(deleted)
    res.send("task deleted")
})

module.exports = taskRouter