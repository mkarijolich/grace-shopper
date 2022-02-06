const express = require("express");
const productsRouter = express.Router();
const requireUser = require("./middleware/requireUser");
const { createProduct,
    getProductByCategory,
    getProductByName,
    getProductById,
    getAllProducts,
    updateProduct,
    addPictureLinksToProduct,
    deleteProduct } = require('../db/products');
const { getProductPicturesById,
    getAllProductPictures } = require("../db/products_pictures");
// Get list of all products
productsRouter.get('/', async(req, res) => {
    try{
        const products = await getAllProducts(); // getProducts();  TODO: call the database when it's ready
        // const allPictures = await getAllProductPictures();
        // allProducts.forEach((product) => {
        //     product.pictureLinks = [];
        // });
        // allPictures.forEach((picture) => {
        //     allProducts[picture.productId].pictureLinks.push(picture.link);
        // });
        res.send( { products } );
    } catch(error){
        throw error;
    }
});
productsRouter.get('/:productId', async (req, res) => {
    try{
        const product = await getProductById( id );
        const pictures = await getProductPicturesById( id );
        product.pictureLinks = pictures;
        res.send( { product } );
    } catch(error){
        throw error;
    }
});
productsRouter.get('/category/:category', async (req, res) => {
    const { category } = req.params.category;
    try{
        const products = await getProductByCategory( category );
        const pictures = products.map((element) => {
             getProductPicturesById( element.id )
        });
        products.forEach((product) => {
            product.pictureLinks = [];
        });
        pictures.forEach((picture) => {
            allProducts[picture.productId].pictureLinks.push(picture.link);
        });
        res.send( { products } );
    } catch(error){
        throw error;
    }
});
productsRouter.post('/', async(req, res) => {
    const { name, detail, category, price, linksArray } = req.body;
    try{
        const product = await createProduct({ name, detail, category, price });
        const pictures = linksArray.map((element) => {
             addPictureLinksToProduct( element, product.id);
        });
        product.pictureLinks = pictures;
        res.send( { product } );
    } catch(error){
        console.error(error);
        next( { name: "Product Post Error", message: "An error was encountered while creating the listing for this product." } )
    }
});
productsRouter.patch('/:productId',requireUser,async(req,res,next) => {
    const id = req.params.productId;
    const { name, detail, category, price, linksArray } = req.body;
    try{
        const product = await updateProduct( { name, detail, category, price, linksArray } );
    } catch(error){
        console.error(error);
    }
    res.send( { product } );
})
productsRouter.delete('/:productId',requireUser,async(req,res,next) => {
    try{
        const id = req.params.productId
        const product = await deleteProduct( id );
        res.send({
            product
        })
    }catch ({ name, message }) {
        next({ name, message });
    }
    res.send(products);
})
 module.exports = productsRouter;