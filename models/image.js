const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Tao model
const imageSchema = new Schema({
    image : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('image', imageSchema)