import React, { useState } from "react";
import { Container } from "@mui/material";
import PictureSlider from "./PictureSlider";



const CategoryProductsCard = (props) => {

  const { products, category } = props;
  const [categoryProducts, setCategoryProducts] = useState(
    category ? products.filter(product => product.category === category) : products
  );

  return (

    <Container>
      <h1> {category} </h1>
      <PictureSlider products={categoryProducts} />


    </Container>

  )

};

export default CategoryProductsCard;
