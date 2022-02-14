import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Menu, MenuItem } from "@mui/material";
import { deleteUser } from "../api";
import { updateUserAccountType } from "../api";
import { loadTokenFromLocalStorage } from "../helpers/tokenHelpers";

const UserList = (props) => {
  const [users, setUsers] = useState("");
  const token = loadTokenFromLocalStorage();
  const isAdmin = token.account_type === "ADMIN";

  useEffect(() => {
    Promise.all([fetchAllUsers()]).then(([usersFromAPI]) => {
      setUsers(usersFromAPI);
    });
  }, []);

  const options = ["ADMIN", "CUSTOMER"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const open = Boolean(anchorEl);

  const handleDeleteSubmit = (e, cellValues) => {
    e.preventDefault();
    deleteUser(cellValues.id);
  };

  const handleUserStatusOpened = (event, userId) => {
    if (!isAdmin) return;
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserStatusChanged = (newStatus) => {
    if (!isAdmin) return;
    updateUserAccountType(selectedUserId, newStatus);
    setAnchorEl(null);

    users.forEach((user) => {
      if (user.id === selectedUserId) {
        user.account_type = newStatus;
      }
    });
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {users ? (
        <DataGrid
          columns={[
            { field: "id" },
            { field: "username" },
            {
              field: "account_type",
              width: 150,
              renderCell: (cellValues) => {
                return (
                  <Box>
                    <Button
                      id="basic-button"
                      onClick={(e) => handleUserStatusOpened(e, cellValues.id)}
                    >
                      {cellValues.row.account_type}
                    </Button>
                  </Box>
                );
              },
            },
            {
              field: "Delete this user",
              width: 150,
              renderCell: (cellValues) => {
                return (
                  <Button
                    color="primary"
                    onClick={(e) => {
                      handleDeleteSubmit(e, cellValues);
                    }}
                  >
                    Delete
                  </Button>
                );
              },
            },
            { field: "active" },
          ]}
          rows={users}
        />
      ) : null}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            onClick={(e) => handleUserStatusChanged(options[index])}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default UserList;
