import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";

import { fetchAllOrders, getMe, updateOrder, deleteOrder } from "../api/index";

const MyAccount = (props) => {
  const { username, password, orderId, orders, user } = props;
  const [userId, setUserId] = useState(null);

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Typography variant="h3">MyAccount</Typography>
      </Box>

      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Typography variant="h3">MyOrders</Typography>
      </Box>

      {/* <Box sx={{display: "flex", flexDirection: "row" }}>
        { 
            myOrders ? 
            myOrders.map((order) => <RoutineCard routine={routine} allActivities={activities}/>)
            : null
        }
      </Box> */}

      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Typography variant="h3">Edit profile</Typography>
      </Box>
    </Container>
  );
};

export default MyAccount;
