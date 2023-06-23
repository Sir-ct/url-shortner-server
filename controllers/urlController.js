const {nanoid} = require('nanoid')
const QRcode = require('qrcode')
const Urls = require('../models/UrlSchema')
const Users = require('../models/UsersSchema')

//get url controller
const getUrl =  async(req, res)=>{
    console.log(req.protocol)
    let user = await Users.findOne({email: req.user.email})
    if(!user) return res.status(400).json({message: "User not found", data: null})
    
    let url = await Urls.find({user_id: user._id})

   return res.status(200).json({message: "URLs found", data: url})
}

// add url controller 
const addUrl = async (req, res)=>{
    console.log(req.body)

    let user = await Users.findOne({email: req.user.email})
    if(!user) return res.status(400).json({message: "User not found", data: null})

    let qrcode;
    await QRcode.toDataURL(req.body.full_url).then((res)=>{
        console.log(res)
        qrcode = res
    })
    let protocolhost = req.protocol + "://" + req.headers.host + "/"

    let urlBody = {
        full_url: req.body.full_url,
        short_url: req.body.custom_url ? protocolhost + req.body.custom_url : protocolhost + nanoid(6),
        qr_code: qrcode,
        user_id: user._id
    }

    let url = new Urls(urlBody)
    url = await url.save()

    return res.status(201).json({message: "Url created successfully", url})
}

const visitUrl = async (req, res)=>{
    let linkCheck = req.protocol + "://" + req.headers.host + "/" + req.params.url
    let url = await Urls.findOne({short_url: linkCheck})
    if(!url) return res.status(404).json({message: "Url not found", data: null})

    res.redirect(url.full_url)
    url.clicks ++
    url.save()

}

module.exports = {addUrl, getUrl, visitUrl}