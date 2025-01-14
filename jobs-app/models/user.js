const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Provide Name"],
        maxLength: 50,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: false
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
})

UserSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJwt = function(){
    return jwt.sign(
        { userId: this._id, name: this.name },
        "bansec",
        {
            expiresIn: "12h",
        }
    )
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

const User = mongoose.model("User", UserSchema)

module.exports = User