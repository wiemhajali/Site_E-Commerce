const path = require('path');
const fs = require('fs')
const express = require('express'); /* import bib */
const multer = require('multer')


const Product = require('./../models/product')
const Category = require('./../models/category')
const app = express();



function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
const storage = multer.diskStorage({
    destination: './public',
    filename: function (req, file, cb) {
        console.log(
            req.body.name
        );
        let name = req.body.name.replace(' ', '').toLowerCase();
        cb(null, name + '-' +
            Date.now
                () + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

app.get('/all', async (req, res) => {

    try {

        let products = await Product.find()
        //tableau bch njibuo fih el produit bel category mtee3ha
        let allProducts = []
        for (let i = 0; i < products.length; i++) {
            // objet fih el produit
            let product = products[i]
            //jebna objet bel id fih el category eli fel produit 
            let category = await Category.findOne({ _id: products[i].categoryId })
            //push eli heyaa bch nzidou les objet fel tableau mtee3na 
            allProducts.push({ product, category })

        }
        res.status(200).send(allProducts)

        // el "e" heya eli bch tkharaajlek el erreur win bkhlef lmessage 
    } catch (e) {
        res.status(400).send({ message: "product not found" })

    }

});


app.get('/stat', async (req, res) => {
    try {
        let nProduct = await Product.find({ categoryId: "60bf469c9f285743d88b7f1c" })
        let ppm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


        for (let i = 0; i < nProduct.length; i++) {
            ppm[nProduct[i].createdAt.getMonth()]++
        }
        res.status(200).send({ nbrProduct: nProduct.length, productParMonth: ppm })
    } catch {
        res.status(400).send({ message: "product not found" })
    }
})

app.delete('/delete/:id', async (req, res) => {
    /* let productId=req.params.id
  Product.findOneAndDelete({_id:productId}).then((product)=>{
      if(!product){
          res.status(404).send({message:"product not found"})
      }
      else{
          res.status(200).send({message:"product deleted"})
      }
  }
  ).catch(()=>{
      res.status(400).send({message:"id not found"})
  })*/
    try {
        let productId = req.params.id
        const product = await Product.findByIdAndDelete({ _id: productId })
        if (!product) {
            res.status(404); send({ message: 'product not found' })
        }
        else {
            fs.unlinkSync('./public/' + product.image)
            res.status(200).send({ message: "product deleted" })

        }
    } catch {
        res.status(400).send({ message: "product not found" })
    }
})
app.post('/add', upload.single('image'), (req, res) => {
    //request totleb hajaa response al ijebaa 3alaa etalaab
    let data = req.body
    let file = req.file
    let product = new Product({
        name:data.name,
        price: data.price,
        image: file.filename,
        description: data.description,
        categoryId: data.categoryId
    })
    product.save
        ()
        .then(() => {
            res.status(201).send({ message: "product registred seccessfuly" })
        })
        .catch((e) => {
            res.status(400).send({ message: "product not registred", e })
        })


    /* 
    
                     try catch
    try {
         let data = req.body
         //password securisation
         let product = new Product({
             name: 
data.name
,
             price: data.price,
             image: data.image,
             description: data.description,
             categoryId: data.categoryId
         })
         let uresFromDb = await 
product.save
()
         // "userFromDb" howa nafs el objet bch yarjaa3lek
         res.status(201).send({ message: "product registred seccessfuly" })
     } catch (e) {
         res.status(400).send({ message: " failed", e })
 
     }*/
});
app.patch('/update-info/:id', upload.single('image'), async (req, res) => {
    /*let data = req.body
    let productId = req.params.id
    Product.findOneAndUpdate({_id:productId},data).then((product)=>{
      if(!product){
          res.status(404).send({message:"Not Found"})
      }
      else{
          res.status(200).send(product)
      }
    }).catch((e)=>{
        res.status(400).send({message:"id Not found"})
    })*/
    try {
        let data = req.body
        let productId = req.params.id
        product = await Product.findOne({ _id: productId })
        if (!product) {
            res.status(404).send({ message: "product not found" })
        }
        else {
            if (req.file) {
                fs.unlinkSync('./public/' + product.image)
                product.image = req.file.filename
            }
            if (data.name) {
                let name = req.body.name.replace(' ', '').toLowerCase();
                let newname = name + '-' + Date.now() + path.extname(req.file.originalname);
                fs.renameSync('./public/' + product.image, './public/' + newname)
                product.image = newname

            }

            data.description ? product.description = data.description : null
            data.price ? product.price = data.price : null
            data.categoryId ? product.categoryId = data.categoryId : null
            await product.save()
            res.status(200).send({ message: "product update" })
        }
    } catch (e) {
        res.status(400).send(e)
    }
})
app.get('/one/:id', async (req, res) => {
    try {
        let prouctId = req.params.id
        let product = await Product.findOne({ _id: prouctId })
        if (!product) {
            res.status(404).send({ message: "product not found" })
        }
        else {
            res.status(200).send(product)
        }

    } catch (e) {
        res.status(400).send({ message: "idCategory not found" })
    }

})
module.exports = app; /** export app  */