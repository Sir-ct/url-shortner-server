const mongoose = require('mongoose')


function connectDB(string){
    
mongoose.connect(string).then((res)=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})

}

module.exports = {connectDB}