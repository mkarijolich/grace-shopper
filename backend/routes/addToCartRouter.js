const express = require("express");
const addToCartRouter = express.Router();
const requireUser = require("./middleware/requireUser");
const {
    addToCart,
    removeFromCart
} = require('../db/cart');


// Need to ensure userId gets passed to here!
addToCartRouter.post('/:productId', async(req, res) => {
    const { userId, productId } = req.body;
    try{
        await addToCart(req.body);
        const cart = awaitCartByUserId( userId );
        res.send( { cart } );
    } catch(error){
        console.error(error);
        next( { name: "Product Post Error", message: "An error was encountered while adding this product to the cart." } )
    }
});


//here we need to see both the userId and a specific productId is specified
addToCartRouter.delete('/:productId',requireUser,async(req,res,next) => {
    const { userId, productId } = req.body;
    try{
        if( productId ){
            await removeFromCart( req.body );
        } else{
            await clearCart( userId );
        }
        const cart = await getCartByUserId( userId );
        res.send(cart);
    } catch(error){
        throw error;
    }
})


module.exports = addToCartRouter;