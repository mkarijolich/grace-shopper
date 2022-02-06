const client = require("./client")

async function getAllProductPictures() {
    console.log("Getting all product pictures!");
    try {
        const { rows: pictures } = await client.query(`
            SELECT *
            FROM products_pictures
        `);
        return pictures;
    } catch (error) {
      throw error;
    }
  }


  async function getProductPicturesById(productId) {
    console.log('Getting product pictures for product ID ', productId);
    try{
        const { rows: pictures } = await client.query(`
          SELECT link
          FROM products_pictures
          WHERE "productId"= $1
        `, [productId]);

        
        return pictures.map((row)=>row.link)
    } catch(error){
        throw error;
    }
}


module.exports ={
  getAllProductPictures,
  getProductPicturesById
}