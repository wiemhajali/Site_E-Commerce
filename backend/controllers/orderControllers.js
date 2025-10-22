
const express = require('express'); /* import bib */
const Order = require('./../models/order') //import order

const app = express();
app.get('/stat',async(req,res)=>{


    try{
        let nOrder = await Order.find({idClient:"60c485edafe6fd3c605a0064"})
        let opm = [0,0,0,0,0,0,0,0,0,0,0,0]
    
        
        for(let i=0;i<nOrder.length;i++){
            opm[nOrder[i].createdAt.getMonth()]++
        }
        res.status(200).send({nbrOrder:nOrder.length , OrderParMonth:opm})
       }catch{
        res.status(400).send({message:"Order not found"})
       }
    
})
app.get('/all',async(req,res)=>{
    try{
        let order= await Order.find()
        res.status(200).send(order)
    }catch(e){
        res.status(400).send({message:"order not found"})
    }
})
app.post('/add',async(req,res)=>{
    try {
        let data = req.body
        
        let order = new Order({
            idClient : data.idClient,
            products  : data.products
        })
        let orderFromDb = await order.save()
        res.status(201).send({ orderFromDb })
    } catch (e) {
        res.status(400).send({ message: "order not register", e })
    }
})
app.get('/one/:id',async(req,res)=>{
    try{
        let orderId = req.params.id
        let order = await Order.findOne({_id:orderId})
        if(!order){
            res.status(404).send({message:"product not found"})
        }
        else{
            res.status(200).send(order)
        }
    
    }catch(e){
           res.status(400).send({message:"idCategory not found"})
    }
})
app.put('/changer-state/:id',(req,res)=>{
    console.log("API works")
    res.status(200).send({message:"succes"})
})
app.get('/all/:id',async(req,res)=>{
    try{
        let id = req.params.id
        let order= await Order.find({idClient:id})
        res.status(200).send(order)
    }catch(e){
        res.status(400).send({message:"order not found"})
    }
})
app.delete('/delete/:id', async (req, res) => {
  /*  let orderId=req.params.id
    Order.findOneAndDelete({_id:orderId}).then((order)=>{
        if(!order){
            res.status(404).send({message:"order not found"})
        }
        else{
            res.status(200).send({message:"order deleted"})
        }
    }
    ).catch(()=>{
        res.status(400).send({message:"id not found"})
    })*/
    try{
        let orderId = req.params.id
        let order = Order.findByIdAndDelete({_id:orderId})
        if(!order){
            res.status(404).send({message:'order not found'})
        }
        else{
            res.status(200).send({message:"order deleted"})
        }

    }catch{
        res.status(400).send({message:"order not found"})
    }
   })
module.exports = app; /** export app  */