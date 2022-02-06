import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Container,
  Grid,
  TextField,
} from "@mui/material";

const ProductWall = ({
  productsArray,
  setProductsArray,
  generalViewOn,
  setGeneralViewOn,
  productBeingViewed,
  setProductBeingViewed,
}) => {
  if (generalViewOn) {
    const allProducts = productsArray.map((product) => {
      <div class="product-general-view">
        <h4 class="product-name">{product.name}</h4>
        <p class="product-price">{product.price}</p>
        {/* <Button variant="contained" onClick={handleClick(product)}>
          See More
        </Button> */}
      </div>;
    });
    return allProducts;
  } else {
    if (productBeingViewed.pictureLinks.length > 0) {
      const allProductPictures = productBeingViewed.pictureLinks.map((link) => {
        <img src={link} alt={"Product image unavailable"}></img>;
      });

      return (
        <div class="product-general-view">
          <h4 class="product-name">{productBeingViewed.name}</h4>
          <p class="product-price">{productBeingViewed.price}</p>
          {allProductPictures}
          {/* <Button
            variant="contained"
            onClick={(event) => handleClick(productBeingViewed)}
          >
            Back
          </Button> */}
        </div>
      );
    } else {
      return (
        <div class="product-general-view">
          <h4 class="product-name">{productBeingViewed.name}</h4>
          <img
            src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
            alt={"Product image unavailable"}
          ></img>
          <p class="product-price">{productBeingViewed.price}</p>
          {/* <Button
            variant="contained"
            onClick={(event) => handleClick(productBeingViewed)}
          >
            Back
          </Button> */}
        </div>
      );
    }
  }

  // return allProducts;
};

export default ProductWall;
