import React, { useCallback, useState } from "react";
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


  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const [selectedCellParams, setSelectedCellParams] = useState(null);

  const handleCellClick = useCallback((params) => {
    setSelectedCellParams(params);
  }, []);

  const handleClickEdit = () => {
    const cellMode = selectedCellParams;

    if (cellMode === "edit") {
      setSelectedCellParams(5);
    }
  };

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
            { field: "street1", editable: true },
            { field: "street2", editable: true },
            { field: "city", editable: true },
            { field: "state", editable: true },
            { field: "postalCode", editable: true },
            { field: "country", editable: true },
            {
              field: "Edit",

              renderCell: (cellValues) => {
                return (
                  <Button color="primary" onClick={handleClickEdit}>
                    {selectedCellParams?.cellMode === "edit" ? "Save" : "Edit"}
                  </Button>
                );
              },
            },
          ]}
          rows={addresses}
          onCellClick={handleCellClick}
        />
      ) : null}
    </div>
  );
};

export default AddressList;
