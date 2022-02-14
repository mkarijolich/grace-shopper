import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import { destroyCartProduct, fetchCartByUserId } from "../api";
import { currencyFormat } from "../helpers/formats";

const ProductCard = (props) => {
  const {
    product,
    setCart,
    setCartTotal
  } = props;

  const removeFromCart = async (e) => {
    destroyCartProduct(product.id);
    
    const result = await fetchCartByUserId();
    if (result.cart !== undefined) {
        setCart(result.cart);
        setCartTotal(result.total);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
      <CardHeader
        action={currencyFormat(product.price)}
        title={product.name}
        subheader=""
      />

      <CardContent>
        <Typography paragraph>Quantity: {product.quantity}</Typography>
      </CardContent>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignSelf: "flex-end" }}
      >
        <Button
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
          onClick={() => removeFromCart(product.id)}
        >
          Remove From Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
