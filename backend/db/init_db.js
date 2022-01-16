// code to build and initialize DB goes here
const client = require('./client');

const { createUser } = require('./users')

async function buildTables() {
  try {

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
`);
    // build tables in correct order
    //IMPORTANT IMPORTANT IMPORTANT: in product table i added the column price, and in order table i added the column total
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      detail varchar(255) NOT NULL,
      price INTEGER
    );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      total INTEGER
    );

    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "orderId" INTEGER REFERENCES orders(id)
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
      { username: 'ChrisG', password: 'password1' },
      { username: 'Maki', password: 'password2' },
      { username: 'Darshan', password: 'password3' },
      { username: 'ChrisA', password: 'password4'}
    ]

    //still have to make createUser
    const users = await Promise.all(testUsers.map(createUser))

    const testProducts = [
      { name: "Ceiling Fan", description: "A fan on the ceiling"},
      { name: "Door Handle", description: "A handle on a door"},
      { name: "Kitchen Cabinet", description: "A cabinet in a kitchen"},
      { name: "Analogue Clock", description: "A clock that is analogue}"}
    ]
  } catch (error) {
    throw error;
  }
}

client.connect() //connect to db
buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());