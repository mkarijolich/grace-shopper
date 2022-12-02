import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import ProductCardInCart from "./ProductCardInCart";
import { handleStripeToken } from "../api";

const ProductCardListInCart = (props) => {
  const { products, total, setCart, setCartTotal } = props;


  async function handleToken(token) {
    return handleStripeToken(token, total);
  }

  return (
    <>
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 15,
        }}
      >
        {products
          ? products.map((product) => {
              return (
                <ProductCardInCart
                  product={product}
                  key={product.id}
                  setCart={setCart}
                  setCartTotal={setCartTotal}
                />
              );
            })
          : null}
      </Container>

      <Container sx={{mt: 10}}>
        <Card>
          <CardContent> TOTAL: ${total} </CardContent>
        </Card>
      </Container>

      <Container sx={{mt: 5, textAlign: "right"}}>
        <StripeCheckout
            stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
            token={handleToken}
            billingAddress
            shippingAddress
            total={total * 100}
        />
      </Container>

    </>
  );
};

export default ProductCardListInCart;
