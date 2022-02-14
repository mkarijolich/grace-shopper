import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { Paper } from "@mui/material";


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
    }, [setOrder]);

    return (
        <div>
        <h1> Order {id} </h1>
        
        {
            order ?
            <Paper sx={{height: 600}}>
              <ProductList products={order.products} />
            </Paper>
            
            : undefined
        }
        
        </div>

    )




}




export default OrderDetail;