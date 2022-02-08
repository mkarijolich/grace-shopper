import React, { useState } from "react";
import { Container, Box, Typography, Tab, Button} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const ProductCard = (props) => {

    const { product } = props;


  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            height="140"
            image={product.pictureLinks[0]}
            alt="Product"
        />

        <CardContent>
            
            <Typography gutterBottom variant="h5" component="div">
                {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {product.detail}
            </Typography>

        </CardContent>

        <CardActions>
            <Button size="small">Add to Cart</Button>
        </CardActions>

    </Card>
  
  );
};

export default ProductCard;
