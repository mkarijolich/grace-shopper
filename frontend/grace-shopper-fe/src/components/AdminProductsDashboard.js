import { Button, Container, Fade, Paper, Popper } from "@mui/material";
import React, { useState } from "react";
import ProductList from "./ProductList";
import EditProductForm from "./EditProductForm"; 


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
    <Container>

        <Paper>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClickCreateProduct}
            >
            Create Product
            </Button>


        </Paper>

        <ProductList products={products} open/>

        <EditProductForm 
            open={open} 
            setOpen={setOpen} 
            product={editableProduct} 
            categories={getCategoriesFromProducts(products)}
            anchorEl={anchorEl} />
    </Container>
  )
};

export default AdminProductsDashboard;
