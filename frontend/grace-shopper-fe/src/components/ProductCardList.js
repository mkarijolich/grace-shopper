import React, { useState } from "react";
import { Container, Box, Typography, Tab, Button, Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ProductCard from "./ProductCard";

const ProductCardList = (props) => {

    const { products } = props;


  return (
    
    <Container style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 15,
      }}>
        {
            products ? products.map(product => {
                return <ProductCard product={product} />
            }) : null
        }
    </Container>
  
  );
};

export default ProductCardList;
