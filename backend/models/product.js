const mongosse = require("mongoose")

let Product = mongosse.model("products", {
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    categoryId: {
        type: String,
        trim: true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
module.exports = Product