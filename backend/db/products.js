const client = require("./client")
const {
    getProductPicturesById,
    getAllProductPictures
} = require('./products_pictures');

async function createProduct({ name, detail, category, price, linksArray }){
    console.log("Creating product with: ", name, detail, category, price);
    try{

        const { rows: [ product] } = await client.query(`
            INSERT INTO products(name,detail,category,price)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `,[ name, detail, category, price ]);

        if( linksArray.length > 0 ){
            console.log("Creating product successful. Adding href links for pictures: ", linksArray);
            const links = await Promise.all(linksArray.map(addPictureLinksToProduct));

            product.links = links;
        } else{
            product.links = null;
        }

        return product;
    }catch(error){
        throw error;
    }
}

async function addPictureLinksToProduct( link, id ){
    console.log("Product with id ", id, " adding this link: ", link);
    try{
        const { rows: [ link ] } = await client.query(`
        INSERT INTO products_pictures(link,"productId")
        VALUES($1, $2)
        RETURNING *;
    `,[ link, id ]);

    return link.link;
    } catch(error){
        throw error;
    }
}

async function getProductByName( name ){
    console.log("Getting product by name: ", name);
    try{

        const { rows: [ product ] } = await client.query(`
            SELECT *
            FROM products
            WHERE name=$1;
        `, [ name ]);

        return product;
    } catch(error){
        throw error;
    }
}

async function getProductByCategory( category ){
    console.log("Getting product by category: ", category);
    try{

        const { rows: [ products ] } = await client.query(`
            SELECT *
            FROM products
            WHERE category=$1;
        `, [ category ]);

        return products;
    } catch(error){
        throw error;
    }
}

async function getProductById(id) {
    console.log("Getting product by ID: ", id);
    try {
        const { rows: [ product ] } = await client.query(`
            SELECT *
            FROM products
            WHERE id=$1;
        `, [ id ]);

        return product;
    } catch (error) {
      throw error;
    }
  }
  
  async function getAllProducts() {
    console.log("Getting all products");
    try {
        const { rows: products } = await client.query(`
            SELECT *
            FROM products
        `);
        return products;
    } catch (error) {
      throw error;
    }
  }

  async function updateProduct( fields = {} ){

    console.log("Updating product: ", fields.name, fields.detail, fields.category, fields.price, fields.linksArray, fields.id);

    const id = fields.id;
    const links = fields.links;
    delete fields.id;
    delete fields.id;

    const setString=Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
      ).join(', ');

      if (setString.length === 0) {
        return;
      }

    try{
        const { rows: [ product ] } = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *
        `, Object.values(fields))

        return product;
    }catch(error){
        throw error;
    }
}

async function deleteProduct( id ){
    console.log("Deleting product with ID: ", id);
    try{
        const{ rows: [ product ] } = await client.query(`
            DELETE FROM products
            WHERE id=$1
        `,[ id ]);
    } catch(error){
        throw error;
    }
}

module.exports = {
    createProduct,
    getProductByCategory,
    getProductByName,
    getProductById,
    getAllProducts,
    updateProduct,
    addPictureLinksToProduct,
    deleteProduct
}
