const express = require("express");
const cartRouter = express.Router();
const requireUser = require("./middleware/requireUser");
const { getCartByUserId,
    addToCart,
    removeFromCart,
    clearCart } = require('../db/cart');


// Need to ensure userId gets passed to here!
cartRouter.get('/', requireUser, async(req, res) => {
    try{
        const cart = await getCartByUserId( req.user.id );
        res.send( cart );
    } catch(error){
        throw error;
    }
});


cartRouter.post('/', requireUser, async(req, res) => {
    const userId = req.user.id; 
    const { productId, quantity } = req.body;

    try{
        await addToCart({ userId, productId, quantity });
        const cart = await getCartByUserId( userId );
        res.send( { cart } );
    } catch(error){
        console.error(error);
        next( { name: "Product Post Error", message: "An error was encountered while adding this product to the cart." } )
    }
});


//here we need to see both the userId and a specific productId is specified
cartRouter.delete('/', requireUser, async(req,res,next) => {
    const userId = req.user.id;
    const { productId } = req.body;

    try{
        if( productId ){
            await removeFromCart( { userId, productId } );
        } else{
            await clearCart( userId );
        }
        const cart = await getCartByUserId( userId );
        res.send(cart);
    } catch(error){
        throw error;
    }
})

module.exports = cartRouter;