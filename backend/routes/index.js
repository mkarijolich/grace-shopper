const apiRouter = require('express').Router();

// apiRouter.get("/", (req, res, next) => {
//   res.send({
//     message: "API is under construction!"
//   });
// });

// attach other routers from files in this api directory (users, activities...)
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// const productsRouter = require('./products');
// apiRouter.use('/products', productsRouter);

// const ordersRouter = require('./orders');
// apiRouter.use('/orders', ordersRouter);

// const orderProductsRouter = require('./order_products');
// apiRouter.use('/order_products', orderProductsRouter);

apiRouter.use((error, req, res, next) => {
  const status = error.status ? error.status : 500

  res.status(status);
  res.send({
    error: {
      name: error.name,
      message: error.message
    }
  });
});






module.exports = apiRouter;
