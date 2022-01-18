const express = require("express");
const ordersRouter = express.Router();
const requireUser = require("./middleware/requireUser")



ordersRouter.get('/', req, res => {

    orders = []; // 

    res.send(orders);
});

ordersRouter.post('/', req, res => {

    orders = []; // 

    res.send(orders);
});

ordersRouter.patch('/:orderId', req, res => {

    orders = []; // 

    res.send(orders);
});


ordersRouter.delete('/:orderId', req, res => {

    orders = []; // 

    res.send(orders);
});










module.exports = ordersRouter;