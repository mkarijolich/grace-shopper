// code to build and initialize DB goes here
const client = require('./client');

//THOUGHT THOGUHT THOUGHT THOUGHT THOUGHT: should we add a "userId" column to products so that way we can see all products listed
// by a specific user???????? also, a "category" column so users can sort products by category when browsing

const { createUser,
  getUser,
  getUserById,
  getUserByUsername } = require('./users');

const { createProduct,
  getProductByCategory,
  getProductByName,
  getProductsById,
  getAllProducts,
  updateProduct,
  addPictureLinksToProduct,
  deleteProduct } = require('./products');
const { createOrder } = require('./orders');
const { getMaxListeners } = require('process');

async function buildTables() {
  try {

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS cart_products;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS user_addresses;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products_pictures;
    DROP TABLE IF EXISTS products;
`);

    //added account_type on userstable
    // build tables in correct order
    //IMPORTANT IMPORTANT IMPORTANT: in product table i added the column price, and in order table i added the column total
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      detail varchar(255) NOT NULL,
      category varchar(255) NOT NULL,
      price INTEGER
    );

    CREATE TABLE products_pictures(
      id SERIAL PRIMARY KEY,
      link varchar(255) NOT NULL,
      "productId" INTEGER REFERENCES products(id)
    );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email text not null unique,
      account_type VARCHAR(255) NOT NULL,
      active BOOLEAN NOT NULL
    );

    CREATE TABLE user_addresses(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "name" VARCHAR(255) UNIQUE NOT NULL,
      "street1" VARCHAR(255),
      "street2" VARCHAR(255),
      "city" VARCHAR(255),
      "state" VARCHAR(255),
      "postalCode" VARCHAR(255),
      country VARCHAR(255),
      "BillingAddress" VARCHAR(255)
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "userAddressId" INTEGER REFERENCES user_addresses(id),
      status VARCHAR(255) NOT NULL,
      "totalPrice" NUMERIC,
      "createdAt" TIMESTAMP
    );

    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "orderId" INTEGER REFERENCES orders(id),
      quantity INTEGER NOT NULL,
      "unitPrice" NUMERIC
    );

    CREATE TABLE cart_products(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER
    );

    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id)
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
      { username: 'ChrisG', password: 'password1', account_type:'CUSTOMER', email:"chirisG@gmail.com" },
      { username: 'Maki', password: 'password2', account_type:'ADMIN' , email:"makiK@gmail.com" },
      { username: 'Darshan', password: 'password3' ,account_type:'CUSTOMER', email:"darshan@gmail.com" },
      { username: 'ChrisA', password: 'password4',account_type:'ADMIN' , email:"chirisA@gmail.com"}
    ]

    console.log('Populating users table with seed data...');
    const users = await Promise.all(testUsers.map(createUser));
    console.log("Creating users successful! Our users are: ", users);

    /* These test products test out several cases, they are:
      1. base case
      2. case with multiple picture links
      3. case with no picture links
      4. case with non-unique category to help us test search by category later on
    */
    const testProducts = [
      { name: "Ceiling Fan", detail: "A fan on the ceiling", category: "Ceiling Fans", price: 75, linksArray: ["https://images.thdstatic.com/productImages/62152035-b1f7-496d-8f66-9d024ddc6d2e/svn/bronze-hampton-bay-ceiling-fans-with-lights-52051-e1_600.jpg"] },
        { name: "Door Handle", detail: "A handle on a door", category: "Essentials", price: 10, linksArray: ["https://www.busterandpunch.com/us/wp-content/uploads/sites/2/2020/03/2.-BusterPunch_Door_Handle_Front_Fixed_Brass-scaled.jpg", "https://www.busterandpunch.com/us/wp-content/uploads/sites/2/2021/04/Door-handle_Fixed_Linear_Welders-Black_A2_Web_Square-scaled.jpg"] },
        { name: "72in TV", detail: "A really big TV", category: "Electronics", price: 775, linksArray: ["https://images.furnituredealer.net/img/products%2Fparker_house%2Fcolor%2Fcharlotte%20cha_cha-72-b1.jpg"] },
        { name: "Analogue Clock", detail: "A clock that is analogue", category: "Home Goods", price: 120, linksArray: ["https://www.clockway.com/mm5/img/CHM/CHM-611132-L1.jpg"] },
        { name: "Ottoman", detail: "A stylish ottoman", category: "Furniture", price: 75, linksArray: ["https://mobileimages.lowes.com/productimages/7cba0c14-50a8-48f1-9268-0658c4e898e3/17895160.jpg"] },
        { name: "Coffee Table", detail: "A lovely coffee table for holding coffee.", category: "Furniture", price: 100, linksArray: ["https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202134/1340/parkview-36-reclaimed-wood-coffee-table-c.jpg"] },
        { name: "Couch", detail: "A comfortable couch for you and your family.", category: "Furniture", price: 650, linksArray: ["https://cdn-images.article.com/products/SKU25A/2890x1500/image74669.jpg"] },
        { name: "Lamp", detail: "Light your home with this stylish lamp.", category: "Lighting", price: 40, linksArray: ["https://cb2.scene7.com/is/image/CB2/SnakeTableLampSHF19/$web_pdp_main_carousel_sm$/190430165808/snake-table-lamp.jpg"] },
        { name: "Picture Frame", detail: "Preserve your memories with this quality frame.", category: "Essentials", price: 20, linksArray: ["https://www.ikea.com/us/en/images/products/dalskaerr-frame-wood-effect-light-brown__0556927_pe660629_s5.jpg"] },
        { name: "Photo Album", detail: "Preserve all the memories you can fit in this wonderful photo album.", category: "Essentials", price: 35, linksArray: ["https://m.media-amazon.com/images/I/51Zaq2I6CGL._AC_.jpg"] },
        { name: "TV Remote", detail: "Surf the channels with ease with this remote.", category: "Electronics", price: 20, linksArray: ["https://www.lg.com/us/images/tv-audio-video-accessories/md05893656/gallery/1100-1.jpg"] },
        { name: "Wash Cloths", detail: "Keep clean with these comfortable cotton wash cloths.", category: "Home Goods", price: 20, linksArray: ["https://www.towelsupercenter.com/images/stories/virtuemart/product/wc.jpg"] },
        { name: "Weighted Blanket", detail: "Get comfy with this weighted blanket.", category: "Home Goods", price: 60, linksArray: ["https://caspercontent.imgix.net/2GInvdTpgoxme9VIW1Aggz/8ff476e71b7c04861b7ca3c46a99348b/2020-weighted-blanket-navy-gallery-01.jpg"] },
        { name: "Tissues", detail: "Be sure to stock up for cold and flu season!", category: "Essentials", price: 3, linksArray: ["https://m.media-amazon.com/images/I/61GEPvrXbSL._AC_SL1500_.jpg"] },
        { name: "Faux Succulent Plant", detail: "Bring the outside in, without the responsibility.", category: "Home Goods", price: 10, linksArray: ["https://cdn.shopify.com/s/files/1/0108/9460/6436/products/artificial-large-succulent-artificial-plant-in-decorative-bowl-nearly-natural-539727_1000x.jpg?"] },
        { name: "Jar Candle", detail: "Calm lighting, a timeless classic.", category: "Essentials", price: 12, linksArray: ["https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/71036_XXX_v1.tif&wid=480&cvt=jpeg"] },
        { name: "Floor Lamp", detail: "A large standing lamp to light up your favorite room.", category: "Lighting", price: 45, linksArray: ["https://mobileimages.lowes.com/productimages/a1429a49-4eba-44f4-9544-22495d7b780c/09595332.jpg"] },
        { name: "Cat Food", detail: "Feed your beast.", category: "Pets", price: 25, linksArray: ["https://m.media-amazon.com/images/I/61TmaqkHSdL._AC_SX466_.jpg"] },
        { name: "Dog Food", detail: "Feed your wolf.", category: "Pets", price: 25, linksArray: ["https://i5.walmartimages.com/asr/f0561df9-cfb6-4807-b5d7-c8562093b3d9.04ffc61618e16880e5742af9f641f94a.jpeg"] },
        { name: "Cat Toy", detail: "A fun toy for your cat.", category: "Pets", price: 7, linksArray: ["https://img.chewy.com/is/image/catalog/66578_MAIN._AC_SL1500_V1539004917_.jpg"] },
        { name: "Dog Toy", detail: "A fun toy for your dog.", category: "Pets", price: 7, linksArray: ["https://www.rover.com/blog/wp-content/uploads/2019/03/71aSf2AiBNL._SL1500_-e1553636830126.jpg"] },
        { name: "Cat Litter", detail: "Fresh cat litter that helps to contain odor.", category: "Petes", price: 25, linksArray: ["https://assets.petco.com/petco/image/upload/f_auto,q_auto/1412299-center-1"] },
        { name: "Pet Leash", detail: "Keep your pet nearby and safe with this leash.", category: "Pets", price: 18, linksArray: ["https://m.media-amazon.com/images/I/51OjYkamkzL._AC_SX466_.jpg"] },
        { name: "Pet Carrier", detail: "Transport your pet with ease.", category: "Pets", price: 50, linksArray: ["https://assets.awaytravel.com/spree/products/14917/original/PDP_PetCarrier_Black_09.jpg"] },
        { name: "Cat Treats", detail: "Pamper your wild animal.", category: "Pets", price: 10, linksArray: ["https://target.scene7.com/is/image/Target/GUEST_14c3a2ef-52a7-456b-b4ab-b28f21488d8d?wid=488&hei=488&fmt=pjpeg"] },
        { name: "Dog Treats", detail: "Pamper your wild animal.", category: "Pets", price: 10, linksArray: ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/2331858-center-1"] },
        { name: "Pet Bed", detail: "Comfort for your wild beast.", category: "Pets", price: 25, linksArray: ["https://cdn11.bigcommerce.com/s-iakwzr7rs7/images/stencil/original/products/5641/8211/2056_PFE0580061361__FR__27012.1608250775.jpg?c=2"] },
        { name: "Dog Flea and Tick Medicine", detail: "Keep your pet safe and prevent fleas and ticks.", category: "Pets", price: 15, linksArray: ["https://www.thesprucepets.com/thmb/Fyo1L9zPcWndDSlDfvzNFDvzrtI=/900x0/filters:no_upscale():max_bytes(150000):strip_icc()/NexGardSoftChewforDogs60.1-121lbs-f692196b0ba44f0dbf87069186d24f74.jpg"] },
        { name: "Cat Flea and Tick Medicine", detail: "Keep your cat safe and prevent fleas and ticks.", category: "Pets", price: 15, linksArray: ["https://s7d2.scene7.com/is/image/PetSmart/5156120"] },
        { name: "Cat Scratching Post", detail: "Don't let them scratch up the furniture. Use this stylish cactus scratching post instead!", category: "Pets", price: 30, linksArray: ["https://img.chewy.com/is/image/catalog/252548_MAIN._AC_SL1500_V1616521971_.jpg"] },
        { name: "Fleece Blanket", detail: "Keep warm this winter.", category: "Home Goods", price: 32, linksArray: ["https://m.media-amazon.com/images/I/81I6rUfGUgL._AC_SX466_.jpg"] },
        { name: "Throw Pillow", detail: "Pillow for places to sit.", category: "Home Goods", price: 15, linksArray: ["https://www.ikea.com/us/en/images/products/roedarv-cushion-multicolor__0600167_pe678583_s5.jpg?f=sv"] },
        { name: "Laundry Detergent", detail: "Keep your clothes clean and smelling fresh.", category: "Essentials", price: 12, linksArray: ["https://m.media-amazon.com/images/I/71SzLTvO2PL._AC_SL1500_.jpg"] },
        { name: "Drier Sheets", detail: "Fresh scent.", category: "Essentials", price: 7, linksArray: ["https://m.media-amazon.com/images/I/81AxQNhl4wL._AC_SL1500_.jpg"] },
        { name: "Dishwasher Liquid", detail: "Clean your dishes.", category: "Essentials", price: 9, linksArray: ["https://static.grainger.com/rp/s/is/image/Grainger/54XN56_AS01"] },
        { name: "Aluminum Water Bottle", detail: "Keep 24 oz. of water cold in this water bottle.", category: "Home Goods", price: 15, linksArray: ["https://www.cnshining.com/wp-content/uploads/2020/11/Aluminum-Water-Bottle-2.png"] },
        { name: "Earplugs", detail: "Block out the noise.", category: "Essentials", price: 8, linksArray: ["https://www.macksearplugs.com/wp-content/uploads/2016/12/maximum-protection-10pr-041719-600x600.jpg"] },
        { name: "Vitamins", detail: "Stay healthy and ahead of your peers.", category: "Essentials", price: 13, linksArray: ["https://cdn.accentuate.io/94445895751/4917143109703/PHA0284-Resize-Hero-images-vitamins--Multi-M-v1626463598088.jpg"] },
        { name: "Toothpaste", detail: "Keep your teeth clean.", category: "Essentials", price: 5, linksArray: ["https://www.colgate.com/content/dam/cp-sites/oral-care/oral-care-center-relaunch/en-us/products/toothpaste/colgate-total-whitening-toothpaste-2021.png"] },
        { name: "Toothbrush", detail: "Brush them teeth.", category: "Essentials", price: 3, linksArray: ["https://dienamics.com.au/wp-content/uploads/2012/01/shutterstock_1038725176.jpg"] },
        { name: "Garbage Bags", detail: "Throw your trash away.", category: "Essentials", price: 8, linksArray: ["https://www.glad.com/wp-content/uploads/2014/10/SmallGarbage_Hero.png"] },
        { name: "Mouthwash", detail: "Get your teeth super clean.", category: "Essentials", price: 7, linksArray: ["https://m.media-amazon.com/images/I/71aJguPBxKL._SL1500_.jpg"] },
        { name: "Pens", detail: "A set of pens.", category: "Essentials", price: 2, linksArray: ["https://media.istockphoto.com/photos/red-and-blue-ballpoint-pens-on-white-background-picture-id1040237248"] },
        { name: "Pencils", detail: "The writing utensil.", category: "Essentials", price: 5, linksArray: ["https://d15bv9e9f3al6i.cloudfront.net/imgs/products/cp/950_constW/OH30574-YL~OHTO-Sharp-Pencil-2-0-APS-680E_P1.jpg"] },
        { name: "Air Freshener", detail: "Keep your home smelling fresh.", category: "Home Goods", price: 4, linksArray: ["https://i5.walmartimages.com/asr/f5ad4419-bdf4-46fc-8562-008c2db5e05a.0bb1d9f572acf488d260e6aac7eb61ad.jpeg"] },
        { name: "Phone Charger", detail: "Keep your smartphone charge.", category: "Electronics", price: 5, linksArray: ["https://m.media-amazon.com/images/I/81fWDycQuiL._AC_SX522_.jpg"] },
        { name: "Lighter", detail: "Flame at your fingertip.", category: "Essentials", price: 3, linksArray: ["https://d2aam04nmhpdf8.cloudfront.net/images/images/000/029/858/xlarge/12928_03.jpg?1561642788"] },
        { name: "AA Batteries", detail: "AA batteries.", category: "Electronics", price: 11, linksArray: ["https://target.scene7.com/is/image/Target/GUEST_c690feea-1b83-4744-926e-3358c7672c25?wid=488&hei=488&fmt=pjpeg"] },
        { name: "Printer Paper", detail: "8.5 x 11 printer paper.", category: "Essentials", price: 13, linksArray: ["https://i5.walmartimages.com/asr/97640579-9841-49c2-8b8b-14fb9de44df6_1.46231d4e043c0608b63f087eeba8db10.jpeg"] },
        { name: "Headphones", detail: "Listen to stuff!", category: "Electronics", price: 75, linksArray: ["https://cdn.shopify.com/s/files/1/0340/7305/products/Status-Audio_Core-ANC_SAANCCE_Product-Photo_Oasis-Blue_01-gray_1200x.progressive.jpg?v=1626884031"] },
        { name: "12 Pack Water Bottle", detail: "Stay hydrated.", category: "Grocery", price: 8, linksArray: ["https://i5.walmartimages.com/asr/9b864b1f-71dc-4c97-b9a1-e8ad2cd3cf93_1.748758dd5934bf165771e73b7c16f798.jpeg"] },
        { name: "Rice", detail: "A large sack of rice.", category: "Grocery", price: 10, linksArray: ["https://st.depositphotos.com/1005708/3448/i/950/depositphotos_34489335-stock-photo-rice-in-bag.jpg"] },
        { name: "Popular Book", detail: "Everyone's reading it.", category: "Essentials", price: 10, linksArray: ["https://images-na.ssl-images-amazon.com/images/I/91dSMhdIzTL.jpg"] },
        { name: "Bread", detail: "A loaf of bread", category: "Grocery", price: 3, linksArray: ["https://assets.bonappetit.com/photos/5f84743360f032defe1f5376/3:2/w_1857,h_1238,c_limit/Pullman-Loaf-Lede-new.jpg"] },
        { name: "Cheese", detail: "Cheese slices", category: "Grocery", price: 6, linksArray: ["https://www.sargento.com/assets/00113_SL_ShrpChddr_8oz_QrtrLft.png"] },
        { name: "Yogurt", detail: "Yogurt", category: "Grocery", price: 8, linksArray: ["https://images.heb.com/is/image/HEBGrocery/000399589"] },
        { name: "HDMI Cable", detail: "An HDMI cable", category: "Electronics", price: 20, linksArray: ["https://media.startech.com/cms/products/main/hdmm50cmp.main.jpg"] },
        { name: "PS5", detail: "The unobtainable PS5", category: "Electronics", price: 500, linksArray: ["https://www.nme.com/wp-content/uploads/2020/06/ps5-credit-sie@2000x1270.jpg"] },
        { name: "Umbrella", detail: "Stay dry", category: "Essentials", price: 24, linksArray: ["https://m.media-amazon.com/images/I/71md9jHDSgL._AC_SL1500_.jpg"] },
        { name: "Printer", detail: "Print the important stuff!", category: "Electronics", price: 50, linksArray: ["https://i.pcmag.com/imagery/roundups/01Wsuw14K02wrCTGIwg8xA8-15.fit_lim.size_1200x630.v1620845330.jpg"] },
        { name: "Record Player", detail: "Play your vinyls.", category: "Electronics", price: 100, linksArray: ["https://m.media-amazon.com/images/I/718+Yzgt7qL._AC_SL1500_.jpg"] } ]



      // new product categories: "Ceiling Fans", "Furniture", "Lighting", "Pets", "Grocery"
  
      /* all categories:
        Ceiling Fans
        Electronics
        Essentials
        Furniture
        Grocery
        Home Goods
        Lighting
        Pets
  
      */
    console.log('Populating products table with seed data...');
    const products = await Promise.all(testProducts.map(createProduct));
    console.log("Creating products successful! Our products are: ", products);


    // Create Order
    await createOrder(2, null, [
      { id: 1, quantity: 2},
      { id: 2, quantity: 5},
    ]);

    await createOrder(3, null, [
      { id: 3, quantity: 1},
      { id: 1, quantity: 1},
    ]);

    await createOrder(1, null, [
      { id: 2, quantity: 10},
      { id: 3, quantity: 5},
    ]);


  } catch (error) {
    throw error;
  }
}

client.connect() //connect to db
buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());