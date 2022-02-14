import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import SearchBar from "./Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import blue from "@material-ui/core/colors/green";

const NavBar = ({ user, handleLogout, products, orders, setSearchTerm }) => {
  const navigate = useNavigate();
  const urlEnd = '/cart';

  return (
    <Container>
      <Fragment>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h4"
              color="#3c3e45"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Grace Shopper
            </Typography>

            <SearchBar setSearchTerm={setSearchTerm} />

            <Button
              href="/"
              variant="button"
              
              sx={{ my: 1, mx: 1.5 }}
            >
              <HomeIcon style={{ color: "#666970" }}/>
            </Button>

            {Object.keys(user).length > 0 ? ( //logged in
              <nav>
                <Button
                  href="/myaccount"
                  variant="button"
                  
                  sx={{ my: 1, mx: 1.5 }}
                >
                  <AccountCircleIcon style={{ color: "#1e88e5" }}/>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </nav>
            ) : (
              <nav>
                <Button
                  href="/login"
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Sign In
                </Button>

                <Button
                  href="/register"
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Register
                </Button>
              </nav>
            )}
            <Button
              href={urlEnd}
            >
              <ShoppingCartIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </Fragment>
    </Container>
  );
};

export default NavBar;
