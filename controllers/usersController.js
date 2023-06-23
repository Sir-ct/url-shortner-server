const Users = require('../models/UsersSchema')
const bcrypt = require('bcryptjs')

async function registerUser(req, res){
    let user = await Users.findOne({email: req.body.email})
    if(user) return res.status(400).json({message: "User with email already exists", data: null})
    
    let salt = bcrypt.genSaltSync(10)
    let hashedPassword = bcrypt.hashSync(req.body.password, salt)

    user = await new Users({
        email: req.body.email,
        password: hashedPassword
    }).save()

    return res.status(201).json({message: "User created successfully", data: user})
}

async function getUser(req, res){
    let user = await Users.findOne({email: req.user.email})
    if(!user) return res.status(404).json({message: "User not found", data: null})

    return res.status(200).json({message: "User found", data: user})
}

module.exports = {registerUser, getUser}