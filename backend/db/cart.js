const client = require("./client")



async function getCartByUserId( userId ){
    console.log("Getting cart by userId: ", userId);
    try{
        const { rows: cart } = await client.query(`
            SELECT *
            FROM cart
            WHERE "userId"=$1;
        `, [ userId ]);
        return cart;
    } catch(error){
        throw error;
    }
}


async function addToCart( { userId, productId } ) {
    console.log("Adding product to cart!");
    try{
        const { rows: [ product ] } = await client.query(`
            INSERT INTO cart("userId","productId")
            VALUES($1, $2)
            RETURNING *;
        `, [ userId, productId ]);
        return product;
    } catch(error){
        throw error;
    }
}



async function removeFromCart( { userId, productId } ){
    console.log("Removing product from cart!");
    try{
        const { rows: [ product ] } = await client.query(`
            DELETE FROM cart
            WHERE "productId"=$1
            AND "userId"=$2
        `, [ productId, userId ]);
        return product;
    } catch(error){
        throw error;
    }
}


//NOTE: whenever a cart is purchased, it must be cleared, and its contents added to an order log along with the address
async function clearCart( {userId } ){
    console.log("Clearing cart!");
    try{
        const {rows: products } = await client.query(`
            DELETE FROM cart
            WHERE "userId"=$1
        `[ userId ]);
        return products;
    } catch(error){
        throw error;
    }
}


module.exports = {
    getCartByUserId,
    addToCart,
    removeFromCart,
    clearCart
}

