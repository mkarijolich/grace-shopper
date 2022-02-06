import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchAllProducts } from "../api";

const ProductList = (props) => {

    
    const { products } = props;

  return (
    <div style={{ height: 250, width: "100%" }}>
      {
            products ? 
                <DataGrid
                    columns={[{ field: 'id' }, { field: 'name',width:200 }, { field: 'detail',width:200 }, { field: 'category' },{ field: 'price' },]}
                    rows={products}
                />
            : null 
        }
    </div>
  );
};

export default ProductList;
