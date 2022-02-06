import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Box,
  Menu,
  MenuItem
} from "@mui/material";
import { deleteUser } from "../api";

const UserList = (props) => {
  const { userId } = props;
  const [users, setUsers] = useState("");

  useEffect(() => {
    Promise.all([fetchAllUsers()]).then(([usersFromAPI]) => {
      setUsers(usersFromAPI);
      //   console.log(usersFromAPI)
    });
  }, []);

  // const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleDeleteSubmit = (e, row) => {
    e.preventDefault();
    deleteUser(row.id);
  };

  const options = ["ADMIN", "CUSTOMER"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };





  return (
    <div style={{ height: 250, width: "100%" }}>
      {users ? (
        <DataGrid
          columns={[
            { field: "id" },
            { field: "username" },
            { field: "account_type",
            width:150,
            renderCell: (cellValues) => {
              return (
                <Box>
                  <Button id="basic-button" onClick={handleClick}>
                  {options[selectedIndex]}
                  </Button>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'lock-button',
                      role: 'listbox',
                    }}
                  >
                    

                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              );
            }, },
            {
              field: "Delete this user",
              width:150,
              renderCell: (cellValues) => {
                return (
                  <Button
                    color="primary"
                    onClick={(e)=> { handleDeleteSubmit(e, cellValues)}}
                  >
                    Delete
                  </Button>
                );
              },
            },
          ]}
          rows={users}
        />
      ) : null}
    </div>
  );
};

export default UserList;
