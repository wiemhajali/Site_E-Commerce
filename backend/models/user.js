const mongoose = require("mongoose")
let User = mongoose.model("users", {
    firstname: {
        type: String,
        required: true // champ obligatoire
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "client"
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
}) //comporte 2 paramteres : User ou objet json
module.exports = User