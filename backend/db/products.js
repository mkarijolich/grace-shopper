const client = require("./client")

//this will be useful for ordering product from price lo to hi, and vice versa, will obviously need to change some of the code
//depending on which way we are trying to sort the data
function quicksort(array) {
    if (array.length <= 1) {
      return array;
    }
  
    var pivot = array[0];
    
    var left = []; 
    var right = [];
  
    for (var i = 1; i < array.length; i++) {
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
  
    return quicksort(left).concat(pivot, quicksort(right));
  };
  
  var unsorted = [23, 45, 16, 37, 3, 99, 22];
  var sorted = quicksort(unsorted);
  
  console.log('Sorted array', sorted);

//linksArray is contains all the href links to the pictures for the products
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
            const links = await Promise.all(linksArray.map((item) => addPictureLinksToProduct(item, product.id)));

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
        const { rows: [ result ] } = await client.query(`
        INSERT INTO products_pictures(link,"productId")
        VALUES($1, $2)
        RETURNING *;
    `,[ link, id ]);

    return result.link;
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

async function getProductsById(id) {
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

  async function updateProduct({ name, detail, category, price, id}){
    console.log("Updating product: ", name, detail, category, price, id);
    try{
        const { rows: [ product ] } = await client.query(`
            UPDATE products
            SET name=$1, detail=$2, category=$3, price=$4
            WHERE id=$5
            RETURNING *
        `,[ name, detail, category, price, id])

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
    getProductsById,
    getAllProducts,
    updateProduct,
    addPictureLinksToProduct,
    deleteProduct
}
