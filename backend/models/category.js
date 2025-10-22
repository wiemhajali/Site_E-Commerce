const mongosse = require("mongoose")
let Category = mongosse.model("categories", {
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
module.exports=Category