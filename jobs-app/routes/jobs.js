const express = require("express")
const auth = require("../middleware")
const Job = require("../models/jobs")

const jobsRouter = express.Router()

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFhMjNiZDYwNDQ0OTY4ZTE3YjZhM2UiLCJuYW1lIjoiYW5hbmRkZGQiLCJpYXQiOjE3Mjk3ODM2ODQsImV4cCI6MTcyOTgyNjg4NH0.QFD8aQZb2fNS-nTTIoa_R8xj7VKRQsaPjkNr0srP88I

jobsRouter.get("/", auth,async(req, res) => {
    const user = req.user.userId
    const jobs = await Job.find({createdBy: user})
    res.json(jobs)
})

jobsRouter.post("/", auth, async(req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.json(job)
})

jobsRouter.get("/:id", auth, async(req, res) => {
    const {
        user : { userId },
        params : { id: jobId},
    } = req

    const job = await Job.findOne({
        _id: jobId,
        createdBy : userId
    })
    if(!job){
        res.send("No job found")
    }
    res.json(job)
})

jobsRouter.post("/:id", auth, async(req, res) => {
    
})

jobsRouter.patch("/:id", auth, async(req, res) => {
    
})

jobsRouter.delete("/:id", auth, async(req, res) => {
    
})


module.exports = jobsRouter