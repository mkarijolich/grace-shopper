const dotenv = require("dotenv")
dotenv.config()

// This is the Web Server
const express = require('express');
const server = express();

// Stripe checkout
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
server.use(express.static('public'));

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

const cors = require('cors')
server.use(cors())

// handle application/json requests
server.use(express.json());

server.post("/checkout", async (req,res) => {
  console.log("Request to stripe: ". req.body);

  let error;
  let status;
  try{
    const { product, token } = req.body;

    const customer = await
    stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await
      stripe.charges.create({
        amount: total * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: 'Test purchase',
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.addess_zip
          }
        }
      },
      { 
        idempotency_key 
      }
      );
  } catch(error){
    console.error("Error", error);
    status="failure";
  }

  res.json({ error, status })

});

// here's our API
server.use('/api', require('./routes'));


// bring in the DB connection
const client = require('./db/client');

// connect to the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${ PORT }!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});

//entry point
//