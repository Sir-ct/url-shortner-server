require('dotenv').config()

const express = require('express')
const {connectDB} = require('./db/db')
const {nanoid} = require('nanoid')
const Urls = require('./models/UrlSchema')
const {validateUrl} = require('./middlewares/validations')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

connectDB(process.env.MONGO_STRING)



app.get("/", (req, res)=>{
    res.send("Welcome to URL Shortner :)")
})

app.get("/geturl", async(req, res)=>{
    let url = await Urls.find()

   return res.status(200).json({message: "URLs found", data: url})
})

app.post("/createurl", validateUrl, async (req, res)=>{
    console.log(req.body)

    let urlBody = {
        full_url: req.body.full_url,
        short_url: req.body.custom_url ? req.body.custom_url : nanoid(6)
    }

    let url = new Urls(urlBody)
    url = await url.save()

    return res.status(201).json({message: "Url created successfully", url})
})


app.listen(4000, console.log("server is listening on port 4000"))