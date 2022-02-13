import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { currencyFormat } from "../helpers/formats";
import { loadTokenFromLocalStorage } from "../helpers/tokenHelpers";


const ProductList = (props) => {

    
  const { products, setOpenEditProductForm, setEditableProduct, setEditProductFormAnchorEl} = props;

  const token = loadTokenFromLocalStorage();
  const isAdmin = (token && token.account_type === 'ADMIN')
  
  const handleRowDoubleClicked = ({row}, event) => {
    if (!isAdmin) return;
    console.log(row);
    setEditableProduct(row);
    setEditProductFormAnchorEl(event.currentTarget);
    setOpenEditProductForm(true);
  }

  return (
    <Box sx={{ height: 250, pl:"40px", pr:"40px"}}>
      {
        products ? 
            <DataGrid
                columns={[
                  { field: 'id' }, 
                  { field: 'name',width:200 }, 
                  { field: 'detail',width:200 }, 
                  { field: 'category' },
                  { field: 'price', 
                    renderCell: (cellValues) => { return currencyFormat(cellValues.value) } 
                  }]
                }
                rows={products}
                onRowDoubleClick={handleRowDoubleClicked}
            />
        : null 
        }
    </Box>
  );
};

export default ProductList;
