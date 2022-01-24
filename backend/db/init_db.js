// code to build and initialize DB goes here
const client = require('./client');

//THOUGHT THOGUHT THOUGHT THOUGHT THOUGHT: should we add a "userId" column to products so that way we can see all products listed
// by a specific user???????? also, a "category" column so users can sort products by category when browsing

const { createUser,
  getUser,
  getUserById,
  getUserByUsername } = require('./users');

const { createProduct,
  getProductByCategory,
  getProductByName,
  getProductsById,
  getAllProducts,
  updateProduct,
  addPictureLinksToProduct,
  deleteProduct } = require('./products');

async function buildTables() {
  try {

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS cart_products;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products_pictures;
    DROP TABLE IF EXISTS products;
`);

    //added account_type on userstable
    // build tables in correct order
    //IMPORTANT IMPORTANT IMPORTANT: in product table i added the column price, and in order table i added the column total
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      detail varchar(255) NOT NULL,
      category varchar(255) NOT NULL,
      price INTEGER
    );

    CREATE TABLE products_pictures(
      id SERIAL PRIMARY KEY,
      link varchar(900) NOT NULL,
      "productId" INTEGER REFERENCES products(id)
    );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      account_type VARCHAR(255) NOT NULL
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      status VARCHAR(255) NOT NULL,
      total INTEGER
    );

    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "orderId" INTEGER REFERENCES orders(id),
      quantity INTEGER NOT NULL
    );

    CREATE TABLE cart_products(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER
    );
  `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    const testUsers = [
      { username: 'ChrisG', password: 'password1', account_type:'CUSTOMER' },
      { username: 'Maki', password: 'password2', account_type:'ADMIN'  },
      { username: 'Darshan', password: 'password3' ,account_type:'CUSTOMER' },
      { username: 'ChrisA', password: 'password4',account_type:'ADMIN' }
    ]

    console.log('Populating users table with seed data...');
    const users = await Promise.all(testUsers.map(createUser));
    console.log("Creating users successful! Our users are: ", users);

    /* These test products test out several cases, they are:
      1. base case
      2. case with multiple picture links
      3. case with no picture links
      4. case with non-unique category to help us test search by category later on
    */
    const testProducts = [
      { name: "Ceiling Fan", detail: "A fan on the ceiling", category: "Home Goods", price: 75, linksArray: ["https://images.thdstatic.com/productImages/62152035-b1f7-496d-8f66-9d024ddc6d2e/svn/bronze-hampton-bay-ceiling-fans-with-lights-52051-e1_600.jpg"] },
      { name: "Door Handle", detail: "A handle on a door", category: "Essentials", price: 10, linksArray: ["https://www.busterandpunch.com/us/wp-content/uploads/sites/2/2020/03/2.-BusterPunch_Door_Handle_Front_Fixed_Brass-scaled.jpg", "https://www.busterandpunch.com/us/wp-content/uploads/sites/2/2021/04/Door-handle_Fixed_Linear_Welders-Black_A2_Web_Square-scaled.jpg"] },
      { name: "72in TV", detail: "A really big TV", category: "Electronics", price: 775, linksArray: [] },
      { name: "Analogue Clock", detail: "A clock that is analogue", category: "Home Goods", price: 120, linksArray: ["https://www.clockway.com/mm5/img/CHM/CHM-611132-L1.jpg"] }
    ]

    console.log('Populating products table with seed data...');
    const products = await Promise.all(testProducts.map(createProduct));
    console.log("Creating products successful! Our products are: ", products);



  } catch (error) {
    throw error;
  }
}

client.connect() //connect to db
buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());