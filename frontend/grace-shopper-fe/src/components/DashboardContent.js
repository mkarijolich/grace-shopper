import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
import { fetchAllOrders, fetchAllProducts } from "../api/index";
import AdminProductsDashboard from "./AdminProductsDashboard";
import OrderList from "./OrderList";
import UserList from "./UserList";

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [products, setProducts] = React.useState([]);

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

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography>Order List</Typography>
            <Grid container spacing={3}>
              {/* orderlist */}

              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <OrderList orders={orders} />
                </Paper>
              </Grid>

              {/* userlist */}
              <Typography>User List</Typography>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <UserList users={users} />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <AdminProductsDashboard products={products} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
