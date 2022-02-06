import React, { useState } from "react";
import Carousel from 'react-material-ui-carousel'
import {
  Container,
  Box,
  Typography,
  Tab,
  Button,
  Paper,
  Image,
} from "@mui/material";

const PictureSlider = (props) => {
  
    const { products } = props;

    console.log(products)





  return (
    <Carousel>

        {
            products.map(product => { return (
                <Paper>
                    <img src={product.pictureLinks[0]} alt="product"/>
                </Paper>
            
            )})
        }
        
    </Carousel>
  );
};

export default PictureSlider;


