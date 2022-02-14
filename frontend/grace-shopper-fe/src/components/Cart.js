import React, { useEffect, useState } from "react";
import { fetchCartByUserId } from "../api/index";
import ProductCardListInCart from './ProductCardListInCart';
import { Container } from "@mui/material";


const Cart = () => {

  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    Promise.all([
      fetchCartByUserId(),
       //need to make a a getAllProductPictures function in api/index and integrate throughout backend
    ]).then(([cartFromAPI]) => {
      setCart(cartFromAPI.cart);
      setCartTotal(cartFromAPI.total);
    });
  }, [setCart]);

 return (
   <Container sx={{p: 5}}>
    <h1> Cart </h1>
    <ProductCardListInCart products={cart} total={cartTotal} setCart={setCart} setCartTotal={setCartTotal} />
   </Container>
 );
}

export default Cart;