import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";

import {
  Container,
  Typography,
  TextField,
  IconButton,
  Button,
  Box,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  createTheme,
  ThemeProvider,
  Avatar
} from "@mui/material";
import { getOrderByOrderId } from "../api/index";



const OrderDetail = () => {

    const { id } = useParams()

    const [order, setOrder] = useState({});

    useEffect(() => {
        Promise.all( 
          [
            getOrderByOrderId(id)
          ]
        )
        .then(([orderFromAPI]) => {
          setOrder(orderFromAPI);
        })
    });

    return (
        <div>
        <h1> Order {id} </h1>
        
        {
            order ?
            <ProductList products={order.products} />
            : undefined
        }
        
        </div>

    )




}




export default OrderDetail;