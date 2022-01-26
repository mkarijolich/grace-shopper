const express = require("express");
const productsRouter = express.Router();
const requireUser = require("./middleware/requireUser");
const { createProduct,
    getProductByCategory,
    getProductByName,
    getProductsById,
    getAllProducts,
    updateProduct,
    addPictureLinksToProduct,
    deleteProduct } = require('../db/products');
  

// Get list of all products
productsRouter.get('/', async(req, res) => {

    try{
        const products = await getAllProducts(); // getProducts();  TODO: call the database when it's ready
        // const pictures = await getAllProductPictures();
        const pictures = [];
        pictures.forEach((element) => {
            
        });
        res.send( { products, pictures } );
    } catch(error){
        throw error;
    }


});



productsRouter.post('/', async(req, res) => {

    const { name, detail, category, price, linksArray } = req.body;

    try{
        const product = await createProduct(req.body); // postProducts();  TODO: call the database when it's ready
        res.send( { product } );
    } catch(error){
        console.error(error);
        next( { name: "Product Post Error", message: "An error was encountered while creating the listing for this product." } )
    }
});

// for require user, we should probably check in there whether a user is an admin or not to set thier permissions in the router
productsRouter.patch('/:productId',requireUser,async(req,res,next) => {

    const { name, detail, category, price, linksArray } = req.body;

    try{
        const product = await updateProduct( { name, detail, category, price, linksArray } );
    } catch(error){
        console.error(error);
    }

    res.send( { product } );
})

// productsRouter.delete('/:productId',requireUser,async(req,res,next) => {

//     products = [];

//     res.send(products);

// })



 module.exports = productsRouter;