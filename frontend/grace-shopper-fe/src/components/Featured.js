import React, { useState } from "react";
import Button from "@mui/material/Button";
// STILL NEED STILL NEED STILL NEED STILL NEED STILL NEED:
// get the pictures for each product
const Featured = ({
  productsArray,
  generalViewOn,
  setGeneralViewOn,
  productBeingViewed,
  setProductBeingViewed,
}) => {
  const handleClickView = (product) => {
    if (generalViewOn) {
      setGeneralViewOn(false);
      setProductBeingViewed(product);
    } else {
      setGeneralViewOn(true);
    }
  };
  const handleClickAddToCart = (product) => {
    if (generalViewOn) {
      setGeneralViewOn(false);
      setProductBeingViewed(product);
    } else {
      setGeneralViewOn(true);
    }
  };
  const featuredProductsArray = [];
  const featuredProductNums = [];
  for (let i = 0; i < 4; i++) {
    let num = Math.floor(Math.random() * productsArray.length);
    featuredProductNums.includes(num)
      ? i--
      : featuredProductsArray.push(productsArray[num]);
    //careful, could end in infinite loop if <4 products exist
  }
  if (generalViewOn) {
    const featuredProducts = featuredProductsArray.map((product) => {
      return (
      <div class="product-general-view">
        {/* <h4 class="product-name">{product.name}</h4>
        <p class="product-price">{product.price}</p>
        <img src={productBeingViewed.pictureLinks[0]} alt="Product"></img>
        <Button
          variant="contained"
          onClick={(event) => handleClickView(product)}
        >
          See More
        </Button> */}
      </div>
      )
    });
    return featuredProducts;
  } else {
    if (productBeingViewed.pictureLinks.length > 0) {
      const allProductPictures = productBeingViewed.pictureLinks.map((link) => {
        <img src={link} alt={"Product image unavailable"}></img>;
      });
      return (
        <div class="product-specific-view">
          <h4 class="product-name">{productBeingViewed.name}</h4>
          <p class="product-price">{productBeingViewed.price}</p>
          {allProductPictures}
          <Button
            variant="contained"
            onClick={(event) => handleClickView(productBeingViewed)}
          >
            Back
          </Button>
        </div>
      );
    } else {
      return (
        <div class="product-specific-view">
          <h4 class="product-name">{productBeingViewed.name}</h4>
          <img
            src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
            alt={"Product image unavailable"}
          ></img>
          <p class="product-price">{productBeingViewed.price}</p>
          <Button
            variant="contained"
            onClick={(event) => handleClickView(productBeingViewed)}
          >
            Back
          </Button>
        </div>
      );
    }
  }
};
export default Featured;
