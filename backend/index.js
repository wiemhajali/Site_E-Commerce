const express = require('express');
 /* import bib */
 
 const cors = require('cors')
require('./configue/db')
const userController = require("./controllers/userControllers")
const productController = require("./controllers/productControllers")
const categoryController = require("./controllers/categoryControllers")
const orderController = require("./controllers/orderControllers")
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json())// pr comprendre ce qui est ds body
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

 app.use("/user",userController)
 app.use("/product",productController)
 app.use("/category",categoryController)
 
 app.use("/order",orderController)



app.listen(port, () => {
    console.log(`serveur started on port ${port}`);
})
