import React, { useState } from "react";
import Carousel from 'react-material-ui-carousel'
import Image from 'material-ui-image'
import {
  Container,
  Box,
  Typography,
  Tab,
  Button,
  Paper,
} from "@mui/material";


const PictureSlider = (props) => {
  
    const { products, maxItems } = props;

    const getFeaturedProducts = (products) => { 
      // Choose 5 random products to feature
      const shuffled = products.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, maxItems);    
    }

  return (
    <Carousel>

        {
            getFeaturedProducts(products).map(product => { return (
                <Paper key={product.id}>
                    <h2 style={{position: "absolute"}} > {product.name } </h2>
                    <div  style={{ 
                      height: "300px", 
                      backgroundImage: "url(" + product.pictureLinks[0] + ")",  
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat'}} />
                      
                </Paper>
            
            )})
        }
        
    </Carousel>
  );
};

export default PictureSlider;


