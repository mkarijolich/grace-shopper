const client = require("./client")

async function getAllProductPictures() {
    console.log("Getting all product pictures!");
    try {
        const { rows: pictures } = await client.query(`
            SELECT *
            FROM products_pictures
        `);
        return products;
    } catch (error) {
      throw error;
    }
  }