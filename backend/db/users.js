const client = require("./client");
const { password } = require("pg/lib/defaults");
const bcrypt = require("bcrypt");

const { getProductsByOrderId } = require("./order_products")

async function _hashPassword(password) {
  const SALT_COUNT = 10;
  return await bcrypt.hash(password, 10);
}

async function createUser({ username, password, account_type, email }) {
  //customer or admin
  console.error("Creating user", username, password);
  try {
    const hashedPassword = await _hashPassword(password);

    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username,password,account_type,email,active)
            VALUES($1, $2, $3, $4, true)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,
      [username, hashedPassword, account_type, email]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE username=$1
        `,
      [username]
    );
    console.log(user);
    return user;
  } catch (error) {
    console.log("DB ERROR");
    console.log(error);
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      // return the user object (without the password)
      delete user.password;
      return user;
    } else {
      throw "You made a mistake";
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE id=$1
        `,
      [id]
    );

    if (!user) {
      throw "User not found.";
    }

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const {
      rows: users
    } = await client.query(
      `
            SELECT id,username,account_type,active
            FROM users
        `
    );
    return users;
  } catch (error) {
    throw error;
  }
}

async function createAddress(userId, { name, street1, street2, city, state, postalCode, country, BillingAddress,}) {

  try{ 
    const{ 
      rows: [address]
     } = await client.query(`
    INSERT into user_addresses("userId", name, street1, street2, city, state, "postalCode", country, "BillingAddress")
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    `, [userId, name, street1, street2, city, state, postalCode, country, BillingAddress]);
    return address;
  } catch(error) {
    throw error
  }
}

async function getAllAddresses(userId) {
  try {
    const {
      rows: addresses
    } = await client.query(
      `
            SELECT *
            FROM user_addresses
            WHERE "userId" = $1
        `
    , [userId]);
    return addresses;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUserId(userId) {
  try {

    const { rows: orders } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "userId"=$1
        `,
      [userId]
    );

    await Promise.all(orders.map(async (order) => {
      const products = await getProductsByOrderId(order.id);
      order.products = products;
    }));

    return orders;
  } catch (error) {
    throw error;
  }
}

async function destroyUser(id){
    
  const {rows:[user]} = await client.query(`
  UPDATE users
  SET active=false
  WHERE users.id=${id}
  RETURNING *
  `)
  console.log(user)
  return user
}

async function updateUser(fields = {}) {
  try {

    const id = fields.id;

    fields.password = await _hashPassword(fields.password)

    const setString=Object.keys(fields).map(
      (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
      return;
    }

    const { rows: [user]} = await client.query(`
    UPDATE users
    SET ${setString}
    WHERE id=${id}
    RETURNING *
    `, Object.values(fields));

    return user;
  } catch (error) {
    throw error;
  }
}





module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    getAllUsers,
    createAddress,
    getAllAddresses,
    getOrdersByUserId,
    destroyUser,
    updateUser
}
