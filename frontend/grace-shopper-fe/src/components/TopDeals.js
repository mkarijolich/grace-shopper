import { Container } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";


const TopDeals = (props) => {
  const { products } = props;



  return (
      
    <Container style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 15,
    }}>
      {
          products ? products.slice(0,5).map(product => {
              return <ProductCard product={product} />
          }) : null
      }
  </Container>

      
          
  );
};

export default TopDeals;
