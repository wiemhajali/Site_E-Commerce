const express = require('express'); /* import bib */
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./../models/user') //import user

const app = express();

app.post('/login', async (req, res) => {
   /* data = req.body
    User.findOne({email:data.email}).then((userFromDb)=>{
        if(!userFromDb){
            res.status(404).send({message:"user not found"})
        }
        else{
            let compre = bcrypt.compareSync(data.password,userFromDb.password)
            if(!compre){
                res.status(404).send({message:"user not found"})
            }
            else{
                let myToken = jwt.sign({id:userFromDb._id,role:userFromDb.role},"ABC123")
                res.status(200).send({token:myToken})
            }
        }
    }).catch(()=>{
        res.status(400).send({message:"user not found"})
    }) */
    try{
     data = req.body
     const userFromDb =  await User.findOne({email:data.email})
     if(!userFromDb){
         res.status(404).send({message:"user not found"})
     }
     else{
         let compre = bcrypt.compareSync(data.password,userFromDb.password)
         if(!compre){
             res.status(404).send({message:"user not found"})
         }
         else{
             let myToken = jwt.sign({id:userFromDb._id,role:userFromDb.role},"ABC&é")
             res.status(200).send({token:myToken})
         }
     }
    }catch(e){
     res.status(400).send({message:"user not found"})
    }

})


app.post('/register',async (req, res) => {
    try {
        let data = req.body
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
        let user = new User({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password
        })
        let userFromDb = await user.save()
        res.status(201).send({ userFromDb })
    } catch (e) {
        res.status(400).send({ message: "user not register", e })
    }
})

app.get('/stat', async(req, res) => {
   try{
    let nbUsers = await User.find({role:"client"})
    let cpm = [0,0,0,0,0,0,0,0,0,0,0,0]

    
    for(let i=0;i<nbUsers.length;i++){
        cpm[nbUsers[i].createdAt.getMonth()]++
    }
    res.status(200).send({nbrClients:nbUsers.length , clientParMonth:cpm})
   }catch{
    res.status(400).send({message:"user not found"})
   }
})

app.put('/change-state/:id', (req, res) => {
    let data = req.body
    let userId = req.params.id
    console.log(data);
    console.log(userId);
    res.status(200).send({ message: "change-state succes" })
})

app.delete('/delete/:id', async(req, res) => {
  /*  let userId = req.params.id
    User.findOneAndDelete({ _id: userId }).then((user) => {
        if (!user) {
            res.status(404).send({ message: "user not found" })
        }
        else {
            res.status(200).send({ message: "user  deleted" })
        }
    }).catch(() => {
        res.status(400).send({ message: "id not found" })
    })
*/
try{
let userId = req.params.id
let user =  await User.findOneAndDelete({_id:userId})
if(!user){
    res.status(404).send({message:"user not found"})
}
else{
    res.status(200).send({message:"user deleted"})
}
}catch{
     res.status(400).send({message:"user not found"})
}
}


)

app.get('/all', async (req, res) => {
    /*   User.find()
           .then((users)=>{
               res.status(200).send(users)
           })*/
    try {
        let users = await User.find()
        res.status(200).send(users)
    }
    catch (e) {
        res.status(400).send({ message: "error", e })
    }

})


module.exports = app; /** export app  */