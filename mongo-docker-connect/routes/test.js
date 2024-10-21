const express = require("express")
const { Test } = require("../db")

const testRouter = express.Router()

testRouter.get("/", (req, res) => {
    return res.json({
        "message": "test route working fine"
    })
})

testRouter.post("/", async (req, res) => {
    const body = req.body;
    const test = await Test.create(body);
    return res.json({
        "message":"successfull",
        user: test._id,
        test1: test.test1
    })
})

module.exports = testRouter