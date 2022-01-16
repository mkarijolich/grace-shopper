
// Get list of all products
productsRouter.get('/', req, res => {

    products = []; // getProducts();  TODO: call the database when it's ready

    res.send(products);
});


