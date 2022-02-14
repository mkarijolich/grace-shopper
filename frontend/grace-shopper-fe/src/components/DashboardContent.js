import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";
import { fetchAllOrders, fetchAllProducts } from "../api/index";
import AdminProductsDashboard from "./AdminProductsDashboard";
import OrderList from "./OrderList";
import UserList from "./UserList";
import { Tab } from "@mui/material";

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [currentTab, setCurrentTab] = React.useState("products");

  useEffect(() => {
    Promise.all([fetchAllProducts()]).then(([productsFromAPI]) => {
      setProducts(productsFromAPI);
    });
  }, []);

  useEffect(() => {
    Promise.all([fetchAllOrders()]).then(([ordersFromAPI]) => {
      setOrders(ordersFromAPI);
    });
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={mdTheme}>
        <CssBaseline />

        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange}>
              <Tab label="Products" value="products" />
              <Tab label="Orders" value="orders" />
              <Tab label="Users" value="users" />
            </TabList>
          </Box>
        
          <TabPanel value="products">
            <Box component="form" noValidate sx={{height: 800}}>
                <AdminProductsDashboard products={products} />
            </Box>
          </TabPanel>

          <TabPanel value="orders">
            <Box component="form" noValidate>
              <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 800,
                  }}
                >
                  <OrderList orders={orders} />
                </Paper>
            </Box>
          </TabPanel>

          <TabPanel value="users">
            <Box component="form" noValidate>
              <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 800,
                  }}
                >
                <UserList users={users} />
              </Paper>
            </Box>
          </TabPanel>
        </TabContext>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
