import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button
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
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpen((previousOpen) => !previousOpen);
  // };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    deleteUser(userId);
  };


  return (
    <div style={{ height: 250, width: "100%" }}>
      {users ? (
        <DataGrid
          columns={[
            { field: "id" },
            { field: "username" },
            { field: "account_type" },
            {
              field: "Delete this user",
              renderCell: (cellValues) => {
                return (
                  <Button
                    color="primary"
                    onClick={handleDeleteSubmit}
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
