const client = require("./client");

async function getProductByOrderId(id) {
  try {
    const { rows: [productById] } = await client.query(`
      SELECT *
      FROM order_products
      WHERE id=$1
    `,[id])

      return productById;

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






module.exports = {
    getProductByOrderId,
    updateProductByOrderId
}
