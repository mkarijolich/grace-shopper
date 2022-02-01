import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../api";
import { DataGrid } from "@mui/x-data-grid";

const UserList = (props) => {
  const [users, setUsers] = useState("");
  const [checkboxSelection, setCheckboxSelection] = useState(true);

  useEffect(() => {
    Promise.all([fetchAllUsers()]).then(([usersFromAPI]) => {
      setUsers(usersFromAPI);
      //   console.log(usersFromAPI)
    });
  }, []);

  return (

    <div style={{ height: 250, width: "100%" }}>
      {
        users ? (
          <DataGrid checkboxSelection={checkboxSelection}
            columns={[{ field: "id" },{ field: "username" }, { field: "account_type"} ]}
            rows={users}
          />
        ) : null
      }
    </div>
  );
};

export default UserList;
