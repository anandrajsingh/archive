const mongoose = require("mongoose")
const express = require("express")
const jwt = require("jsonwebtoken")
const authenticationMiddleware = require("./middleware")

const mainRouter = express.Router()

mainRouter.get('/', (req, res) => {
    res.send("working")
})

mainRouter.post("/login", (req, res) => {
    const body = req.body

    const token = jwt.sign({username: body.username}, "bansec", {
        expiresIn : "12h"
    })

    res.json(token)
})

mainRouter.get("/dashboard",authenticationMiddleware, async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
})

module.exports = mainRouter