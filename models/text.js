const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Tao model
const textSchema = new Schema({
    text : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('text', textSchema)