import React, { useState } from 'react';

const ProductWall = ({ productsArray, setProductsArray, generalViewOn, setGeneralViewOn, productBeingViewed, setProductBeingViewed}) => {

    const allProducts = productsArray.map((product, index) => 
    <>
        <div>{product.description}</div>
        <div>{product.price}</div>
    </>
    )

    return allProducts;
}

export default ProductWall;