const express = require("express");
const productsRouter = express.Router();
const requireUser = require("./middleware/requireUser")


// Get list of all products
productsRouter.get('/', req, res => {

    products = []; // getProducts();  TODO: call the database when it's ready

    res.send(products);
});



productsRouter.post('/', req, res => {

    products = []; // postProducts();  TODO: call the database when it's ready

    res.send(products);
});


productsRouter.patch('/:productId',requireUser,async(req,res,next) => {

    products = [];

    res.send(products);

})

productsRouter.delete('/:productId',requireUser,async(req,res,next) => {

    products = [];

    res.send(products);

})



 module.exports = productsRouter;