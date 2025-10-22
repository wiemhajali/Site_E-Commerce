const express = require('express'); /* import bib */

const app = express();

const Category = require('./../models/category')

app.get('/all', async (req, res) => {
    try {
        let categories = await Category.find()
        res.status(200).send(categories)
    } catch (error) {
        res.status(400).send({ message: "category not found" })
    }

})

app.get('/stat', async (req, res) => {

    try {
        let nCategory = await Category.find({ name: "laptop" })
        let cpm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


        for (let i = 0; i < nCategory.length; i++) {
            cpm[nCategory[i].createdAt.getMonth()]++
        }
        res.status(200).send({ nbCategory: nCategory.length, CategoryParMonth: cpm })
    } catch {
        res.status(400).send({ message: "Category not found" })
    }
})

app.delete('/delete/:id', async (req, res) => {
    /* let categoryId = req.params.id
     Category.findOneAndDelete({ _id: categoryId }).then((category) => {
         if (!category) {
             res.status(404).send({ message: "category not found" })
         }
         else {
             res.status(200).send({ message: "category deleted" })
         }
     }
     ).catch(() => {
         res.status(400).send({ message: "id not found" })
     })*/
    try {
        let categoryId = req.params.id
        const category = await Category.findByIdAndDelete({ _id: categoryId })
        if (!category) {
            res.status(404).send({ message: "category not found" })
        }
        else {
            res.status(200).send({ message: "category deleted" })
        }
    } catch {
        res.status(400).send({ message: "category not found" })
    }
})

app.post('/add', async (req, res) => {

    /*  let data = req.body
  
      let category = new Category({
          name: data.name,
      })
  
      category
          .save()
          .then(() => {
              res.status(201).send({ message: "cateogry added successfully" })
          }).catch(() => {
              res.status(400).send({ message: "cateogry is not successfully" })
          })*/
    try {
        let data = req.body
        let category = new Category({
            name: data.name
        })
        categoryfrombase = await category.save()
        if (!categoryfrombase) {
            res.status(404).send({ message: "category not found" })
        }
        else {
            res.status(200).send({ message: "cateogry add" })
        }
    } catch (e) {
        res.status(400).send({ message: "category not found" })
    }
})

app.get('/one/:id', async (req, res) => {
    //id 
    try {
        let categoryId = req.params.id
        let category = await Category.findOne({ _id: categoryId })
        if (!category) {
            res.status(404).send({ message: "category not found" })

        }
        else {
            res.status(201).send(category)
        }
    } catch (e) {
        res.status(400).send({ message: "idCategory not found" })
    }

})

app.patch('/update-info/:id', async (req, res) => {
    /* let data = req.body
     let categoryId = req.params.id
     Category.findOneAndUpdate({ _id: categoryId }, data)
         .then((category) => { //resultat mt3 function 
             if (!category) {
                 res.status(404).send({ message: " id Not Found" })
             }
             else {
                 res.status(200).send(category)
             }
         }).catch(() => {
             res.status(400).send({ message: "category not found" }) //400 forma mt3 id mech sa7i7a
         })*/
    try {
        let data = req.body
        let cateogryId = req.params.id
        category = await Category.findOneAndUpdate({ _id: cateogryId }, data)
        if (!category) {
            res.status(404).send({ message: "category not found" })
        }
        else {
            res.status(200).send(category)
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = app; /** export app  */