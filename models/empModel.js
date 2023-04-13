const mongoose = require('mongoose');
const {Schema} = mongoose;

const empSchema = new Schema({
    Id:Number,
    Name:{
        type:String,
        required:true,
    },
    No:{
        type:Number
    },
    Email:{
        type:String,
        required:[true,'Email is required']
    },
})

module.exports = mongoose.model("Employee",empSchema)