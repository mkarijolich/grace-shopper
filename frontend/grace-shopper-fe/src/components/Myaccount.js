import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import EditProfile from "./EditProfile";
import AddressList from "./AddressList";
import { getAllAddresses } from "../api";
import BasicDetails from "./basicDetails";
import OrderList from "./OrderList";
import { getOrdersByUserId } from "../api/index";

const MyAccount = (props) => {
  const { username, password, orderId,  user } = props;
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Promise.all([getAllAddresses()]).then(([addressesFromAPI]) => {
      setAddresses(addressesFromAPI);
    });
  }, [setAddresses]);

  useEffect(() => {
    Promise.all([getOrdersByUserId()]).then(([ordersFromAPI]) => {
      setOrders(ordersFromAPI);
    });
  }, [setOrders]);



  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs">
            <Tab label="Orders" value="1" />
            <Tab label="Basic Detail" value="2" />
            <Tab label="Address" value="3" />
            <Tab label="Credit cards" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <OrderList orders={orders} />
        </TabPanel>
        <TabPanel value="2">
          <BasicDetails />
        </TabPanel>
        <TabPanel value="3">
          <AddressList addresses={addresses} />
        </TabPanel>
        <TabPanel value="4">Credit cards</TabPanel>
      </TabContext>
    </Box>
  );
};

export default MyAccount;
