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
} from "@mui/material";
import EditProfile from "./EditProfile";

const AddressList = (props) => {
  const { addresses } = props;

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;


  


  

  return (
    <div style={{ height: 250, width: "100%" }}>
      <Button
        type="submit"
        variant="contained"
        aria-describedby={id}
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClick}
      >
        Add Address
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <EditProfile />
            </Paper>
          </Fade>
        )}
      </Popper>
      {addresses ? (
        <DataGrid
          columns={[
            { field: "street1",
            editable:true, },
            { field: "street2",
            editable:true},
            { field: "city",
            editable:true},
            { field: "state" ,
            editable:true},
            { field: "postalCode",
            editable:true },
            { field: "country",
            editable:true },
            {
              field: "Edit",
              
              renderCell: (cellValues) => {
                return (
                  <Button
                    color="primary"
                  >
                    Edit
                  </Button>
                  
                );
              },
            },
          ]}
          rows={addresses}
          
        />
      ) : null}
    </div>
  );
};

export default AddressList;
