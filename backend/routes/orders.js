const express = require("express");
const ordersRouter = express.Router();
const requireUser = require("./middleware/requireUser")
const { getAllOrders, createOrder,getOrderById } = require("../db/orders")



ordersRouter.get('/', async(req, res) => {
    
    const orders = await getAllOrders();

    res.send({orders});
});

ordersRouter.get('/:orderId', async(req, res) => {
    
    const id  = req.params.orderId;
    const order = await getOrderById(id);

    res.send({order});
});

ordersRouter.post('/', async(req, res, next) => {

    const { userId, addressId, products} = req.body;
    console.log(userId, addressId, products)

    const order = await createOrder(userId, addressId, products)

    res.send(order);
});

// ordersRouter.patch('/:orderId', req, res => {

//     orders = []; // 

//     res.send(orders);
// });


// ordersRouter.delete('/:orderId', req, res => {

//     orders = []; // 

//     res.send(orders);
// });










module.exports = ordersRouter;