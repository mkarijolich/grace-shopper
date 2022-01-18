// require and re-export all files in this db directory 
module.exports = {
  ...require('./users'), // adds key/values from users.js
  ...require('./products'), // adds key/values from activities.js
  ...require('./orders'), // etc
  // ...require('./order_products') // etc
}