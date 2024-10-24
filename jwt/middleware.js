const jwt = require("jsonwebtoken")

const authenticationMiddleware = async(req, res, next) => {
    const auth = req.headers.authorization

    if(!auth){
        res.send('no token found')
    }

    const token = auth.split(' ')[1]

    const decoded = jwt.verify(token, "bansec")
    console.log(decoded)
    req.user = decoded
    next()
}

module.exports = authenticationMiddleware