const express = require("express")
const User = require("../models/user")

const authRouter = express.Router()

authRouter.post("/signup", async(req, res) => {
    const user = await User.create({...req.body})
    const token = await user.createJwt()
    console.log(token)
    res.json({user, token})
})

authRouter.post("/login", async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})
    if(!user){
        res.json({"message": "user not found"})
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        res.send("Wrong password")
    }
    const token = user.createJwt()
    res.json({user, token})
})

module.exports = authRouter