import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Popper,
  Box,
  Fade,
  Paper,
  MenuItem,
  Menu,
  Link,
} from "@mui/material";
import { updateOrder } from "../api"
import { loadTokenFromLocalStorage } from "../helpers/tokenHelpers"

const OrderList = (props) => {
  const { orders } = props;

  const token = loadTokenFromLocalStorage();
  const isAdmin = token.account_type === "ADMIN";

  const options = ["created", "processing", "canceled", "completed"];
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(-1);
  const open = Boolean(anchorEl);

  const handleOrderStatusOpened = (event, orderId) => {
    if (!isAdmin) return;
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleOrderStatusClosed = () => {
    setAnchorEl(null);
  };
  
  const handleOrderStatusChanged = (newStatus) => {
    if (!isAdmin) return;    
    updateOrder(selectedOrderId, newStatus);
    setAnchorEl(null);

    orders.forEach(order => {
      if (order.id === selectedOrderId) {
        order.status = newStatus;
      }
    })
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {orders ? (
        <DataGrid
          columns={[
            { field: "id" },
            { field: "userId" },
            
            {
              field: "order detail",
              renderCell: (cellValues) => {
                return <Link href={`/orders/${cellValues.id}`}>Detail</Link>;
              },
            },
            {
              field: "status",
              renderCell: (cellValues) => {
                return (
                  <Box>
                    <Button id="basic-button" onClick={(e) => handleOrderStatusOpened(e, cellValues.id)}>
                    {cellValues.row.status}
                    </Button>
                  </Box>
                );
              },
            },
            { field: "createdAt",
            width:150, },
          ]}
          rows={orders}
          // onRowClick={onRowClick}
        />
      ) : null}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleOrderStatusClosed}
        MenuListProps={{'aria-labelledby': 'lock-button',role: 'listbox',}}
      >

        {options.map((option, index) => (
          <MenuItem
            key={option}
            onClick={(e) => handleOrderStatusChanged(options[index])}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
    
  );
};

export default OrderList;
