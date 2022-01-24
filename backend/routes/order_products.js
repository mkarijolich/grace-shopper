const express = require("express");
const orderProductsRouter = express.Router();
const requireUser = require('./middleware/requireUser');
const requireAdmin = require('./middleware/requireAdmin');

const {
    getProductByOrderId,
    updateProductByOrderId
} = require('../db/order_products');

//filtered by status 
orderProductsRouter.patch('/:orderProductsId',requireAdmin, async(req,res,next) => {
    try{
        const { orderProductsId } = req.params;
        // const { count, duration } = req.body;
    
        const updateFields = {
            id:orderProductsId
        }
    
        const order = await updateProductByOrderId(updateFields);
    
        res.send({
            order
        })
    }catch ({ name, message }) {
        next({ name, message });
    }
})

module.exports = orderProductsRouter;
