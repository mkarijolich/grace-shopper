import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

const OrderList = (props) =>{

    const { orders } = props;

    const navigate = useNavigate();
    
    const onRowClick = (row) => {
      if (row.id)
        navigate(`/orders/${row.id}`);
    }
    

    return (
 
        <div style={{ height: 250, width: '100%' }}>
            
        {
            orders ? 
                <DataGrid
                    columns={[{ field: 'id' }, { field: 'userId' }, { field: 'status' }, { field: 'createdAt' },]}
                    rows={orders}
                    onRowClick={onRowClick}
                />
            : null 
        }

      </div>
    );
  }






export default OrderList;