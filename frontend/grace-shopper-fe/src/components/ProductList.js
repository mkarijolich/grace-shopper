import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { currencyFormat } from "../helpers/formats";


const ProductList = (props) => {

    
    const { products } = props;

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
                />
            : null 
        }
    </Box>
  );
};

export default ProductList;
