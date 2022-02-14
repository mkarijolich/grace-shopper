import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import EditProductForm from "./EditProductForm";
import ProductList from "./ProductList";

const AdminProductsDashboard = (props) => {
  const { products } = props;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editableProduct, setEditableProduct] = useState();


  const handleClickCreateProduct = (e) => {
      e.preventDefault();
      setAnchorEl(e.currentTarget);
      setEditableProduct(undefined);
      setOpen(true);
  }

  const getCategoriesFromProducts = (products) => {
      return [... new Set(products.map(p => p.category))]
  }


  return (
    <Paper sx={{p:3, pb:15, height:800}}>

        <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClickCreateProduct}
        >
        Create Product
        </Button>

        <ProductList products={products} setOpenEditProductForm={setOpen} setEditableProduct={setEditableProduct} setEditProductFormAnchorEl={setAnchorEl}/>

        <EditProductForm 
            open={open} 
            setOpen={setOpen} 
            product={editableProduct} 
            categories={getCategoriesFromProducts(products)}
            anchorEl={anchorEl} />
    </Paper>
  )
};

export default AdminProductsDashboard;
