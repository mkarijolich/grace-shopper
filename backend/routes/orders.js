const express = require("express");
const ordersRouter = express.Router();



ordersRouter.get('/', req, res => {

    orders = []; // 

    res.send(orders);
});

module.exports = ordersRouter;