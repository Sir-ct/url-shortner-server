const jwt = require('jsonwebtoken')

async function isUserAuthenticated(req, res, next){
    let token = req.headers["short-token"]
    if(!token) return res.status(401).json({message: "Unauthorized", data: null})

    try{
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded
        next()
    }catch(err){
        return res.status(401).json({message: err.message, data: null})
    }
}

module.exports = {isUserAuthenticated}
