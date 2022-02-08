import React from "react";
import { Typography, Button, Container, Box, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Carousel from 'react-material-ui-carousel';
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
