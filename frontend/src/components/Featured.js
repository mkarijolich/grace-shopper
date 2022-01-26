import React, { useState } from 'react';
// STILL NEED STILL NEED STILL NEED STILL NEED STILL NEED:
// get the pictures for each product

const Featured = ( { productsArray, generalViewOn, setGeneralViewOn, productBeingViewed, setProductBeingViewed } ) => {

    const featuredProductsArray = [];
    const featuredProductNums = [];

    for( let i = 0; i < 4; i++ ){

        let num = Math.floor(Math.random() * productsArray.length);
        featuredProductNums.includes(num) ? i-- : featuredProductsArray.push(productsArray[num]);
        //careful, could end in infinite loop if <4 products exist


    }

    //need if statements on whether user is authorized or not in this map method
    const featuredProducts = featuredProductsArray.map((product) => {
        if( generalViewOn ){
        <div class="product-general-view">
            <h4 class="product-name">{product.name}</h4>
            <p class="product-price">{product.price}</p>
            <p>BUTTON HERE TO SEE FULL VIEW OF PRODUCT {/* in here, do setGeneralView to false and pass the full product object to setProductBeingViewed */}</p>
        </div>
        } else {
            <div class="product-general-view">
            <h4 class="product-name">{productBeingViewed.name}</h4>
            <p class="product-price">{productBeingViewed.price}</p>
            <p class="product-detail">{productBeingViewed.detail}</p>
            <p class="product-category">{productBeingViewed.category}</p>
            <p>BUTTON HERE TO RETURN TO GENERAL VIEW {/* in here, do setGeneralView to false and pass the full product object to setProductBeingViewed */}</p>
        </div>
        }
    });
}

export default Featured;