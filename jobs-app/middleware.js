const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.json({"message": "token not found"})
    }
    const token = authHeader.split(" ")[1];
    
    const payload = jwt.verify(token, "bansec")
    
    req.user = { userId: payload.userId, name: payload.name};

    next()
}

module.exports = auth