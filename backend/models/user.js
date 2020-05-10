const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },  
    creationDate: { 
        type: Date, 
        default: Date.now 
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;