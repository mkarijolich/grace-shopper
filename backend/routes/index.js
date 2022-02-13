const apiRouter = require('express').Router();

// apiRouter.get("/", (req, res, next) => {
//   res.send({
//     message: "API is under construction!"
//   });
// });

const jwt = require('jsonwebtoken');
const { JWT_SECRET  = 'nevertell' } = process.env;

const userMiddleware = require('./middleware/userMiddleware')
apiRouter.use(userMiddleware);

// attach other routers from files in this api directory (users, activities...)
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const orderProductsRouter = require('./order_products');
apiRouter.use('/order_products', orderProductsRouter);

const adminRouter = require('./admin');
apiRouter.use('/admin',adminRouter);

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

const addToCartRouter = require('./addToCartRouter');
apiRouter.use('/addToCartRouter', addToCartRouter);


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
