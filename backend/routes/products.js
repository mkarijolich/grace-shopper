const express = require("express");
const { getAllProducts } = require("../db");
const productsRouter = express.Router();
const requireUser = require("./middleware/requireUser")


// Get list of all products
productsRouter.get('/', async(req, res) => {

    const products = await getAllProducts(); // getProducts();  TODO: call the database when it's ready

    res.send({products});
});



// productsRouter.post('/', req, res => {

//     products = []; // postProducts();  TODO: call the database when it's ready

//     res.send(products);
// });


// productsRouter.patch('/:productId',requireUser,async(req,res,next) => {

//     products = [];

//     res.send(products);

// })

// productsRouter.delete('/:productId',requireUser,async(req,res,next) => {

//     products = [];

//     res.send(products);

// })



 module.exports = productsRouter;