
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    // username and password are handled by PLM (passport-local-mongoose)

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true // Ensure email is unique
    },
    role: {
        type: String,
        default: 'buyer'
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    wishlist: [ // Wishlist functionality
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    cart: [ // Cart functionality
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    googleId: { // For Google OAuth integration
        type: String,
        unique: true,
        sparse: true // Allow null values for users who sign up locally
    }
});

// Apply passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', userSchema);
module.exports = User;
