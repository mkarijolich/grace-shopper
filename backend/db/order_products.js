const { getProductsById } = require("./products");
const client = require("./client");

async function getProductsByOrderId(orderId) {
  try {
    const { rows: products } = await client.query(`
      SELECT 
        products.id,
        products.name,
        products.detail,
        products.category,
        order_products.quantity,
        order_products."unitPrice"
      FROM order_products
      JOIN products 
      ON order_products."productId" = products.id
      WHERE "orderId"=$1
    `,[orderId])

      return products;

  } catch (error) {
    throw error;
  }
}

async function updateProductByOrderId(fields = {}) {
  
    const id = fields.id

    const filteredFields = {}
  
    Object.keys(fields).forEach(key => {
      if (key !== 'id') {
          filteredFields[key] = fields[key];
      }
  });

  const setString = Object.keys(filteredFields).map(
      (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

      if (setString.length === 0) {
      return;
    }

    const { rows: [productById]} = await client.query(`
      UPDATE order_products
      SET ${setString}
      WHERE id=${id}
      RETURNING *
      `, Object.values(filteredFields));
  
      return productById;
}

async function addProductToOrder(orderId, productId, quantity) {
  try {

    const product = await getProductsById(productId);

    const { rows: [ orderProduct ] } = await client.query(`
      INSERT INTO order_products("orderId", "productId", "quantity", "unitPrice")
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `,[ orderId, productId, quantity, product.price ]);

    return orderProduct;

  } catch (error) {
    throw error;
  }
}






module.exports = {
  getProductsByOrderId,
    updateProductByOrderId,
    addProductToOrder,
}
