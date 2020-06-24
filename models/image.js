const mongoose=require("mongoose");

const imageSchema=mongoose.Schema({
    url : { type : String , required: true},
    name : { type : String , required: false},
    type : { type : String , required : false}
})

const images= module.exports = mongoose.model('images',imageSchema);