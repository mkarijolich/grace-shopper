import React from "react";
import { Container } from "@mui/material";
import PictureSlider from "./PictureSlider";
import ProductCardList from "./ProductCardList";


const CategoryProductsCard = (props) => {

  const { products, category } = props;
  const FEATURED_NUMBER = 5;

  const getProductsByCategory = (category, products) => {
    if (!products) return [];
    return products.filter(product => product.category === category);
  }

  return (

    <Container>
      <h1> {category} </h1>
      <PictureSlider products={getProductsByCategory(category, products)} maxItems={FEATURED_NUMBER}/>
      <ProductCardList products={getProductsByCategory(category, products)} />
    </Container>

  )

};

export default CategoryProductsCard;
