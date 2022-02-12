import React, { useCallback, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Tooltip from '@mui/material/Tooltip';


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


  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
              <EditProfile setOpen={setOpen}/>
            </Paper>
          </Fade>
        )}
      </Popper>
      {addresses ? (
        <DataGrid
          columns={[
            { field: "street1", editable: false },
            { field: "street2", editable: false },
            { field: "city", editable: false },
            { field: "state", editable: false },
            { field: "postalCode", editable: false },
            { field: "country", editable: false },
          ]}
          rows={addresses}
        />
      ) : null}
    </div>
  );
};

export default AddressList;
