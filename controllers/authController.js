const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../models/UsersSchema')

async function authenticateUser(req, res){
    let user = await Users.findOne({email: req.body.email})
    if(!user) return res.status(404).json({message: "User not found", data: null})

    let isMatch = bcrypt.compareSync(req.body.password, user.password)
    if(!isMatch) return res.status(400).json({message: "Passwords don't match", data: null})

    let payload = { email: req.body.email }
    let token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1d'})
    req.user = payload

    return res.status(200).json({message: "Logged in", data: {...user, token: token}})
}

module.exports = {authenticateUser}