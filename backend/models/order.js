const mongosse = require("mongoose")
let Order = mongosse.model('orders',{
    data:{
     type:Date,
     default:new Date()
    },
    state:{
     type:Boolean,
     default:false
    },
    idClient:{
       type:String,
       required:true
    },
    products:{
        type:[mongosse.Schema.Types.Mixed], // objet json
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
module.exports = Order