import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Popper,
  Box,
  Fade,
  Paper,
  MenuItem,
  Menu,
  Link
} from "@mui/material";

const OrderList = (props) => {
  const { orders } = props;

  const navigate = useNavigate();

  const onRowClick = (row) => {
    if (row.id) navigate(`/orders/${row.id}`);
  };

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ height: 250, width: "100%" }}>
      {orders ? (
        <DataGrid
          columns={[
            { field: "id" },
            { field: "userId" },
            { field: "createdAt" },
            {
              field: "order detail",
              renderCell: (cellValues) => {
                return (
                  <Link href={`/orders/${cellValues.id}`}>Detail</Link>
                );
              },
            },
            {
              field: "status",
              renderCell: (cellValues) => {
                return (
                  <Box>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      created
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Created</MenuItem>
                      <MenuItem onClick={handleClose}>Processing</MenuItem>
                      <MenuItem onClick={handleClose}>Cancelled</MenuItem>
                      <MenuItem onClick={handleClose}>Completed</MenuItem>
                    </Menu>
                  </Box>
                );
              },
            },
          ]}
          rows={orders}
          // onRowClick={onRowClick}
        />
      ) : null}
    </div>
  );
};

export default OrderList;
