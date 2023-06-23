const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    },
    qr_code: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('url', UrlSchema)