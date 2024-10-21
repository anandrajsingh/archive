const express = require("express");

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    return res.json({
        "message": "Welcome to test app"
    })
})

mainRouter.post("/", (req, res) => {
    const body = req.body;
    return res.json(body)
})

module.exports = mainRouter