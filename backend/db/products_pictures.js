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

  async function getProductPicturesById(productId) {

      console.log('Getting product pictures for product ID ', productId);
      try{
          const { rows: pictures } = await client.query(`
            SELECT *
            FROM products_pictures
            WHERE "productId"= $1
          `, [productId]);
      } catch(error){
          throw error;
      }
  }