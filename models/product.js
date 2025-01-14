

const mongoose = require('mongoose'); // boject
const Review = require('./review');
// schema

const productSchema = new mongoose.Schema({
    name:{
    type:String,
    trim:true,  // esmai jaise tum extra space doge to bo trim ho jayga matlab hat jayga
    required:true  
    },
 
    img:{
        type:String,
        trim:true,
        required:true

    },

    price:{
        type:Number,
        min:0,
        required:true
    },
    
    istock:{
        type:Boolean,
        default:true,
    },

    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    
    ],
    author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

});


let Product = mongoose.model('Product' , productSchema);

module.exports = Product;