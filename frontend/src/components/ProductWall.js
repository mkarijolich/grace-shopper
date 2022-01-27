import React, { useState } from 'react';

const ProductWall = ({ productsArray, setProductsArray, generalViewOn, setGeneralViewOn, productBeingViewed, setProductBeingViewed}) => {

    if( generalViewOn ){
        const featuredProducts = featuredProductsArray.map((product) => {
                    <div class="product-general-view">
            <h4 class="product-name">{product.name}</h4>
            <p class="product-price">{product.price}</p>
            <Button variant="contained" onClick={handleClick(product)}>See More</Button>
        </div>
        })
        return featuredProducts;
    } else{
        return
        <div class="product-general-view">
        <h4 class="product-name">{productBeingViewed.name}</h4>
        <p class="product-price">{productBeingViewed.price}</p>
        <Button variant="contained" onClick={handleClick(productBeingViewed)}>Back</Button>
    </div>
    }

    return allProducts;
}

export default ProductWall;