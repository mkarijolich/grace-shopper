const client = require("./client");
const { addProductToOrder, getProductsByOrderId } = require("./order_products");


  
  async function getAllOrders() {
    try {

      const {rows: orders } = await client.query(`
        SELECT *
        FROM orders
        `)
      
      await Promise.all(orders.map(async (order) => {
        const products = await getProductsByOrderId(order.id);
        order.products = products;
      }));

        return orders
    } catch (error) {
      throw error;
    }
  }
  
  async function createOrder(userId, addressId, products) {
    try {
          const { rows: [ order ] } = await client.query(`
          INSERT INTO orders("userId", "userAddressId", "status", "createdAt")
          VALUES($1, $2, $3, now())
          RETURNING *;
      `,[ userId, addressId, "CREATED" ]);

      const orderProducts = await Promise.all(products.map((product) => addProductToOrder(order.id, product.id, product.quantity)));
      order.products = orderProducts;
      
      return order;

    } catch (error) {
      throw error;
    }
  }
  
  async function updateOrder() {
      try {
      } catch (error) {
        throw error;
      }
    }

    async function getOrderById(id) {
      try {
  
        const { rows: [order] } = await client.query(`
  
        SELECT *
        FROM orders
        WHERE id=$1
        `,[id])

        const products = await getProductsByOrderId(order.id);
        order.products = products;

  
        return order;
      } catch (error) {
        throw error;
      }
    }

    
  
  
  module.exports = {
      getOrderById,
      getAllOrders,
      createOrder,
      updateOrder
  }
