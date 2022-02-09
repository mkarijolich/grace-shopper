import React from "react";
import { Container } from "@mui/material";
import PictureSlider from "./PictureSlider";
import ProductCardList from "./ProductCardList";


const SearchResult = (props) => {

  const { products, searchTerm } = props;
  const FEATURED_NUMBER = 5;
  const MINIMUM_SEARCH_LENGTH = 2

  const searchProducts = (searchTerm, products) => {
    if (!products) return [];
    if (searchTerm.length < MINIMUM_SEARCH_LENGTH) return products;

    return products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
        product.detail.toLowerCase().includes(searchTerm.toLowerCase())
    });
  }

  return (

    <Container>
      <h1> Search Results :  </h1>
      <PictureSlider products={searchProducts(searchTerm, products)} maxItems={FEATURED_NUMBER}/>
      <ProductCardList products={searchProducts(searchTerm, products)} />
    </Container>

  )

};

export default SearchResult;
