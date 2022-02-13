// import { Button, Container, TextField } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import React from "react";
// import {ProductCard }from "./ProductCard";


// const AddToCart = (props) => {
//     const { products } = props;
//     const { expand, ...other } = props.product;
//     const handleOnClick = (quantity) => {
//         console.log("Hello");
//     }


//     return (
// <Container>
//         {
//             products ? products.map(product => {
//                 return <ProductCard product={product} key={product.id}/>
//             }) : null
//         }

//         </Container>
//         // <Card sx={{ maxWidth: 690 }}>
//         //     <CardHeader
//         //         action={product.price}
//         //         title={product.name}
//         //         subheader=""
//         //     />
//         //     <CardMedia
//         //         component="img"
//         //         height="280"
//         //         image={product.pictureLinks[0]}
//         //         alt="Product"
//         //     />
//         //     <CardActions disableSpacing>
//         //     </CardActions>
//         //     <CardContent>
//         //         <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
//         //         <Button
//         //                                 variant="outlined"
//         //                                 onClick={handleOnClick()}
//         //                                 sx={{ my: 1, mx: 1.5 }}>
//         //                                 Register
//         //                             </Button>
//         //     </CardContent>
//         // </Card>
//     );
// };
// export default AddToCart;







import {
    Box,
    Button,
    Grid,
    Paper,
    Popper,
    TextField
} from "@mui/material";
import React, { useState } from "react";
import { currencyFormat } from "../helpers/formats";
  
  const AddToCart = (props) => {
    const { product, anchorEl, open, setOpen } = props;
  
    const [quantity, setQuantity] = useState(1);
  
    const handleCancel = (e) => {
      e.preventDefault();
      setQuantity(1);
      setOpen(false);
    };
  
    const handleAdd = (e) => {
      console.log("Adding to cart.")
    };
  
    return (
      <Popper style={{zIndex: 1}} open={open} anchorEl={anchorEl} placement="bottom-start">
          {
            product ?

            <Paper sx={{ p: 2, width: 400, height: 350 }}>
              <h3> Add to Cart </h3> 
  
              <Box component="form" noValidate>
                <Grid container spacing={4}>
                  <Grid item xs={4} sm={4}>
                    <img src={product.pictureLinks[0]} height="100" width="100" alt="product" />
                  </Grid>

                  <Grid item xs={8} sm={8}>
                     <div><strong> {product.name} </strong> </div>
                     <div> {product.detail} </div>
                     <div>{currencyFormat(product.price)}</div>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField 
                      name="quantity"
                      type="number"
                      required
                      fullWidth
                      id="quantity"
                      label="Quantity"
                      autoFocus
                      variant="standard"
                      value={quantity}
                      onChange={(e) => setQuantity(e.currentTarget.value)}/>
                  </Grid>
                    
                  <Grid item>
                    <Button onClick={handleAdd}> Add </Button>
                    <Button onClick={handleCancel}> Cancel </Button>
                  </Grid>

                </Grid>
              </Box>
        
        </Paper>

        : null

          }
        
      </Popper>
    );
  };
  
  export default AddToCart;
  